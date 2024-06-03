import { Form } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { useCreatePettyCashMutation } from "../../redux/services/pettycash/pettyCashApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { PettyCashForm } from "./PettyCashForm";

export const PettyCashCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createPettyCash, { isLoading }] = useCreatePettyCashMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    const { data, error } = await createPettyCash({
      data: {
        ...values,
        for_user: values?.for_user ? 1 : 0,
        expired_date: dayjs(values?.expired_date).format("YYYY-MM-DD"),
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
    <CustomDrawer title={"Create Gift Card"} open={isCreateDrawerOpen}>
      <PettyCashForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};
