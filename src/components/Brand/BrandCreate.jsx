import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateBrandMutation } from "../../redux/services/brand/brandApi";
import {
  closeBrandDrawer,
  closeCreateDrawer,
} from "../../redux/services/drawer/drawerSlice";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import BrandForm from "./BrandForm";

const BrandCreate = ({ subDrawer }) => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen, isBrandDrawerOpen } = useSelector(
    (state) => state.drawer
  );

  const [createBrand, { isLoading }] = useCreateBrandMutation();

  const handleSubmit = async (values) => {
    const newObj = {
      ...values,
      brand_image: values?.brand_image?.[0].originFileObj,
    };

    const formData = new FormData();
    appendToFormData(newObj, formData);

    const { data, error } = await createBrand({
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

  const handleCloseSubDrawer = () => {
    dispatch(closeBrandDrawer());
  };

  return (
    <CustomDrawer
      title={"Create Brand"}
      open={subDrawer ? isBrandDrawerOpen : isCreateDrawerOpen}
      onClose={handleCloseSubDrawer}
    >
      <BrandForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        onClose={handleCloseSubDrawer}
      />
    </CustomDrawer>
  );
};

export default BrandCreate;
