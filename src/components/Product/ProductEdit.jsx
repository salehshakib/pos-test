import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/services/product/productApi";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import ProductForm from "./ProductForm";
import dayjs from "dayjs";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import { fieldsToUpdate } from "../../utilities/lib/fieldsToUpdate";

const ProductListEdit = ({ id }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);
  const { data, isFetching } = useGetProductDetailsQuery({ id }, { skip: !id });
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data) {
      const {
        name,
        sku,
        type,
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
        embedded_barcode,
        has_promotion,
        has_featured,
        promotion_price,
        starting_date,
        last_date,
        has_different_price,
        has_expired_date,
        expired_date,
        ecommerce_sync,
        details,
        has_stock,
        attachments,
      } = data;

      const fieldData = fieldsToUpdate({
        name,
        sku,
        type,
        symbology,
        brand_id: brand_id?.toString(),
        category_id: category_id?.toString(),
        unit_id: unit_id?.toString(),
        purchase_unit_id: purchase_unit_id?.toString(),
        sale_unit_id: sale_unit_id?.toString(),
        buying_price,
        selling_price,
        alert_qty,
        daily_sale_qty,
        tax_method,
        tax_id,
        attachments,
        details,
      });

      console.log(data);

      const qtyListArray =
        JSON.parse(data?.qty_list)?.map((item) => item) ?? [];
      const productListArray =
        JSON.parse(data?.product_list)?.map((item) => item) ?? [];
      const priceListArray =
        JSON.parse(data?.price_list)?.map((item) => item) ?? [];

      const newFieldData = [
        ...fieldData,

        {
          name: "product_id",
          value: productListArray?.map((item) => item?.product_id.toString()),
          errors: "",
        },
        ...productListArray.map((item) => {
          return {
            name: [
              "product_list",
              "unit_price",
              `${item?.product_id.toString()}`,
            ],
            value: item?.price,
            errors: "",
          };
        }),
        ...productListArray.map((item) => {
          return {
            name: ["product_list", "qty", `${item?.product_id.toString()}`],
            value: item?.qty,
            errors: "",
          };
        }),
        {
          name: "has_stock",
          value: has_stock === "1" ? true : false,
          errors: "",
        },
        {
          name: "initial_stock_warehouse_id",
          value: qtyListArray?.map((item) => item?.warehouse_id?.toString()),
          errors: "",
        },
        ...qtyListArray.map((item) => {
          return {
            name: ["qty_list", "qty", item?.warehouse_id?.toString()],
            value: item?.qty,
            errors: "",
          };
        }),
        {
          name: "has_different_price",
          value: has_different_price === "1" ? true : false,
          errors: "",
        },
        {
          name: "warehouse_id",
          value: priceListArray?.map((item) => item?.warehouse_id?.toString()),
          errors: "",
        },
        ...priceListArray.map((item) => {
          return {
            name: ["price_list", "price", item?.warehouse_id?.toString()],
            value: item?.price,
            errors: "",
          };
        }),
        {
          name: "has_promotion",
          value: has_promotion === "1" ? true : false,
          errors: "",
        },
        {
          name: ["promotion", "promotion_price"],
          value: promotion_price,
          errors: "",
        },
        {
          name: ["promotion", "starting_date"],
          value:
            has_promotion === "1" ? dayjs(starting_date, "YYYY-MM-DD") : "",
          errors: "",
        },
        {
          name: ["promotion", "last_date"],
          value: has_promotion === "1" ? dayjs(last_date, "YYYY-MM-DD") : "",
          errors: "",
        },
        {
          name: "has_expired_date",
          value: has_expired_date === "1" ? true : false,
          errors: "",
        },
        {
          name: ["product_expire", "expired_date"],
          value:
            has_expired_date === "1" ? dayjs(expired_date, "YYYY-MM-DD") : "",
          errors: "",
        },
        {
          name: "ecommerce_sync",
          value: ecommerce_sync === "1" ? true : false,
          errors: "",
        },
        {
          name: "has_featured",
          value: has_featured === "1" ? true : false,
          errors: "",
        },
        {
          name: "embedded_barcode",
          value: embedded_barcode === "1" ? true : false,
          errors: "",
        },
      ];

      // ecommerce_sync,
      // has_featured, has_stock, has_variant, embedded_barcode,
      // has_promotion, has_different_price,
      // has_expired_date,

      // const fieldData = [
      //   {
      //     name: "name",
      //     value: data?.name,
      //     errors: "",
      //   },

      // ];

      console.log(newFieldData);

      setOptions(
        productListArray?.map((item) => {
          return {
            value: item?.product_id.toString(),
            // label: `Product ${item?.product_id}`,
          };
        })
      );
      setFields(newFieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
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

    const formData = new FormData();

    const postObj = {
      attachments:
        values.attachments?.length > 0
          ? values.attachments?.map((file) => file.originFileObj)
          : [],

      attach_file:
        values.attach_file?.length > 0 ? values.attach_file.originFileObj : [],
      formData,
      name,
      sku,
      type,
      symbology,
      brand_id,
      category_id,
      unit_id,
      purchase_unit_id,
      sale_unit_id,
      buying_price,
      selling_price,
      profit: Number(selling_price) - Number(buying_price),
      qty,
      alert_qty,
      daily_sale_qty,
      tax_method,
      tax_id,
      has_featured: has_featured ? 1 : 0,
      has_stock: has_stock ? 1 : 0,
      qty_list: has_stock && JSON.stringify(qtyListArray),
      has_variant: has_variant ? 1 : 0,
      embedded_barcode: embedded_barcode ? 1 : 0,
      has_promotion: has_promotion ? 1 : 0,
      promotion_price: promotion?.promotion_price,
      starting_date:
        promotion && dayjs(promotion?.start_date).format("YYYY-MM-DD"),
      last_date: promotion && dayjs(promotion?.last_date).format("YYYY-MM-DD"),
      has_different_price: has_different_price ? 1 : 0,
      price_list: has_different_price && JSON.stringify(priceListArray),
      product_list: JSON.stringify(productListArray),
      has_expired_date: has_expired_date ? 1 : 0,
      expired_date:
        has_expired_date &&
        dayjs(product_expire?.expired_date).format("YYYY-MM-DD"),

      ecommerce_sync: ecommerce_sync ? 1 : 0,
      details,
    };

    appendToFormData(postObj, formData);

    const { data, error } = await updateProduct({ id, formData });

    if (data?.success) {
      // setId(undefined);
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={"Edit Product"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <ProductForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        options={options}
      />
    </CustomDrawer>
  );
};

export default ProductListEdit;
