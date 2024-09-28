import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUpdateStockManageMutation,
} from '../../redux/services/product/productApi';
import { useGetAllUnitQuery } from '../../redux/services/unit/unitApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { getMissingUids } from '../../utilities/lib/deletedImageIds';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import { calculateById } from '../../utilities/lib/updateFormValues/calculateById';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import ProductForm from './ProductForm';
import { ProductStockForm } from './ProductStockForm';

function getUniqueAttributeIds(variants) {
  const attributeIds = new Set();

  variants.forEach((variant) => {
    variant.product_variant_attribute_options.forEach((option) => {
      attributeIds.add(option.attribute_option.attribute_id.toString());
    });
  });

  // Convert the set to an array to get unique attribute_ids
  return Array.from(attributeIds);
}

const getVariantIdsByCombinedName = (variantData, combinedName) => {
  const names = combinedName.split(' '); // e.g., ['2kg', 'Whte']
  const ids = [];

  names.forEach((name) => {
    for (const optionGroup of variantData) {
      const found = optionGroup.find((option) => option.name === name);
      if (found) {
        ids.push(found.id); // Collect the ID if found
      }
    }
  });

  return ids; // Return the collected IDs
};

const ProductListEdit = ({ id, setId, current, setCurrent }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);
  const { data, isFetching } = useGetProductDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id || !isEditDrawerOpen }
  );
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [updateStockManage, { isLoading: isStockManageLoading }] =
    useUpdateStockManageMutation();

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data: unitData } = useGetAllUnitQuery({
    params,
  });

  const units = unitData?.results?.unit;

  useEffect(() => {
    if (data && isEditDrawerOpen) {
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
        has_promotion,
        promotion_price,
        starting_date,
        last_date,
        has_expired_date,
        expired_date,
        details,
        attachments,
        has_stock,
        has_variant,
        has_different_price,
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
        has_stock,
        has_promotion,
        has_variant,
        has_different_price,
      });

      const newFieldData = [
        ...fieldData,
        {
          name: ['promotion', 'promotion_price'],
          value: promotion_price,
          errors: '',
        },
        {
          name: ['promotion', 'starting_date'],
          value:
            has_promotion.toString() === '1'
              ? dayjs(starting_date, 'YYYY-MM-DD')
              : '',
          errors: '',
        },
        {
          name: ['promotion', 'last_date'],
          value:
            has_promotion.toString() === '1'
              ? dayjs(last_date, 'YYYY-MM-DD')
              : '',
          errors: '',
        },

        {
          name: ['product_expire', 'expired_date'],
          value:
            has_expired_date.toString() === '1'
              ? dayjs(expired_date, 'YYYY-MM-DD')
              : '',
          errors: '',
        },
        {
          name: 'has_variant',
          value: has_variant.toString() === '1' ? true : false,
          errors: '',
        },
        {
          name: 'attribute_ids',
          value: getUniqueAttributeIds(data?.variants),
          errors: '',
        },
      ];

      setFields(newFieldData);
    } else {
      setFields([]);
    }
  }, [data, isEditDrawerOpen, setFields, form]);

  const handleUpdate = async (values, { variantData, formValues }) => {
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

    if (values.attach_file?.[0].originFileObj) {
      postObj.attach_file = values.attach_file?.[0].originFileObj;
    }

    let deleteAttachmentIds = getMissingUids(fields, values);

    if (deleteAttachmentIds.length > 0) {
      postObj.deleteAttachmentIds = deleteAttachmentIds;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await updateProduct({ id, formData });

    if (data?.success) {
      setId(undefined);
      dispatch(closeEditDrawer());
      setCurrent(0);
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };

  const handleStockUpdate = async (values, { formValues }) => {
    const stockListArray = formValues?.stock_list?.qty
      ? Object.keys(formValues.stock_list.qty)
          .filter(
            (product_id) => formValues.stock_list.qty[product_id] !== undefined
          )
          .map((product_id) => {
            const [id, warehouse_id] = product_id.split('-');

            return {
              product_variant_id: parseInt(id),
              qty: formValues.stock_list.qty[product_id],
              warehouse_id,
            };
          })
      : [];

    const priceListArray = formValues?.price_list?.price
      ? Object.keys(formValues.price_list.price)
          .filter(
            (product_id) =>
              formValues.price_list.price[product_id] !== undefined
          )
          .map((product_id) => {
            const [id, warehouse_id] = product_id.split('-'); // Get the first value

            return {
              product_variant_id: parseInt(id), // Use the split value
              price: formValues.price_list.price[product_id],
              warehouse_id,
            };
          })
      : [];

    if (stockListArray.length === 0 && priceListArray.length === 0) {
      dispatch(closeEditDrawer());
      form.resetFields();
      return;
    }

    const formData = new FormData();

    const postObj = {
      stock_list: JSON.stringify(stockListArray),
      price_list: JSON.stringify(priceListArray),
      _method: 'PUT',
    };

    appendToFormData(postObj, formData);

    const { data, error } = await updateStockManage({
      formData,
      id: id,
    });

    if (data?.success) {
      setId(undefined);
      dispatch(closeEditDrawer());
      setCurrent(0);
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };

  const steps = [
    {
      title: 'Create Product',
      content: (
        <ProductForm
          handleSubmit={handleUpdate}
          isLoading={isLoading}
          fields={fields}
          form={form}
          data={data}
        />
      ),
    },
    {
      title: 'Product Stock & Price',
      content: (
        <ProductStockForm
          productId={id}
          isLoading={isStockManageLoading}
          handleSubmit={handleStockUpdate}
          form={form}
          onClose={() => {
            dispatch(closeEditDrawer());
            setCurrent(0);
          }}
          data={data}
        />
      ),
    },
  ];

  return (
    <CustomDrawer
      title={'Edit Product'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
      width={1400}
    >
      {/* <ProductForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
        data={data}
      /> */}
      <div className="">{steps[current].content}</div>
    </CustomDrawer>
  );
};

export default ProductListEdit;
