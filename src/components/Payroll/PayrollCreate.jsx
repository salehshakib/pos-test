import { Form } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { PayrollForm } from "./PayrollForm";

export const PayrollCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  // const [createGiftCard, { isLoading }] = useCreateGiftCardMutation();

  // const handleSubmit = async (values) => {
  //   console.log(values);
  //   const { data, error } = await createGiftCard({
  //     data: {
  //       ...values,
  //       for_user: values?.for_user ? 1 : 0,
  //       expired_date: dayjs(values?.expired_date).format("YYYY-MM-DD"),
  //     },
  //   });
  //   if (data?.success) {
  //     dispatch(closeCreateDrawer());
  //     form.resetFields();
  //   }
  //   if (error) {
  //     const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
  //       name: fieldName,
  //       errors: error?.data?.errors[fieldName],
  //     }));
  //     setErrorFields(errorFields);
  //   }
  // };

  return (
    <CustomDrawer title={"Create Payroll"} open={isCreateDrawerOpen}>
      <PayrollForm
        //   handleSubmit={handleSubmit}
        //   isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};
