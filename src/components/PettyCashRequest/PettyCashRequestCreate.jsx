import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCreatePettyCashRequestMutation } from '../../redux/services/pettyCashRequest/PettyCashRequestApi';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import PettyCashRequestForm from './PettyCashRequestForm';

const PettyCashRequestCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);
  const { pettyCashId } = useSelector((state) => state.pettyCash);
  const user = useSelector((state) => state.auth.user);

  const [createPettyCashRequest, { isLoading }] =
    useCreatePettyCashRequestMutation();

  const handleSubmit = async (values) => {
    const postData = {
      ...values,
      petty_cash_id: pettyCashId,
      from_warehouse_id: user?.warehouse_id,
    };

    const { data, error } = await createPettyCashRequest({
      data: postData,
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
    <CustomDrawer title={'Petty Cash Request'} open={isCreateDrawerOpen}>
      <PettyCashRequestForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default PettyCashRequestCreate;
