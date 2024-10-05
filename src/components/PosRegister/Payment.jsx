import { Button, Col, Form, Modal, Row } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BsCash } from 'react-icons/bs';
import { FaCreditCard } from 'react-icons/fa';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { MdCardGiftcard } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { mdColLayout, rowLayout } from '../../layout/FormLayout';
import { useCurrency } from '../../redux/services/pos/posSlice';
import {
  useCreateSaleMutation,
  useGetSaleDetailsQuery,
} from '../../redux/services/sale/saleApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from '../../utilities/lib/generator/generatorUtils';
import { openNotification } from '../../utilities/lib/openToaster';
import { decimalConverter } from '../../utilities/lib/return/decimalComverter';
import { sanitizeObj } from '../../utilities/lib/sanitizeObj';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import SellInvoice from '../Shared/Invoice/SellInvoice';
import CustomModal from '../Shared/Modal/CustomModal';
import { PaymentTypeComponent } from './overview/PaymentTypeComponent';

const Payment = ({ handleSubmit, getGrandTotal, handleReset }) => {
  const [paymentForm] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);
  const { pettyCashId } = useSelector((state) => state.pettyCash);

  const [createSale, { isLoading }] = useCreateSaleMutation();

  const [paymentType, setPaymentType] = useState('Cash');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideModal = () => {
    setIsModalOpen(false);

    const paidAmount = paymentForm.getFieldValue('paid_amount');
    const giftCardAmount = paymentForm.getFieldValue('gift_card_id');
    if (
      parseFloat(paidAmount) < parseFloat(giftCardAmount?.split('-')?.[1] ?? 0)
    ) {
      paymentForm.resetFields(['gift_card_id']);
    }
  };

  const [grandTotal, setGrandTotal] = useState(0);

  const currency = useSelector(useCurrency);

  const [id, setId] = useState(null);

  const { data: saleData, isFetching } = useGetSaleDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const showModal = (type) => {
    setPaymentType(type);

    const total = getGrandTotal();

    if (total) {
      setGrandTotal(total);
    } else {
      return;
    }

    setIsModalOpen(true);
  };

  const onSubmit = async (values) => {
    const { data, formValues } = handleSubmit() || {};

    if (!data) return;

    const { discount, discount_type, shipping_cost, tax_rate, coupon } =
      formValues.order ?? {};

    const { paid_amount } = values ?? {};
    const { sale_at, warehouse_id, cashier_id, customer_id, reference_number } =
      data ?? {};

    if (parseFloat(values?.recieved_amount) < parseFloat(values.paid_amount)) {
      openNotification(
        'error',
        'Recievable Amount should be greater than Paid Amount'
      );
      return;
    }

    const { product_list } = formValues;

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_variant_id: parseInt(product_id),
            qty: product_list.qty[product_id],
            sale_unit_id: product_list.sale_unit_id[product_id],
            net_unit_price: decimalConverter(
              product_list.net_unit_price[product_id]
            ),
            discount: decimalConverter(product_list.discount[product_id]),
            tax_rate: decimalConverter(product_list.tax_rate[product_id]),
            tax: decimalConverter(product_list.tax[product_id]),
            total: decimalConverter(product_list.total[product_id]),
          }))
      : [];

    const totalPrice = calculateTotalPrice(product_list);
    const orderTax = calculateTotalTax(totalPrice, values.tax_rate, discount);

    const totalQty =
      Object.values(formValues.product_list?.qty).reduce(
        (acc, cur) => acc + parseInt(cur),
        0
      ) ?? 0;

    const totalDiscount =
      Object.values(formValues.product_list?.discount).reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
      ) ?? 0;

    const totalTax =
      Object.values(formValues.product_list?.tax).reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
      ) ?? 0;

    let totalCoupon = 0;

    if (formValues?.order?.coupon.type === 'Percentage') {
      totalCoupon = (totalPrice * formValues?.order?.coupon.rate) / 100;
    } else if (formValues?.order?.coupon.type === 'Fixed') {
      totalCoupon = decimalConverter(formValues?.order?.coupon.rate);
    }

    const postObj = {
      ...sanitizeObj(values),
      gift_card_id: values?.gift_card_id?.split('-')?.[0],
      sale_status: 'Completed',
      sale_at: dayjs(sale_at).format('YYYY-MM-DD'),
      discount_type,
      discount: decimalConverter(
        parseFloat(discount ?? 0) - parseFloat(totalCoupon ?? 0)
      ),
      shipping_cost: decimalConverter(shipping_cost),
      tax_rate: decimalConverter(tax_rate),
      item: productListArray.length,
      total_qty: totalQty,
      total_discount: decimalConverter(totalDiscount),
      total_tax: decimalConverter(totalTax),
      total_price: decimalConverter(totalPrice),
      tax: decimalConverter(orderTax),
      change: decimalConverter(
        Number(values?.recieved_amount ?? 0) - Number(values?.paid_amount ?? 0)
      ),
      grand_total: calculateGrandTotal(
        totalPrice,
        values.tax_rate,
        discount,
        shipping_cost
      ),
      product_list: JSON.stringify(productListArray),
      coupon_id: coupon?.coupon_id,
      warehouse_id,
      cashier_id,
      customer_id,
      reference_number,
      payment_status: 'Paid',
      currency: currency?.name,
      exchange_rate: 1,
      petty_cash_id: pettyCashId,
    };

    if (paid_amount) {
      postObj.paid_amount = Number(paid_amount).toFixed(2);
    }

    const formData = new FormData();
    appendToFormData(postObj, formData);

    try {
      const { data, error } = await createSale({ data: formData });
      if (data?.success) {
        setId(data?.data?.id);
        hideModal();
        paymentForm.resetFields();
        handleReset();
      }

      if (error) {
        const errorFields = Object.keys(error?.data?.errors).map(
          (fieldName) => ({
            name: fieldName,
            errors: error?.data?.errors[fieldName],
          })
        );
        setErrorFields(errorFields);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      hideModal();
      paymentForm.resetFields();
    }
  };
  const [giftCard, setGiftCard] = useState(null);

  return (
    <>
      <div className="bg-[#F5F5F5]">
        <div className="mx-auto grid grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-4">
          <Button
            type="primary"
            icon={<BsCash />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => showModal('Cash')}
          >
            Cash
          </Button>
          <Button
            type="primary"
            icon={<FaCreditCard />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => showModal('Card')}
          >
            Card
          </Button>

          <Button
            type="primary"
            icon={<HiOutlineBanknotes />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => showModal('Cheque')}
          >
            Cheque
          </Button>
          <Button
            type="primary"
            icon={<MdCardGiftcard />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => {
              const { formValues } = handleSubmit() || {};
              showModal('GiftCard');
            }}
          >
            Gift Card
          </Button>

          {/* <Button
            type="primary"
            icon={<GoHistory />}
            className="flex min-w-fit items-center justify-center"
          >
            Transactions
          </Button> */}
        </div>
      </div>

      <CustomModal
        title={'Finalize Sale'}
        openModal={isModalOpen}
        hideModal={hideModal}
        showCloseButton={false}
        width={800}
        footer={null}
      >
        <div className="pr-3">
          <CustomForm
            form={paymentForm}
            layout="vertical"
            autoComplete="on"
            scrollToFirstError
            handleSubmit={onSubmit}
            onClose={hideModal}
            btnStyle={false}
            isLoading={isLoading}
            fields={errorFields}
          >
            <Row {...rowLayout}>
              <PaymentTypeComponent
                paymentType={paymentType}
                grandTotal={grandTotal}
                setGiftCard={setGiftCard}
                giftCard={giftCard}
              />

              <Col {...mdColLayout}>
                <CustomInput
                  type={'textarea'}
                  name="sale_note"
                  label="Sale Note"
                />
              </Col>
              <Col {...mdColLayout}>
                <CustomInput
                  type={'textarea'}
                  name="staff_note"
                  label="Staff Note"
                />
              </Col>
            </Row>
          </CustomForm>
        </div>
      </CustomModal>

      <Modal
        open={id}
        onCancel={() => setId(null)}
        footer={null}
        width={1000}
        destroyOnClose
        loading={isFetching}
        centered
      >
        <SellInvoice invoice={saleData} />
      </Modal>
    </>
  );
};

export default Payment;
