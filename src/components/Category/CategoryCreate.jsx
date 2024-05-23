import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCategoryMutation } from "../../redux/services/category/categoryApi";
import {
  closeCategoryDrawer,
  closeCreateDrawer,
} from "../../redux/services/drawer/drawerSlice";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import CategoryForm from "./CategoryForm";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import { Form } from "antd";

const CategoryCreate = ({ subDrawer }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [subForm] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen, isCategoryDrawerOpen } = useSelector(
    (state) => state.drawer
  );

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (values) => {
    const postObj = {
      ...values,
      // category_image: values?.category_image?.[0].originFileObj,
    };

    const formData = new FormData();
    appendToFormData(postObj, formData);

    const { data, error } = await createCategory({
      data: formData,
    });

    if (data?.success) {
      if (subDrawer) {
        handleCloseSubDrawer();
        subForm.resetFields();
      } else {
        dispatch(closeCreateDrawer());
        form.resetFields();
      }
    }

    if (error) {
      const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
        name: fieldName,
        errors: error?.data?.errors[fieldName],
      }));

      setErrorFields(errorFields);
    }
  };

  const handleCloseSubDrawer = () => {
    dispatch(closeCategoryDrawer());
  };

  return (
    <CustomDrawer
      title={"Create Category"}
      open={subDrawer ? isCategoryDrawerOpen : isCreateDrawerOpen}
      onClose={subDrawer && handleCloseSubDrawer}
    >
      <CategoryForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={subDrawer ? subForm : form}
        onClose={subDrawer && handleCloseSubDrawer}
      />
    </CustomDrawer>
  );
};

export default CategoryCreate;
