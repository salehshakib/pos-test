import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useUpdatePosSettingsMutation } from '../../../redux/services/settings/generalSettings/generalSettingsApi';
import { appendToFormData } from '../../../utilities/lib/appendFormData';
import { fieldsToUpdate } from '../../../utilities/lib/fieldsToUpdate';
import PosSettingComponent from './PosSettingComponent';

export const PosSettingForm = ({ data }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const [updatePosSettings, { isLoading }] = useUpdatePosSettingsMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      const newFieldData = [
        ...fieldData,
        {
          name: 'is_send_email',
          value: data?.is_send_email.toString() === '1' ? true : false,
          errors: '',
        },
        {
          name: 'need_keyboard',
          value: data?.need_keyboard.toString() === '1' ? true : false,
          errors: '',
        },
        {
          name: 'cash_payment',
          value: data?.cash_payment.toString() === '1' ? true : false,
          errors: '',
        },
        {
          name: 'card_payment',
          value: data?.card_payment.toString() === '1' ? true : false,
          errors: '',
        },
        {
          name: 'cheque_payment',
          value: data?.cheque_payment.toString() === '1' ? true : false,
          errors: '',
        },
        {
          name: 'gift_card_payment',
          value: data?.gift_card_payment.toString() === '1' ? true : false,
          errors: '',
        },
      ];

      setFields(newFieldData);

      form.setFieldsValue({
        a4_invoice_type: 'rich',
        thermal_invoice_type: 'rich',
      });
    }
  }, [data, form]);

  const handleSubmit = async (values) => {
    console.log(values);

    // return;
    const formData = new FormData();

    const {
      invoice_of_pos,
      invoice_of_inventory,
      a4_invoice,
      thermal_invoice,
      cash_payment,
      card_payment,
      cheque_payment,
      gift_card_payment,
      is_send_email,
      need_keyboard,
    } = values;

    const postData = {
      invoice_of_pos,
      invoice_of_inventory,
      a4_invoice,
      thermal_invoice,
      cash_payment: cash_payment ? '1' : '0',
      card_payment: card_payment ? '1' : '0',
      cheque_payment: cheque_payment ? '1' : '0',
      gift_card_payment: gift_card_payment ? '1' : '0',
      is_send_email: is_send_email ? '1' : '0',
      need_keyboard: need_keyboard ? '1' : '0',

      _method: 'PUT',
    };

    appendToFormData(postData, formData);

    const { data: updatedData } = await updatePosSettings({
      id: data?.id,
      data: formData,
    });

    if (updatedData?.success) {
      // window.location.reload();
      console.log(updatedData?.data);
    }
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
        <PosSettingComponent
          a4_invoice={data?.a4_invoice}
          thermal_invoice={data?.thermal_invoice}
        />

        <div className="flex w-full items-center justify-end gap-3">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};
