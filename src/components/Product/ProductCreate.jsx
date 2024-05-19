import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import ProductForm from "./ProductForm";
import { useCreateProductMutation } from "../../redux/services/product/productApi";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { appendToFormData } from "../../utilities/lib/appendFormData";

const ProductCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (values) => {
    console.log(values);

    const { qty_list, price_list, product_list } = values ?? {};

    const qtyListArray = Object.keys(qty_list.qty).map((warehouseId) => {
      return {
        warehouse_id: warehouseId,
        qty: qty_list.qty[warehouseId],
      };
    });

    console.log(qtyListArray);

    const priceListArray = Object.keys(price_list.price).map((warehouseId) => {
      return {
        warehouse_id: warehouseId,
        price: price_list.price[warehouseId],
      };
    });

    console.log(priceListArray);

    const productListArray = Object.keys(product_list.qty).map((product_id) => {
      return {
        product_id: parseInt(product_id),
        qty: product_list.qty[product_id],
        price: product_list.unit_price[product_id],
      };
    });

    console.log(productListArray);

    const formData = new FormData();

    const attachmentObj = {
      attachments:
        values.attachments?.length > 0
          ? values.attachments?.map((file) => file.originFileObj)
          : [],

      attach_file:
        values.attach_file?.length > 0 ? values.attach_file.originFileObj : [],
    };

    appendToFormData(attachmentObj, formData);

    // const { data, error } = await createProduct({
    //   data: values,
    // });

    // if (data?.success) {
    //   dispatch(closeCreateDrawer());
    // }
    // if (error) {
    //   const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
    //     name: fieldName,
    //     errors: error?.data?.errors[fieldName],
    //   }));
    //   setErrorFields(errorFields);
    // }
  };

  return (
    <CustomDrawer title={"Create Product"} open={isCreateDrawerOpen}>
      <ProductForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default ProductCreate;
