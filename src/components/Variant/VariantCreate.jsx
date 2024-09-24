import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCreateVariantsMutation } from '../../redux/services/variant/variantApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { VariantForm } from './VariantForm';

export const VariantCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createVariants, { isLoading }] = useCreateVariantsMutation();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const postObj = values;

    appendToFormData(postObj, formData);

    const { data, error } = await createVariants({
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
    <CustomDrawer title={'Create Attribute'} open={isCreateDrawerOpen}>
      <VariantForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};
