import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetExpenseDetailsQuery,
  useUpdateExpenseMutation,
} from "../../redux/services/expense/expenseApi";
import { fieldsToUpdate } from "../../utilities/lib/fieldsToUpdate";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { ExpenseForm } from "./ExpenseForm";

export const ExpenseEdit = ({ id }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetExpenseDetailsQuery({ id }, { skip: !id });
  const [updateExpense, { isLoading }] = useUpdateExpenseMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateExpense({
      id,
      data: values,
    });

    if (data?.success) {
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };
  return (
    <CustomDrawer
      title={"Edit Expense"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <ExpenseForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
      />
    </CustomDrawer>
  );
};
