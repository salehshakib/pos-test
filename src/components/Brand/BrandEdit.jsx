import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetBrandDetailsQuery,
  useUpdateBrandMutation,
} from "../../redux/services/brand/brandApi";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import { fieldsToUpdate } from "../../utilities/lib/fieldsToUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import BrandForm from "./BrandForm";

export const BrandEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetBrandDetailsQuery({ id }, { skip: !id });

  console.log(isEditDrawerOpen, id);

  const [updateBrand, { isLoading }] = useUpdateBrandMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);
      // const fieldData = [
      //   {
      //     name: "name",
      //     value: data?.name,
      //     errors: "",
      //   },
      // ];

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    console.log(values);

    const postData = {
      ...values,
      logo: values?.logo?.[0].originFileObj,
      _method: "PUT",
    };

    appendToFormData(postData, formData);

    const { data, error } = await updateBrand({
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
      title={"Edit Brand"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <BrandForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
