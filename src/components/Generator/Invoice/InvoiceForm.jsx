import { Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';

import {
  colLayout,
  fullColLayout,
  largeLayout,
  rowLayout,
} from '../../../layout/FormLayout';
import { CashierComponent } from '../../ReusableComponent/CashierComponent';
import { OrderTaxComponent } from '../../ReusableComponent/OrderTaxComponent';
import { WarehouseComponent } from '../../ReusableComponent/WarehouseComponent';
import CustomForm from '../../Shared/Form/CustomForm';
import CustomInput from '../../Shared/Input/CustomInput';
import CustomSelect from '../../Shared/Select/CustomSelect';
import CustomUploader from '../../Shared/Upload/CustomUploader';
import { CustomerComponent } from '../overview/CustomerComponent';
import { CustomInvoiceProductComponent } from './overview/CustomInvoiceProductComponent';

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

const StatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('status', 'Pending');
  }, [form]);

  return <CustomSelect label="Status" options={options} name={'status'} />;
};

export const InvoiceForm = ({ data, ...props }) => {
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

  const invoiceRef = useRef(null);

  return (
    <>
      <CustomForm {...props} handleSubmit={handleSubmit}>
        <Row {...rowLayout}>
          <Col {...colLayout}>
            <WarehouseComponent warehouseRef={invoiceRef} />
          </Col>
          <Col {...colLayout}>
            <CashierComponent />
          </Col>
          <Col {...colLayout}>
            <CustomerComponent required={true} />
          </Col>

          <CustomInvoiceProductComponent
            onCustomSubmit={handleProducts}
            data={data}
            ref={invoiceRef}
          >
            <Col {...largeLayout}>
              <OrderTaxComponent />
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
            <Col {...largeLayout}>
              <StatusComponent />
            </Col>

            <Col {...fullColLayout}>
              <CustomUploader label="Attachment" name={'attachment'} />
            </Col>
            <Col {...fullColLayout}>
              <CustomInput label="Note" type={'textarea'} name={'note'} />
            </Col>
          </CustomInvoiceProductComponent>
        </Row>
      </CustomForm>
    </>
  );
};
