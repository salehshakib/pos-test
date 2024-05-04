import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepartmentForm from "../../pages/Dashboard/Hrm/Department/DepartmentForm";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useGetDepartmentDetailsQuery,
  useUpdateDepartmentMutation,
} from "../../redux/services/hrm/department/departmentApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";

const DepartmentEdit = ({ id, setId }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetDepartmentDetailsQuery(
    { id },
    { skip: !id }
  );
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();

  useEffect(() => {
    if (data) {
      // const fieldData = fieldsToUpdate(data);
      const fieldData = [
        {
          name: "name",
          value: data?.name,
          errors: "",
        },
      ];

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateDepartment({
      data: { id, ...values },
    });

    if (data?.success) {
      setId(undefined);
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = Object.keys(error?.data?.errors)?.map(
        (fieldName) => ({
          name: fieldName,
          value: fields.find((field) => field.name === fieldName).value,
          errors: error?.data?.errors[fieldName],
        })
      );

      setFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={"Edit Department"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <DepartmentForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
      />
    </CustomDrawer>
  );
};

export default DepartmentEdit;
