import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { useCreateTaxMutation } from "../../redux/services/tax/taxApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import TaxForm from "./TaxForm";

const TaxCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createTax, { isLoading }] = useCreateTaxMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    const { data, error } = await createTax({
      data: values,
    });
    if (data?.success) {
      dispatch(closeCreateDrawer());
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
    <CustomDrawer title={"Add Tax"} open={isCreateDrawerOpen}>
      <TaxForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default TaxCreate;
