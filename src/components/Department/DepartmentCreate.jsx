import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import DepartmentForm from "../../pages/Dashboard/Hrm/Department/DepartmentForm";
import { useCreateDepartmentMutation } from "../../redux/services/hrm/department/departmentApi";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { useState } from "react";

const DepartmentCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await createDepartment({
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
    <CustomDrawer title={"Create Department"} open={isCreateDrawerOpen}>
      <DepartmentForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default DepartmentCreate;
