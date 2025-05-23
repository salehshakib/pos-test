import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCreateSupplierMutation } from '../../redux/services/supplier/supplierApi';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import SupplierForm from './SupplierForm';

const SupplierCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createSupplier, { isLoading }] = useCreateSupplierMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await createSupplier({ data: values });

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
    <CustomDrawer title={'Create Supplier'} open={isCreateDrawerOpen}>
      <SupplierForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default SupplierCreate;
