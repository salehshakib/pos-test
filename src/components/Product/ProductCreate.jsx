import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import ProductForm from "./ProductForm";
import { useCreateProductMutation } from "../../redux/services/product/productApi";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";

const ProductCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    const { data, error } = await createProduct({
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
    <CustomDrawer title={"Create Product"} open={isCreateDrawerOpen}>
      <ProductForm
        handleSubmit={handleSubmit}
        // isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default ProductCreate;
