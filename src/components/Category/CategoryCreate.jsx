import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import CategoryForm from "./CategoryForm";

import { useCreateCategoryMutation } from "../../redux/services/category/categoryApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";

const CategoryCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

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
  return (
    <CustomDrawer title={"Create Category"} open={isCreateDrawerOpen}>
      <CategoryForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default CategoryCreate;
