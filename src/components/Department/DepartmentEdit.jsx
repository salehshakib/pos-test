import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useGetDepartmentDetailsQuery,
  useUpdateDepartmentMutation,
} from "../../redux/services/hrm/department/departmentApi";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import DepartmentForm from "./DepartmentForm";

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
      const errorFields = errorFieldsUpdate(fields, error);

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
