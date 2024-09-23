import { Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { useCheckSaleReferenceMutation } from '../../redux/services/return/saleReturnApi';
import { openNotification } from '../../utilities/lib/openToaster';
import { OrderTaxComponent } from '../ReusableComponent/OrderTaxComponent';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomUploader from '../Shared/Upload/CustomUploader';
import { CustomSaleReturnProductForm } from './overview/CustomSaleReturnProductForm';

const options = [
  {
    value: 'Cash',
    label: 'Cash',
  },
  {
    value: 'Gift Card',
    label: 'Gift Card',
  },
  {
    value: 'Card',
    label: 'Card',
  },
  {
    value: 'Cheque',
    label: 'Cheque',
  },
  {
    value: 'Points',
    label: 'Points',
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

export const SaleReturnForm = ({ data, ...props }) => {
  const productsRef = useRef(null);

  const handleProducts = useCallback((submitFunction) => {
    productsRef.current = submitFunction;
  }, []);

  const [sellData, setSellData] = useState(undefined);

  const handleReturnSubmit = (values) => {
    const productsData = productsRef.current ? productsRef.current() : null;

    const formValues = {
      product_list: productsData.product_list,
    };

    props.handleSubmit(values, { sellData, formValues });
  };

  const [referenceForm] = Form.useForm();
  const [checkSaleReference, { isLoading }] = useCheckSaleReferenceMutation();
  const [refId, setRefId] = useState(null);

  const handleSubmit = async (values) => {
    const { data, error } = await checkSaleReference({ data: values });

    if (data?.data) {
      setSellData(data?.data);

      setRefId(values.reference_id);
    }
    if (error) {
      openNotification(
        'error',
        error?.data?.message ??
          'Purchase Reference doesnot exist or Purchase Return is Pending'
      );
      setSellData(undefined);
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
                label="Sale Reference"
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

            <CustomSaleReturnProductForm
              onCustomSubmit={handleProducts}
              sellData={sellData}
              data={data}
            >
              <Col {...colLayout}>
                <OrderTaxComponent />
              </Col>

              <Col {...colLayout}>
                <CustomDatepicker
                  label="Return Date"
                  required={true}
                  name={'sale_return_at'}
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
            </CustomSaleReturnProductForm>
          </Row>
        </CustomForm>
      )}
    </>
  );
};
