import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import EmployeeForm from "./EmployeeForm";
import { useCreateEmployeeMutation } from "../../redux/services/hrm/employee/employeeApi";
import dayjs from "dayjs";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";

const EmployeeCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const handleSubmit = async (values) => {
    console.log(values);

    const { profile_picture, nid_front, nid_back, joining_doc, cv } =
      values ?? {};

    const formData = new FormData();

    const postObj = {
      ...values,
      joining_date: dayjs(values?.joining_date).format("YYYY-MM-DD"),
    };

    if (profile_picture) {
      postObj.profile_picture = profile_picture?.[0]?.originFileObj;
    }

    if (nid_front) {
      postObj.nid_front = nid_front?.[0]?.originFileObj;
    }
    if (nid_back) {
      postObj.nid_back = nid_back?.[0]?.originFileObj;
    }
    if (joining_doc) {
      postObj.joining_doc = joining_doc?.[0]?.originFileObj;
    }
    if (cv) {
      postObj.cv = cv?.[0]?.originFileObj;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await createEmployee({
      data: formData,
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
    <CustomDrawer title={"Create Employee"} open={isCreateDrawerOpen}>
      <EmployeeForm
        handleSubmit={handleSubmit}
        // isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default EmployeeCreate;
