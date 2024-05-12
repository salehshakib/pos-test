import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { useCreateTypeMutation } from "../../redux/services/types/typesApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import TypeForm from "./TypeForm";

const TypeCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createType, { isLoading }] = useCreateTypeMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    const { data, error } = await createType({
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
    <CustomDrawer title={"Create Type"} open={isCreateDrawerOpen}>
      <TypeForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default TypeCreate;
