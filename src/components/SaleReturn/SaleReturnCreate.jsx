import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import SaleReturnForm from "./SaleReturnForm";

const SaleReturnCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  //   const [createDepartment, { isLoading }] = useCreateDepartmentMutation();

  const handleSubmit = async (values) => {
    console.log(values);
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
    <CustomDrawer title={"Create Sale Return"} open={isCreateDrawerOpen}>
      <SaleReturnForm
        handleSubmit={handleSubmit}
        // isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default SaleReturnCreate;
