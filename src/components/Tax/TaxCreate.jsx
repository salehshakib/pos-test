import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCreateDrawer,
  closeTaxDrawer,
} from "../../redux/services/drawer/drawerSlice";
import { useCreateTaxMutation } from "../../redux/services/tax/taxApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import TaxForm from "./TaxForm";

const TaxCreate = ({ subDrawer }) => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen, isTaxDrawerOpen } = useSelector(
    (state) => state.drawer
  );

  const [createTax, { isLoading }] = useCreateTaxMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    const { data, error } = await createTax({
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

  const handleCloseSubDrawer = () => {
    dispatch(closeTaxDrawer());
  };

  return (
    <CustomDrawer
      title={"Add Tax"}
      open={subDrawer ? isTaxDrawerOpen : isCreateDrawerOpen}
      onClose={handleCloseSubDrawer}
    >
      <TaxForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        onClose={handleCloseSubDrawer}
      />
    </CustomDrawer>
  );
};

export default TaxCreate;
