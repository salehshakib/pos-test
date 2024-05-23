import { Form } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { useCreateProductMutation } from "../../redux/services/product/productApi";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import ProductForm from "./ProductForm";

const ProductCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const {
      name,
      type,
      sku,
      qty_list,
      price_list,
      product_list,
      symbology,
      brand_id,
      category_id,
      unit_id,
      purchase_unit_id,
      sale_unit_id,
      buying_price,
      selling_price,
      alert_qty,
      daily_sale_qty,
      tax_method,
      tax_id,
      has_featured,
      has_stock,
      has_variant,
      embedded_barcode,
      has_promotion,
      promotion,
      has_different_price,
      has_expired_date,
      product_expire,
      ecommerce_sync,
      details,
    } = values ?? {};

    const qtyListArray = Object.keys(qty_list?.qty || {})?.map(
      (warehouseId) => {
        return {
          warehouse_id: warehouseId,
          qty: qty_list?.qty[warehouseId],
        };
      }
    );

    const qty = qtyListArray?.reduce((sum, item) => sum + item.qty, 0);

    const priceListArray = Object.keys(price_list?.price || {})?.map(
      (warehouseId) => {
        return {
          warehouse_id: warehouseId,
          price: price_list?.price[warehouseId],
        };
      }
    );

    const productListArray = Object.keys(product_list?.qty || {})?.map(
      (product_id) => {
        return {
          product_id: parseInt(product_id),
          qty: product_list?.qty[product_id],
          price: product_list?.unit_price[product_id],
        };
      }
    );

    const attachmentObj = {
      attachments:
        values.attachments?.length > 0
          ? values.attachments?.map((file) => file.originFileObj)
          : [],

      attach_file:
        values.attach_file?.length > 0
          ? values.attach_file?.[0].originFileObj
          : [],

      name,
      sku,
      type,
      symbology,
      brand_id: parseInt(brand_id),
      category_id: parseInt(category_id),
      unit_id: parseInt(unit_id),
      purchase_unit_id: parseInt(purchase_unit_id),
      sale_unit_id: parseInt(sale_unit_id),
      buying_price: parseInt(buying_price),
      selling_price: parseInt(selling_price),
      profit: parseInt(Number(selling_price) - Number(buying_price)),
      qty: qty.toString(),
      alert_qty,
      daily_sale_qty,
      tax_method,
      tax_id,
      product_list: JSON.stringify(productListArray),
      has_featured: has_featured ? 1 : 0,
      has_stock: has_stock ? 1 : 0,
      qty_list: has_stock ? JSON.stringify(qtyListArray) : "",
      has_variant: has_variant ? 1 : 0,
      embedded_barcode: embedded_barcode ? 1 : 0,
      has_promotion: has_promotion ? 1 : 0,
      promotion_price: promotion?.promotion_price,
      starting_date:
        promotion && dayjs(promotion?.starting_date).format("YYYY-MM-DD"),
      last_date: promotion && dayjs(promotion?.last_date).format("YYYY-MM-DD"),
      has_different_price: has_different_price ? 1 : 0,
      price_list: has_different_price && JSON.stringify(priceListArray),
      has_expired_date: has_expired_date ? 1 : 0,
      expired_date:
        has_expired_date &&
        dayjs(product_expire?.expired_date).format("YYYY-MM-DD"),
      ecommerce_sync: ecommerce_sync ? 1 : 0,
      details,
    };

    appendToFormData(attachmentObj, formData);

    const { data, error } = await createProduct({ formData });

    if (data?.success) {
      dispatch(closeCreateDrawer());
      form.resetFields();
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
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default ProductCreate;
