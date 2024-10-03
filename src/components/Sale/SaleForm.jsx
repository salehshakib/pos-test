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
    <Col {...largeLayout}>
      <CustomSelect
        options={discountTypeOptions}
        label="Discount Type"
        name={'discount_type'}
        required={required}
      />
    </Col>
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
              <CustomInput
                label="Discount"
                type={'number'}
                name={'discount'}
                min={0}
              />
            </Col>

            <DiscountTypeComponent />

            <Col {...largeLayout}>
              <OrderTaxComponent />
            </Col>
            <Col {...largeLayout}>
              <CustomInput
                label="Shipping Cost"
                type={'number'}
                name={'shipping_cost'}
                min={0}
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
    </>
  );
};
