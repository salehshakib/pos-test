import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCreateDrawer,
  closeSubDrawer,
} from "../../redux/services/drawer/drawerSlice";
import CategoryForm from "./CategoryForm";

import { useCreateCategoryMutation } from "../../redux/services/category/categoryApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";

const CategoryCreate = ({ subDrawer }) => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen, isSubDrawerOpen } = useSelector(
    (state) => state.drawer
  );

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await createCategory({
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

  const handleCloseSubDrawer = () => {
    dispatch(closeSubDrawer());
  };

  return (
    <CustomDrawer
      title={"Create Category"}
      open={subDrawer ? isSubDrawerOpen : isCreateDrawerOpen}
      onClose={handleCloseSubDrawer}
    >
      <CategoryForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        onClose={handleCloseSubDrawer}
      />
    </CustomDrawer>
  );
};

export default CategoryCreate;
