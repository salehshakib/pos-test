import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef } from 'react';

import { discountTypeOptions } from '../../assets/data/discountTypes';
import { paymentStatusOptions } from '../../assets/data/paymentStatus';
import { saleStatusOptions } from '../../assets/data/saleStatus';
import {
  colLayout,
  fullColLayout,
  largeLayout,
  mdColLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { CashierComponent } from '../ReusableComponent/CashierComponent';
import { OrderTaxComponent } from '../ReusableComponent/OrderTaxComponent';
import { WarehouseComponent } from '../ReusableComponent/WarehouseComponent';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomUploader from '../Shared/Upload/CustomUploader';
import { CurrencyFormComponent } from './overview/CurrencyComponent';
import { CustomerComponent } from './overview/CustomerComponent';
import { CustomSaleProductComponent } from './overview/CustomSaleProductComponent';
import { PaymentTypeComponent } from './overview/PaymentFormComponent';

const StatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('sale_status', saleStatusOptions[0].value);
  }, [form]);
  return (
    <CustomSelect
      label="Sale Status"
      options={saleStatusOptions}
      name={'sale_status'}
    />
  );
};

const PaymentStatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('payment_status', paymentStatusOptions[0].value);
  }, [form]);

  return (
    <CustomSelect
      label="Payment Status"
      options={paymentStatusOptions}
      name="payment_status"
    />
  );
};

const DiscountTypeComponent = () => {
  const form = Form.useFormInstance();
  const discount = Form.useWatch('discount', form);
  const required = !!discount;

  return (
    <CustomSelect
      options={discountTypeOptions}
      label="Discount Type"
      name={'discount_type'}
      required={required}
    />
  );
};

const SaleDateComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('sale_at', dayjs(new Date()));
  }, [form]);

  return <CustomDatepicker label="Date" required={true} name={'sale_at'} />;
};

export const SaleForm = ({ data, ...props }) => {
  const productsRef = useRef(null);

  const handleProducts = useCallback((submitFunction) => {
    productsRef.current = submitFunction;
  }, []);

  const handleSubmit = (values) => {
    const productsData = productsRef.current ? productsRef.current() : null;

    const formValues = {
      product_list: productsData.product_list,
    };

    props.handleSubmit(values, { formValues });
  };

  const warehouseSaleRef = useRef(null);

  // const discount = Form.useWatch('discount', form);
  // const shipping_cost = Form.useWatch('shipping_cost', form);
  // const tax_rate = Form.useWatch('tax_rate', form) ?? 0;

  // const totalItems = Object.keys(formValues.product_list?.qty)?.length ?? 0;
  // const totalQty = Object.values(formValues.product_list?.qty).reduce(
  //   (acc, cur) => acc + (parseFloat(cur) || 0),
  //   0
  // );

  // const totalPrice = calculateTotalPrice(formValues.product_list);

  // const grandTotal = calculateGrandTotal(
  //   totalPrice,
  //   tax_rate ?? 0,
  //   discount,
  //   shipping_cost
  // );

  // const [totalItems, setTotalItems] = useState(0);
  // const [totalQty, setTotalQty] = useState(0);
  // const [taxRate, setTaxRate] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [grandTotal, setGrandTotal] = useState(0);

  // useEffect(() => {
  //   const calculatedTotalItems =
  //     Object.keys(formValues.product_list?.qty).length ?? 0;

  //   const calculatedTotalQty = Object.values(
  //     formValues.product_list?.qty
  //   ).reduce((acc, cur) => acc + (parseFloat(cur) || 0), 0);

  //   const calculatedTotalPrice = calculateTotalPrice(formValues.product_list);
  //   const orderTax = calculateTotalTax(
  //     calculatedTotalPrice,
  //     tax_rate,
  //     discount
  //   );

  //   const calculatedGrandTotal = calculateGrandTotal(
  //     calculatedTotalPrice,
  //     tax_rate ?? 0,
  //     discount,
  //     shipping_cost
  //   );

  //   setTotalItems(calculatedTotalItems);
  //   setTotalQty(calculatedTotalQty);
  //   setTotalPrice(calculatedTotalPrice);
  //   setGrandTotal(calculatedGrandTotal);
  //   setTaxRate(orderTax);
  // }, [discount, formValues, shipping_cost, tax_rate, products]);

  return (
    <>
      <CustomForm {...props} handleSubmit={handleSubmit}>
        <Row {...rowLayout}>
          <Col {...largeLayout}>
            <CustomerComponent />
          </Col>
          <Col {...largeLayout}>
            <WarehouseComponent warehouseRef={warehouseSaleRef} />
          </Col>
          <Col {...largeLayout}>
            <CashierComponent />
          </Col>

          <Col {...largeLayout}>
            <SaleDateComponent />
          </Col>

          <CustomSaleProductComponent
            onCustomSubmit={handleProducts}
            data={data}
            ref={warehouseSaleRef}
          >
            <Col {...largeLayout}>
              <OrderTaxComponent />
            </Col>

            <Col {...largeLayout}>
              <DiscountTypeComponent />
            </Col>
            <Col {...largeLayout}>
              <CustomInput label="Discount" type={'number'} name={'discount'} />
            </Col>
            <Col {...largeLayout}>
              <CustomInput
                label="Shipping Cost"
                type={'number'}
                name={'shipping_cost'}
              />
            </Col>

            <Col {...colLayout}>
              <CurrencyFormComponent />
            </Col>

            <Col {...colLayout}>
              <PaymentStatusComponent />
            </Col>

            <PaymentTypeComponent />

            <Col {...colLayout}>
              <StatusComponent />
            </Col>

            <Col {...fullColLayout}>
              <CustomInput
                type={'textarea'}
                name="payment_note"
                label="Payment Note"
              />
            </Col>

            <Col {...fullColLayout}>
              <CustomUploader label={'Attach Document'} name={'attachment'} />
            </Col>

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
          </CustomSaleProductComponent>
        </Row>
      </CustomForm>

      {/* <TotalRow
        totalItems={totalItems}
        totalQty={totalQty}
        totalPrice={totalPrice}
        taxRate={taxRate ?? 0}
        discount={discount ?? 0}
        shippingCost={shipping_cost ?? 0}
        grandTotal={grandTotal}
      /> */}
    </>
  );
};
