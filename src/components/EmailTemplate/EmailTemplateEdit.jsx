import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetEmailTemplateDetailsQuery,
  useUpdateEmailTemplateMutation,
} from '../../redux/services/emailTemplate/emailTemplateApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { EmailTemplateForm } from './EmailTemplateForm';

export const EmailTemplateEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetEmailTemplateDetailsQuery(
    { id },
    { skip: !id }
  );
  const [updateEmailTemplate, { isLoading }] = useUpdateEmailTemplateMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      const newFieldData = [
        ...fieldData,
        {
          name: 'short',
          value: Object?.keys(JSON.parse(data?.shortcode))?.[0],
          errors: '',
        },
        {
          name: 'code',
          value: JSON.parse(data?.shortcode)[
            Object?.keys(JSON.parse(data?.shortcode))?.[0]
          ],
          errors: '',
        },
      ];

      setFields(newFieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    const { act, body, code, name, short, subject } = values;

    const postData = {
      act,
      body,
      name,
      subject,
      shortcode: JSON.stringify({
        [short]: code,
      }),
      _method: 'PUT',
    };

    appendToFormData(postData, formData);

    const { data, error } = await updateEmailTemplate({
      id,
      data: formData,
    });

    if (data?.success) {
      setId(undefined);
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={'Edit Email Template'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <EmailTemplateForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
