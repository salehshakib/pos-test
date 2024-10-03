import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetExpenseDetailsQuery,
  useUpdateExpenseMutation,
} from '../../redux/services/expense/expenseApi';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { ExpenseForm } from './ExpenseForm';

export const ExpenseEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { pettyCashId } = useSelector((state) => state.pettyCash);
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetExpenseDetailsQuery({ id }, { skip: !id });
  const [updateExpense, { isLoading }] = useUpdateExpenseMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    } else {
      setFields([]);
    }
  }, [data, setFields, isEditDrawerOpen]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateExpense({
      id,
      data: { ...values, petty_cash_id: pettyCashId, _method: 'PUT' },
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
      title={'Edit Expense'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <ExpenseForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
