import { Button, Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BsCash } from 'react-icons/bs';
import { FaCreditCard } from 'react-icons/fa';
import { GoHistory } from 'react-icons/go';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { IoRocketOutline } from 'react-icons/io5';
import { MdCardGiftcard } from 'react-icons/md';

import { mdColLayout, rowLayout } from '../../layout/FormLayout';
import { useCreateSaleMutation } from '../../redux/services/sale/saleApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from '../../utilities/lib/generator/generatorUtils';
import { decimalConverter } from '../../utilities/lib/return/decimalComverter';
import { sanitizeObj } from '../../utilities/lib/sanitizeObj';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomModal from '../Shared/Modal/CustomModal';
import { PaymentTypeComponent } from './overview/PaymentTypeComponent';

const Payment = ({ handleSubmit, getGrandTotal, handleReset }) => {
  const [paymentForm] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const [createSale, { isLoading }] = useCreateSaleMutation();

  const [paymentType, setPaymentType] = useState('Cash');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideModal = () => setIsModalOpen(false);

  const [grandTotal, setGrandTotal] = useState(0);

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

    const { discount, shipping_cost, tax_rate } = formValues.order ?? {};
    const { paid_amount } = values ?? {};
    const {
      sale_at,
      warehouse_id,
      cashier_id,
      customer_id,
      reference_number,
      currency,
      exchange_rate,
    } = data ?? {};

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

    const postObj = {
      ...sanitizeObj(values),
      sale_status: 'Completed',
      sale_at: dayjs(sale_at).format('YYYY-MM-DD'),
      discount: decimalConverter(discount),
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
      // petty_cash_id: 8,
      warehouse_id,
      cashier_id,
      customer_id,
      reference_number,
      payment_status: 'Paid',
      currency,
      exchange_rate,
    };

    if (paid_amount) {
      postObj.paid_amount = Number(paid_amount).toFixed(2);
    }

    const formData = new FormData();
    appendToFormData(postObj, formData);

    try {
      const { data, error } = await createSale({ data: formData });
      if (data?.success) {
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

  return (
    <>
      <div className="bg-[#F5F5F5]">
        <div className="mx-auto grid grid-cols-3 gap-x-3 gap-y-2 lg:grid-cols-6">
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
            onClick={() => showModal('Gift Card')}
          >
            Gift Card
          </Button>

          <Button
            type="primary"
            icon={<IoRocketOutline />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => showModal('Points')}
          >
            Points
          </Button>

          <Button
            type="primary"
            icon={<GoHistory />}
            className="flex min-w-fit items-center justify-center"
          >
            Transactions
          </Button>
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
      </CustomModal>
    </>
  );
};

export default Payment;
