import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateCustomerMutation } from '../../redux/services/customer/customerApi';
import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { CustomerForm } from './CustomerForm';

const CustomerCreate = ({
  subDrawer,
  isSubDrawerOpen,
  handleCloseSubDrawer,
}) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [subForm] = Form.useForm();

  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createCustomer, { isLoading }] = useCreateCustomerMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await createCustomer({ data: values });

    if (data?.success) {
      if (subDrawer && isSubDrawerOpen) {
        handleCloseSubDrawer();
        subForm.resetFields();
      } else {
        dispatch(closeCreateDrawer());
        form.resetFields();
      }
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
    <CustomDrawer
      title={'Create Customer'}
      open={subDrawer ? isSubDrawerOpen : isCreateDrawerOpen}
      onClose={subDrawer && handleCloseSubDrawer}
    >
      <CustomerForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={subDrawer ? subForm : form}
        onClose={subDrawer && handleCloseSubDrawer}
      />
    </CustomDrawer>
  );
};

export default CustomerCreate;
