import { Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';

import { discountTypeOptions } from '../../../assets/data/discountTypes';
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from '../../../layout/FormLayout';
import { CashierComponent } from '../../ReusableComponent/CashierComponent';
import { OrderTaxComponent } from '../../ReusableComponent/OrderTaxComponent';
import { SupplierComponent } from '../../ReusableComponent/SupplierComponent';
import { WarehouseComponent } from '../../ReusableComponent/WarehouseComponent';
import CustomForm from '../../Shared/Form/CustomForm';
import CustomInput from '../../Shared/Input/CustomInput';
import CustomSelect from '../../Shared/Select/CustomSelect';
import CustomUploader from '../../Shared/Upload/CustomUploader';
import { CustomQuotationProductComponent } from './overview/CustomQuotationProductComponent';

const options = [
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Sent',
    label: 'Sent',
  },
];

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

const StatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('status', 'Pending');
  }, [form]);

  return <CustomSelect label="Status" options={options} name={'status'} />;
};

export const QuotationForm = ({ data, ...props }) => {
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

  const quotationRef = useRef(null);

  return (
    <>
      <CustomForm {...props} handleSubmit={handleSubmit}>
        <Row {...rowLayout}>
          <Col {...colLayout}>
            <WarehouseComponent warehouseRef={quotationRef} />
          </Col>
          <Col {...colLayout}>
            <CashierComponent />
          </Col>
          <Col {...colLayout}>
            <SupplierComponent />
          </Col>

          <CustomQuotationProductComponent
            onCustomSubmit={handleProducts}
            data={data}
            ref={quotationRef}
          >
            <Col {...colLayout}>
              <OrderTaxComponent />
            </Col>
            <Col {...colLayout}>
              <CustomInput label="Discount" type={'number'} name={'discount'} />
            </Col>

            <DiscountTypeComponent />
            <Col {...mdColLayout}>
              <CustomInput
                label="Shipping Cost"
                type={'number'}
                name={'shipping_cost'}
              />
            </Col>
            <Col {...mdColLayout}>
              <StatusComponent />
            </Col>

            <Col {...fullColLayout}>
              <CustomUploader label="Attachment" name={'attachment'} />
            </Col>
            <Col {...fullColLayout}>
              <CustomInput label="Note" type={'textarea'} name={'note'} />
            </Col>
          </CustomQuotationProductComponent>
        </Row>
      </CustomForm>
    </>
  );
};
