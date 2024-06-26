import { Form } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { PayrollForm } from "./PayrollForm";
import { useCreatePayrollMutation } from "../../redux/services/hrm/payroll/payrollApi";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";

export const PayrollCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createPayroll, { isLoading }] = useCreatePayrollMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await createPayroll({
      data: {
        ...values,
        date: dayjs(values?.date).format("YYYY-MM-DD"),
        is_send_email: values?.is_send_email == true ? 1 : 0,
        bonus: Number(values?.bonus).toFixed(2),
        // loan: Number(values?.loan).toFixed(2),
        salary: Number(values?.salary).toFixed(2),
      },
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
    <CustomDrawer title={"Create Payroll"} open={isCreateDrawerOpen}>
      <PayrollForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};
