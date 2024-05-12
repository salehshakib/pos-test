import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import UnitForm from "./UnitForm";
import { useCreateUnitMutation } from "../../redux/services/unit/unitApi";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";

const UnitCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createUnit, { isLoading }] = useCreateUnitMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    const { data, error } = await createUnit({
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
    <CustomDrawer title={"Create Unit"} open={isCreateDrawerOpen}>
      <UnitForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default UnitCreate;
