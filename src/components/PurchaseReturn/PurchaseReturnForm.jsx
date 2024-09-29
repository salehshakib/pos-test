import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { useCheckReferenceMutation } from '../../redux/services/return/purchaseReturnApi';
import { openNotification } from '../../utilities/lib/openToaster';
import { OrderTaxComponent } from '../ReusableComponent/OrderTaxComponent';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomUploader from '../Shared/Upload/CustomUploader';
import { CustomPurchaseReturnProductForm } from './overview/CustomPurchaseReturnProductForm';

const options = [
  {
    value: 'Cash',
    label: 'Cash',
  },
  {
    value: 'Card',
    label: 'Card',
  },
  {
    value: 'Cheque',
    label: 'Cheque',
  },
];

const PaymentType = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('payment_type', options[0].value);
  }, [form]);

  return (
    <CustomSelect
      label="Payment Type"
      options={options}
      name={'payment_type'}
    />
  );
};

export const PurchaseReturnForm = ({ data, ...props }) => {
  const productsRef = useRef(null);

  const handleProducts = useCallback((submitFunction) => {
    productsRef.current = submitFunction;
  }, []);

  const [purchaseData, setPurchaseData] = useState(undefined);

  const handleReturnSubmit = (values) => {
    const productsData = productsRef.current ? productsRef.current() : null;

    const formValues = {
      product_list: productsData.product_list,
    };

    props.handleSubmit(values, { purchaseData, formValues });
  };

  const [referenceForm] = Form.useForm();
  const [checkReference, { isLoading }] = useCheckReferenceMutation();

  const [refId, setRefId] = useState(null);

  const handleSubmit = async (values) => {
    const { data, error } = await checkReference({ data: values });

    if (data?.data) {
      setPurchaseData(data?.data);

      setRefId(values.reference_id);
    }
    if (error) {
      openNotification(
        'error',
        error?.data?.message ??
          'Purchase Reference doesnot exist or Purchase Return is Pending'
      );
      setPurchaseData(undefined);
      setRefId(null);
    }
  };

  return (
    <>
      {!refId && !data?.id ? (
        <CustomForm
          handleSubmit={handleSubmit}
          form={referenceForm}
          submitBtnText={'Check Reference'}
          isLoading={isLoading}
        >
          <Row {...rowLayout}>
            <Col {...fullColLayout}>
              <CustomInput
                label="Purchase Reference"
                name={'reference_id'}
                required={true}
              />
            </Col>
          </Row>
        </CustomForm>
      ) : (
        <CustomForm {...props} handleSubmit={handleReturnSubmit}>
          <Row {...rowLayout}>
            <div className="w-full text-center text-lg font-semibold underline">
              Reference ID: {refId ?? data?.reference_id}
            </div>
            <div className="w-full text-center">
              Only Selected Items will be returned
            </div>

            <CustomPurchaseReturnProductForm
              onCustomSubmit={handleProducts}
              purchaseData={purchaseData}
              data={data}
            >
              <Col {...colLayout}>
                <OrderTaxComponent />
              </Col>

              <Col {...colLayout}>
                <CustomDatepicker
                  label="Return Date"
                  required={true}
                  name={'purchase_return_at'}
                  initialValue={dayjs(new Date())}
                />
              </Col>

              <Col {...colLayout}>
                <PaymentType />
              </Col>

              <Col {...fullColLayout}>
                <CustomUploader label={'Attach Document'} name={'attachment'} />
              </Col>

              <Col {...mdColLayout}>
                <CustomInput
                  type={'textarea'}
                  name="return_note"
                  label="Return Note"
                />
              </Col>
              <Col {...mdColLayout}>
                <CustomInput
                  type={'textarea'}
                  name="staff_note"
                  label="Staff Note"
                />
              </Col>
            </CustomPurchaseReturnProductForm>
          </Row>
        </CustomForm>
      )}
    </>
  );
};
