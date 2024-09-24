import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useCreateProductMutation,
  useCreateStockManageMutation,
} from '../../redux/services/product/productApi';
import { useGetAllUnitQuery } from '../../redux/services/unit/unitApi';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { calculateById } from '../../utilities/lib/updateFormValues/calculateById';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import ProductForm from './ProductForm';
import { ProductStockForm } from './ProductStockForm';

const getVariantIdsByCombinedName = (variantData, combinedName) => {
  // Split the combined name into its components
  const names = combinedName.split(' '); // e.g., ['2kg', 'Whte']
  const ids = [];

  // Iterate through each part of the name
  names.forEach((name) => {
    // Look through each option group to find the matching name
    for (const optionGroup of variantData) {
      const found = optionGroup.find((option) => option.name === name);
      if (found) {
        ids.push(found.id); // Collect the ID if found
      }
    }
  });

  return ids; // Return the collected IDs
};

const ProductCreate = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);
  const [productId, setProductId] = useState(null);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [createStockManage, { isLoading: isStockManageLoading }] =
    useCreateStockManageMutation();

  const params = useGlobalParams({});

  const { data } = useGetAllUnitQuery({
    params,
  });

  const units = data?.results?.unit;

  const handleSubmit = async (values, { variantData, formValues }) => {
    const formData = new FormData();

    const {
      name,
      type,
      sku,
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

      has_variant,
      embedded_barcode,
      has_promotion,
      promotion,

      has_expired_date,
      product_expire,

      details,
    } = values ?? {};

    const postObj = {
      name,
      sku,
      type,
      symbology,
      brand_id: parseInt(brand_id),
      category_id: parseInt(category_id),
      buying_price:
        purchase_unit_id &&
        calculateById(units, purchase_unit_id, buying_price),

      selling_price: sale_unit_id
        ? calculateById(units, sale_unit_id, selling_price)
        : parseFloat(selling_price),

      profit:
        purchase_unit_id &&
        sale_unit_id &&
        parseFloat(
          calculateById(units, sale_unit_id, selling_price) -
            calculateById(units, purchase_unit_id, buying_price)
        ),

      // qty: qty.toString(),
      alert_qty,
      daily_sale_qty,
      tax_id: tax_id ? parseInt(tax_id) : undefined,
      tax_method,
      has_featured: has_featured ? '1' : '0',
      has_variant: has_variant ? '1' : '0',
      embedded_barcode: embedded_barcode ? '1' : '0',
      has_promotion: has_promotion ? '1' : '0',
      has_expired_date: has_expired_date ? '1' : '0',
      details,

      attachments:
        values.attachments?.length > 0
          ? values.attachments?.map((file) => file.originFileObj)
          : [],
    };

    if (has_promotion) {
      postObj.promotion_price = parseInt(promotion?.promotion_price);
      postObj.starting_date = promotion?.starting_date;
      postObj.last_date = promotion?.last_date;
    }

    if (has_expired_date) {
      postObj.expired_date = product_expire?.expired_date;
    }

    if (type === 'Standard') {
      postObj.unit_id = parseInt(unit_id);
      postObj.purchase_unit_id = parseInt(purchase_unit_id);
      postObj.sale_unit_id = parseInt(sale_unit_id);
    }

    if (type === 'Combo') {
      const productListArray = formValues.stock_list?.qty
        ? Object.keys(formValues.stock_list.qty)
            .filter(
              (product_id) =>
                formValues.stock_list.qty[product_id] !== undefined
            )
            .map((product_id) => ({
              combo_product_id: parseInt(product_id),
              qty: formValues.stock_list.qty[product_id],
              price: formValues.stock_list.amount[product_id],
            }))
        : [];

      if (productListArray.length > 0) {
        postObj.formValues.stock_list = JSON.stringify(productListArray);
      }
    }

    if (values.attach_file?.[0].originFileObj) {
      postObj.attach_file = values.attach_file?.[0].originFileObj;
    }

    if (has_variant) {
      const variantOptions = variantData.selectedRowData.map((item) => {
        return getVariantIdsByCombinedName(item.variant_options, item.name);
      });

      const variantListArray = variantData?.selectedRowData.map(
        (item, index) => {
          return {
            name: name + ' ' + item.name,
            sku: sku + '-' + item.sku,
            iemi_number: item.iemi,
            selling_price: item.price.toString(),
            buying_price: item.cost.toString(),
            attribute_option_ids: variantOptions[index],
          };
        }
      );

      postObj.variant_list = JSON.stringify(variantListArray);
    }

    appendToFormData(postObj, formData);

    const { data, error } = await createProduct({ formData });

    if (data?.success) {
      setProductId(data?.data?.id);
      setCurrent(1);
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

  const [current, setCurrent] = useState(0);

  const handleStockSubmit = async (values, { formValues }) => {
    const stockListArray = formValues.stock_list?.qty
      ? Object.keys(formValues.stock_list.qty)
          .filter(
            (product_id) => formValues.stock_list.qty[product_id] !== undefined
          )
          .map((product_id) => ({
            product_variant_id: parseInt(product_id),
            qty: formValues.stock_list.qty[product_id],
            warehouse_id: formValues.stock_list.warehouse_id[product_id],
          }))
      : [];

    const priceListArray = formValues.price_list?.price
      ? Object.keys(formValues.price_list.price)
          .filter(
            (product_id) =>
              formValues.price_list.price[product_id] !== undefined
          )
          .map((product_id) => ({
            product_variant_id: parseInt(product_id),
            price: formValues.price_list.price[product_id],
            warehouse_id: formValues.price_list.warehouse_id[product_id],
          }))
      : [];

    const formData = new FormData();

    const postObj = {
      stock_list: JSON.stringify(stockListArray),
      price_list: JSON.stringify(priceListArray),
    };

    appendToFormData(postObj, formData);

    const { data, error } = await createStockManage({
      formData,
      id: productId,
    });

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

  const steps = [
    {
      title: 'Create Product',
      content: (
        <ProductForm
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          fields={errorFields}
          form={form}
        />
      ),
    },
    {
      title: 'Product Stock & Price',
      content: (
        <ProductStockForm
          productId={productId}
          isLoading={isStockManageLoading}
          handleSubmit={handleStockSubmit}
          form={form}
          onClose={() => {
            setCurrent(0);
            dispatch(closeCreateDrawer());
          }}
        />
      ),
    },
  ];

  return (
    <CustomDrawer
      title={'Product Create'}
      open={isCreateDrawerOpen}
      width={1400}
    >
      <div className="">{steps[current].content}</div>
    </CustomDrawer>
  );
};

export default ProductCreate;
