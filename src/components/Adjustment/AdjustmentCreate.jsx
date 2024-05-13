import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import AdjustmentForm from "./AdjustmentForm";
import { useCreateAdjustmentMutation } from "../../redux/services/adjustment/adjustmentApi";
// import RolePermissionForm from "../RolePermission/RolePermissionForm";

const AdjustmentCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createAdjustment, { isLoading }] = useCreateAdjustmentMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    // const { data, error } = await createAdjustment({
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
    <CustomDrawer title={"Create Adjustment"} open={isCreateDrawerOpen}>
      {/* <RolePermissionForm
        handleSubmit={handleSubmit}
        // isLoading={isLoading}
        fields={errorFields}
      /> */}
      <AdjustmentForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default AdjustmentCreate;
