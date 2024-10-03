import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateAttributeOptionMutation } from '../../redux/services/attributeOption/attributeOptionApi';
import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import AttributeOptionForm from './AttributeOptionForm';

const AttributeOptionCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createAttributeOption, { isLoading }] =
    useCreateAttributeOptionMutation();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const postData = {
      ...values,
      attachment: values?.attachment?.[0].originFileObj,
    };

    appendToFormData(postData, formData);

    const { data, error } = await createAttributeOption({
      formData,
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
    <CustomDrawer title={'Create Attribute Option'} open={isCreateDrawerOpen}>
      <AttributeOptionForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default AttributeOptionCreate;
