import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "antd";
import {
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from "../../redux/services/category/categoryApi";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import { fieldsToUpdate } from "../../utilities/lib/fieldsToUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import CategoryForm from "./CategoryForm";

const Categoryedit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetCategoryDetailsQuery(
    { id },
    { skip: !id }
  );

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (data) {
      // console.log(data);
      const fieldData = fieldsToUpdate(data);

      // const fieldData = [
      //   {
      //     name: "name",
      //     value: data?.name,
      //     errors: "",
      //   },
      //   {
      //     name: "parent_id",
      //     value: Number(data?.parent_id),
      //     errors: "",
      //   },
      // ];

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateCategory({
      id,
      data: values,
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
      title={"Edit Category"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <CategoryForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default Categoryedit;
