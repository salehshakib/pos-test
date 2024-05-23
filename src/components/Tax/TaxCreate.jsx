import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCreateDrawer,
  closeTaxDrawer,
} from "../../redux/services/drawer/drawerSlice";
import { useCreateTaxMutation } from "../../redux/services/tax/taxApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import TaxForm from "./TaxForm";
import { Form } from "antd";

const TaxCreate = ({ subDrawer }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [subForm] = Form.useForm();

  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen, isTaxDrawerOpen } = useSelector(
    (state) => state.drawer
  );

  const [createTax, { isLoading }] = useCreateTaxMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await createTax({
      data: values,
    });
    if (data?.success) {
      if (subDrawer) {
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

  const handleCloseSubDrawer = () => {
    dispatch(closeTaxDrawer());
  };

  return (
    <CustomDrawer
      title={"Add Tax"}
      open={subDrawer ? isTaxDrawerOpen : isCreateDrawerOpen}
      onClose={subDrawer && handleCloseSubDrawer}
    >
      <TaxForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={subDrawer ? subForm : form}
        onClose={subDrawer && handleCloseSubDrawer}
      />
    </CustomDrawer>
  );
};

export default TaxCreate;
