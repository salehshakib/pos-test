import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useGetEmployeeDetailsQuery,
  useUpdateEmployeeMutation,
} from "../../redux/services/hrm/employee/employeeApi";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import {
  fieldsToUpdate,
  updateFieldValues,
} from "../../utilities/lib/fieldsToUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import EmployeeForm from "./EmployeeForm";

const EmployeeEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetEmployeeDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      const updateFieldValue = [
        {
          name: "role_id",
          value: data?.employee_accesses?.role_id?.toString(),
          errors: "",
        },
        {
          name: "warehouse_id",
          value: data?.employee_accesses?.warehouse_id?.toString(),
          errors: "",
        },
        {
          name: "cashier_id",
          value: data?.employee_accesses?.cashier_id?.toString(),
          errors: "",
        },
      ];

      const newFieldData = updateFieldValues(fieldData, updateFieldValue);

      setFields(newFieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateEmployee({
      id,
      data: { ...values, _method: "PUT" },
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
      title={"Edit Employee"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <EmployeeForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default EmployeeEdit;
