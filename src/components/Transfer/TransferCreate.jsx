import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import TransferForm from "./TransferForm";

const TransferCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  //   const [createDepartment, { isLoading }] = useCreateDepartmentMutation();

  const handleSubmit = async (values) => {
    // const { data, error } = await createDepartment({
    //   data: values,
    // });
    // if (data?.success) {
    //   dispatch(closeCreateDrawer());
    // }
    // if (error) {
    //   const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
    //     name: fieldName,
    //     errors: error?.data?.errors[fieldName],
    //   }));
    //   setErrorFields(errorFields);
    // }
  };
  return (
    <CustomDrawer title={"Create Transfer"} open={isCreateDrawerOpen}>
      <TransferForm
        handleSubmit={handleSubmit}
        // isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default TransferCreate;
