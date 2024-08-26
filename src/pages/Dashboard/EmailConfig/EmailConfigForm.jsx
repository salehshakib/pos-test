import { Button, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import CustomInput from '../../../components/Shared/Input/CustomInput';
import CustomSelect from '../../../components/Shared/Select/CustomSelect';
import { mdColLayout, rowLayout } from '../../../layout/FormLayout';
import { useUpdateEmailSettingsMutation } from '../../../redux/services/settings/emailSettings/emailSettingsApi';
import { fieldsToUpdate } from '../../../utilities/lib/fieldsToUpdate';

const ProtocolComponent = () => {
  const options = [
    {
      label: 'SMTP',
      value: 'smtp',
    },
    {
      label: 'POP3',
      value: 'pop3',
      disabled: true,
    },
    {
      label: 'IMAP',
      value: 'imap',
      disabled: true,
    },
  ];

  return (
    <CustomSelect
      label="Protocol"
      required={true}
      options={options}
      name="mail_server"
    />
  );
};

const EmailEncryptionComponent = () => {
  const options = [
    {
      label: 'TLS',
      value: 'tls',
    },
    {
      label: 'SSL',
      value: 'ssl',
    },
  ];

  return (
    <CustomSelect
      label="Email Encryption"
      required={true}
      options={options}
      name="mail_encryption"
    />
  );
};

export const EmailConfigForm = ({ data }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const [updateEmailSettings, { isLoading }] = useUpdateEmailSettingsMutation();

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

    await updateEmailSettings({
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
    console.log(errorInfo);
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
            <ProtocolComponent />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput label="Host" name="mail_host" required={true} />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput
              label="Port"
              name="mail_port"
              type="number"
              required={true}
            />
          </Col>
          <Col {...mdColLayout}>
            {/* <CustomInput label="Encryption" name="encryption" /> */}
            <EmailEncryptionComponent />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput
              label="User Name"
              name="mail_username"
              required={true}
            />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput
              label="Password"
              name="mail_password"
              type="password"
              required={true}
            />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput
              label="Email Address (From)"
              name="mail_from_address"
              type="email"
              required={true}
            />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput
              label="Name (From)"
              name="mail_from_name"
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
