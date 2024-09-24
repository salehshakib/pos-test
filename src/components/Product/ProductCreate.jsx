import { Button, Form, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCreateProductMutation } from '../../redux/services/product/productApi';
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

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createProduct, { isLoading }] = useCreateProductMutation();

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

    const { product_list, qty_list, price_list } = formValues;

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
      const productListArray = product_list?.qty
        ? Object.keys(product_list.qty)
            .filter((product_id) => product_list.qty[product_id] !== undefined)
            .map((product_id) => ({
              combo_product_id: parseInt(product_id),
              qty: product_list.qty[product_id],
              price: product_list.amount[product_id],
            }))
        : [];

      if (productListArray.length > 0) {
        postObj.product_list = JSON.stringify(productListArray);
      }
    }

    if (values.attach_file?.[0].originFileObj) {
      postObj.attach_file = values.attach_file?.[0].originFileObj;
    }

    // if (has_stock) {
    //   const qtyListArray = qty_list?.qty
    //     ? Object.keys(qty_list.qty).map((warehouseId) => {
    //         return {
    //           warehouse_id: parseInt(warehouseId, 10),
    //           qty: parseInt(qty_list.qty[warehouseId], 10),
    //         };
    //       })
    //     : [];

    //   if (qtyListArray.length) {
    //     const qty = qtyListArray.reduce(
    //       (sum, item) => parseInt(sum) + parseInt(item.qty),
    //       0
    //     );

    //     postObj.qty = qty.toString();
    //     postObj.qty_list = JSON.stringify(qtyListArray);
    //   } else {
    //     return openNotification('info', 'Please add atleast one warehouse');
    //   }
    // }

    // if (has_different_price) {
    //   const priceListArray = price_list?.price
    //     ? Object.keys(price_list.price).map((warehouseId) => {
    //         return {
    //           warehouse_id: parseInt(warehouseId, 10),
    //           price: parseFloat(price_list.price[warehouseId]),
    //         };
    //       })
    //     : [];

    //   if (priceListArray.length) {
    //     postObj.price_list = JSON.stringify(priceListArray);
    //   } else {
    //     // return message.error("Please add price");
    //     return openNotification('info', 'Please add atleast one warehouse');
    //   }
    // }

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

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleStockSubmit = (values, { formValues }) => {
    console.log(formValues);
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
        <ProductStockForm handleSubmit={handleStockSubmit} form={form} />
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
      <div className="flex justify-end pb-48">
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
      </div>
    </CustomDrawer>
  );
};

export default ProductCreate;
