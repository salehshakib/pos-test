import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCreateSmsTemplateMutation } from '../../redux/services/smsTemplate/smsTemplateApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import SmsTemplateForm from './SmsTemplateForm';

const SmsTemplateCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createSmsTemplate, { isLoading }] = useCreateSmsTemplateMutation();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const { act, name, subject, body } = values;

    function getValidShortcodes(shortcodes) {
      return shortcodes.filter(({ object, key }) => {
        return object != null && object !== '' && key != null && key !== '';
      });
    }

    const postData = {
      act,
      body,
      name,
      subject,
      shortcode: JSON.stringify(getValidShortcodes(values?.shortcode)),
    };

    appendToFormData(postData, formData);

    const { data, error } = await createSmsTemplate({
      data: formData,
    });

    if (data?.success) {
      dispatch(closeCreateDrawer());
      form.resetFields();
    }

    if (error) {
      const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
        name: fieldName,
        errors: error?.data?.errors[fieldName],
      }));

      setErrorFields(errorFields);
    }
  };

  return (
    <CustomDrawer title={'Create SMS Template'} open={isCreateDrawerOpen}>
      <SmsTemplateForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default SmsTemplateCreate;
