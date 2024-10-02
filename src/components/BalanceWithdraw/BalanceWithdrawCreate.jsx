import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateBalanceWithdrawMutation } from '../../redux/services/balanceWithdraw/balanceWithdrawApi';
import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import BalanceWithdrawForm from './BalanceWithdrawForm';

const BalanceWithdrawCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createBalanceDeposit, { isLoading }] =
    useCreateBalanceWithdrawMutation();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const postData = {
      ...values,
      withdrawal_at: values.withdrawal_at.format('YYYY-MM-DD'),
      attachment: values?.attachment?.[0].originFileObj,
    };

    appendToFormData(postData, formData);

    const { data, error } = await createBalanceDeposit({
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
    <CustomDrawer title={'Create Balance Withdrawal'} open={isCreateDrawerOpen}>
      <BalanceWithdrawForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default BalanceWithdrawCreate;
