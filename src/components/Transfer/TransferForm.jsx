import { Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';

import {
  colLayout,
  fullColLayout,
  largeLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { getCurrentDate } from '../../utilities/lib/currentDate';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomUploader from '../Shared/Upload/CustomUploader';
import { CustomTransferProductComponent } from './overview/CustomTransferProductComponent';
import { WarehouseTransferComponent } from './WarehouseTransferComponent';

const options = [
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Send',
    label: 'Send',
  },
  {
    value: 'Transfared',
    label: 'Transfared',
  },
];

const FileStatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('status', options[0].value);
  }, [form]);

  return (
    <CustomSelect
      label="Status"
      placeholder={'Status'}
      options={options}
      name={'status'}
    />
  );
};

const TransferDateComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('date', getCurrentDate);
  }, [form]);

  return (
    <CustomDatepicker
      label="Date"
      type={'date'}
      required={true}
      name={'date'}
    />
  );
};

const TransferForm = ({ data, ...props }) => {
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

  const transferRef = useRef(null);

  return (
    <>
      <CustomForm {...props} handleSubmit={handleSubmit}>
        <Row {...rowLayout}>
          <WarehouseTransferComponent warehouseRef={transferRef} />

          <Col {...largeLayout}>
            <TransferDateComponent />
          </Col>
          <Col {...largeLayout}>
            <FileStatusComponent />
          </Col>

          <CustomTransferProductComponent
            onCustomSubmit={handleProducts}
            data={data}
            ref={transferRef}
          >
            <Col {...colLayout}>
              <CustomInput
                label="Shipping Cost"
                type={'number'}
                name={'shipping_cost'}
              />
            </Col>

            <Col {...fullColLayout}>
              <CustomUploader label={'Attach Document'} />
            </Col>

            <Col {...fullColLayout}>
              <CustomInput
                label="Transfer Note"
                type={'textarea'}
                name={'note'}
              />
            </Col>
          </CustomTransferProductComponent>
        </Row>
      </CustomForm>

      {/* <TotalRow
        totalItems={totalItems}
        totalQty={totalQty}
        totalPrice={totalPrice}
        // taxRate={tax_rate}
        // discount={discount}
        shippingCost={shipping_cost ?? 0}
        grandTotal={grandTotal}
      /> */}
    </>
  );
};

export default TransferForm;
