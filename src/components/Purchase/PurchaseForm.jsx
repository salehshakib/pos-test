import { Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { discountTypeOptions } from '../../assets/data/discountTypes';
import { paymentStatusOptions } from '../../assets/data/paymentStatus';
import { purchaseStatusOptions } from '../../assets/data/purchaseStatus';
import {
  colLayout,
  fullColLayout,
  largeLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { showCurrency } from '../../utilities/lib/currency';
import { calculateSummary } from '../../utilities/lib/generator/generatorUtils';
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

const DiscountTypeComponent = () => {
  const form = Form.useFormInstance();
  const discount = Form.useWatch('discount', form);
  const required = !!discount;

  useEffect(() => {
    if (!form.getFieldValue('discount_type'))
      form.setFieldValue('discount_type', 'Fixed');
  }, [form]);

  return (
    <Col {...colLayout}>
      <CustomSelect
        options={discountTypeOptions}
        label="Discount Type"
        name={'discount_type'}
        required={required}
      />
    </Col>
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

  const [total, setTotal] = useState(0);
  const currency = useSelector(useCurrency);

  const paidAmount = Form.useWatch('paid_amount', props.form);
  const paymentStatus = Form.useWatch('payment_status', props.form);
  const discount = Form.useWatch('discount', props.form);
  const discountType = Form.useWatch('discount_type', props.form);
  const shipping_cost = Form.useWatch('shipping_cost', props.form);
  const tax_rate = Form.useWatch('tax_rate', props.form);

  useEffect(() => {
    if (paidAmount && paymentStatus === 'Partial') {
      const productData = productsRef.current ? productsRef.current() : null;

      const { grandTotal } = calculateSummary(
        productData,
        tax_rate ?? 0,
        discount,
        shipping_cost,
        discountType
      );

      setTotal(grandTotal);
    }
  }, [
    discount,
    discountType,
    paidAmount,
    paymentStatus,
    shipping_cost,
    tax_rate,
  ]);

  return (
    <>
      <CustomForm {...props} handleSubmit={handleSubmit}>
        <Row {...rowLayout}>
          <Col {...largeLayout}>
            <WarehouseComponent warehouseRef={warehousePurchaseRef} />
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
              <CustomInput
                label="Discount"
                type="number"
                name="discount"
                min={0}
              />
            </Col>

            <DiscountTypeComponent />
            <Col {...colLayout}>
              <CustomInput
                label="Shipping Cost"
                type="number"
                name="shipping_cost"
                min={0}
              />
            </Col>
            <Col {...colLayout}>
              <PaymentStatusComponent />
            </Col>

            <PaymentTypeComponent />

            <Col {...colLayout}>
              <CurrencyFormComponent />
            </Col>

            {paymentStatus === 'Partial' && (
              <>
                <Col {...fullColLayout}>
                  <div className="py-9 text-lg font-semibold">
                    Due:{' '}
                    {showCurrency(
                      parseFloat(total) - parseFloat(paidAmount),
                      currency
                    )}
                  </div>
                </Col>
              </>
            )}

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
