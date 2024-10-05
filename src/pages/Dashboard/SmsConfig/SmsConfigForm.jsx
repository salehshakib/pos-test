import { Button, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';

import CustomInput from '../../../components/Shared/Input/CustomInput';
import { mdColLayout, rowLayout } from '../../../layout/FormLayout';
import { useUpdateSmsSettingsMutation } from '../../../redux/services/settings/smsSettings/smsSettingsApi';
import { fieldsToUpdate } from '../../../utilities/lib/fieldsToUpdate';

const SmsConfigForm = ({ data }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const [updateSmsSettings, { isLoading }] = useUpdateSmsSettingsMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);
      setFields(fieldData);
    }
  }, [data]);

  const handleSubmit = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('_method', 'PUT');

    await updateSmsSettings({
      data: formData,
    });
  };

  const onFinish = (values) => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => {
        handleSubmit(values);
      })
      .catch((error) => {
        console.error('Validation error:', error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  return (
    <div className="pt-10">
      <Form
        form={form}
        fields={fields}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="on"
        onFinishFailed={onFinishFailed}
        disabled={!data}
      >
        <Row {...rowLayout}>
          <Col {...mdColLayout}>
            <CustomInput label="Api Key" name="api_key" required={true} />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput
              label="Proivder Link"
              name="api_link"
              required={true}
            />
          </Col>
        </Row>

        <div className="flex w-full items-center justify-end gap-3">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SmsConfigForm;
