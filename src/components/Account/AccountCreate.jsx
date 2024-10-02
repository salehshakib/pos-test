import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateAccountMutation } from '../../redux/services/account/accountApi';
import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import AccountForm from './AccountForm';

const AccountCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await createAccount({
      data: values,
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
    <CustomDrawer title={'Create Account'} open={isCreateDrawerOpen}>
      <AccountForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default AccountCreate;
