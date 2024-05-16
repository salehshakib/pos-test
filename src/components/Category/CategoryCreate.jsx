import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCategoryMutation } from "../../redux/services/category/categoryApi";
import {
  closeCategoryDrawer,
  closeCreateDrawer,
} from "../../redux/services/drawer/drawerSlice";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import CategoryForm from "./CategoryForm";

const CategoryCreate = ({ subDrawer }) => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen, isCategoryDrawerOpen } = useSelector(
    (state) => state.drawer
  );

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await createCategory({
      data: values,
    });

    if (data?.success) {
      if (subDrawer) {
        handleCloseSubDrawer();
      } else {
        dispatch(closeCreateDrawer());
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
