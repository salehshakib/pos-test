import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { LeaveForm } from "./LeaveForm";
import {
  useGetLeaveDetailsQuery,
  useUpdateLeaveMutation,
} from "../../redux/services/hrm/leave/leaveApi";
import {
  fieldsToUpdate,
  updateFieldValues,
} from "../../utilities/lib/fieldsToUpdate";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import dayjs from "dayjs";

export const LeaveEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetLeaveDetailsQuery({ id }, { skip: !id });

  // console.log(isEditDrawerOpen, id);

  const [updateLeave, { isLoading }] = useUpdateLeaveMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      const updateFieldData = [
        {
          name: "department_id",
          value: data?.department_id.toString(),
          errors: "",
        },
        {
          name: "employee_id",
          value: data?.employee_id.toString(),
          errors: "",
        },
        {
          name: "leave_type_id",
          value: data?.leave_type_id.toString(),
          errors: "",
        },
      ];

      const newFieldData = updateFieldValues(fieldData, updateFieldData);

      setFields(newFieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    console.log(values);

    const postData = {
      ...values,
      leave_start_date: dayjs(values?.leave_start_date).format("YYYY-MM-DD"),
      leave_end_date:
        values?.leave_type === "Half Day" || values?.leave_type === "Single Day"
          ? dayjs(values?.leave_start_date).format("YYYY-MM-DD")
          : dayjs(values?.leave_end_date).format("YYYY-MM-DD"),
      is_send_email: values?.is_send_email == true ? 1 : 0,
      _method: "PUT",
    };

    if (values?.attachment) {
      postData.attachment = values?.attachment?.[0]?.originFileObj;
    }

    appendToFormData(postData, formData);

    const { data, error } = await updateLeave({
      id,
      data: formData,
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
      title={"Edit Leave"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <LeaveForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
