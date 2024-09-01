import { Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';

import { paymentStatusOptions } from '../../assets/data/paymentStatus';
import { purchaseStatusOptions } from '../../assets/data/purchaseStatus';
import {
  colLayout,
  fullColLayout,
  largeLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { OrderTaxComponent } from '../ReusableComponent/OrderTaxComponent';
import { SupplierComponent } from '../ReusableComponent/SupplierComponent';
import { WarehouseComponent } from '../ReusableComponent/WarehouseComponent';
import { CurrencyFormComponent } from '../Sale/overview/CurrencyComponent';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomUploader from '../Shared/Upload/CustomUploader';
import { CustomPurchaseProductComponent } from './overview/CustomPurchaseProductComponent';
import { PaymentTypeComponent } from './overview/PaymentTypeComponent';

const PurchaseStatus = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('purchase_status', purchaseStatusOptions[0].value);
  }, [form]);

  return (
    <CustomSelect
      label="Purchase Status"
      options={purchaseStatusOptions}
      name="purchase_status"
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

export const PurchaseForm = ({ data, ...props }) => {
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

  const warehousePurchaseRef = useRef(null);

  return (
    <>
      <CustomForm {...props} handleSubmit={handleSubmit}>
        <Row {...rowLayout}>
          <Col {...largeLayout}>
            <WarehouseComponent warehousePurchaseRef={warehousePurchaseRef} />
          </Col>
          <Col {...largeLayout}>
            <SupplierComponent />
          </Col>
          <Col {...largeLayout}>
            <CustomDatepicker label="Date" required name="purchase_at" />
          </Col>
          <Col {...largeLayout}>
            <PurchaseStatus />
          </Col>

          <CustomPurchaseProductComponent
            onCustomSubmit={handleProducts}
            data={data}
            ref={warehousePurchaseRef}
          >
            <Col {...colLayout}>
              <OrderTaxComponent />
            </Col>
            <Col {...colLayout}>
              <CustomInput label="Discount" type="number" name="discount" />
            </Col>
            <Col {...colLayout}>
              <CustomInput
                label="Shipping Cost"
                type="number"
                name="shipping_cost"
              />
            </Col>
            <Col {...colLayout}>
              <PaymentStatusComponent />
            </Col>

            <PaymentTypeComponent />

            <Col {...colLayout}>
              <CurrencyFormComponent />
            </Col>

            <Col {...fullColLayout}>
              <CustomUploader label="Attach Document" name="attachment" />
            </Col>
            <Col {...fullColLayout}>
              <CustomInput
                type="textarea"
                name="purchase_note"
                label="Purchase Note"
              />
            </Col>
          </CustomPurchaseProductComponent>
        </Row>
      </CustomForm>
    </>
  );
};
