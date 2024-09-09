import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../redux/services/product/productApi';
import { useGetAllUnitQuery } from '../../redux/services/unit/unitApi';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { getMissingUids } from '../../utilities/lib/deletedImageIds';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import { openNotification } from '../../utilities/lib/openToaster';
import { calculateById } from '../../utilities/lib/updateFormValues/calculateById';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import ProductForm from './ProductForm';

const ProductListEdit = ({ id, setId }) => {
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

  const params = useGlobalParams({});

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
        // {
        //   name: "ecommerce_sync",
        //   value: ecommerce_sync === "1" ? true : false,
        //   errors: "",
        // },
        // {
        //   name: "has_featured",
        //   value: has_featured === "1" ? true : false,
        //   errors: "",
        // },
        // {
        //   name: "embedded_barcode",
        //   value: embedded_barcode === "1" ? true : false,
        //   errors: "",
        // },
      ];

      setFields(newFieldData);
    } else {
      setFields([]);
    }
  }, [data, isEditDrawerOpen, setFields, form]);

  const handleUpdate = async (values, { formValues }) => {
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
      has_stock,
      has_variant,
      has_promotion,
      promotion,
      has_different_price,
      has_expired_date,
      product_expire,
      details,
    } = values ?? {};

    const { qty_list, price_list, product_list } = formValues;

    const qtyListArray = has_stock
      ? Object.keys(qty_list?.qty || {}).map((warehouseId) => {
          return {
            warehouse_id: warehouseId,
            qty: qty_list?.qty?.[warehouseId],
          };
        })
      : [];

    if (has_stock && qtyListArray.length === 0) {
      return openNotification('info', 'Please add atleast one warehouse');
    }

    const qty = qtyListArray.reduce(
      (sum, item) => parseInt(sum) + parseInt(item.qty),
      0
    );

    const priceListArray = has_different_price
      ? Object.keys(price_list?.price || {}).map((warehouseId) => {
          return {
            warehouse_id: warehouseId,
            price: price_list?.price?.[warehouseId],
          };
        })
      : [];

    const productListArray = Object.keys(product_list?.qty || {})?.map(
      (product_id) => {
        return {
          combo_product_id: parseInt(product_id),
          qty: product_list?.qty?.[product_id],
          price: product_list?.amount?.[product_id],
        };
      }
    );

    const formData = new FormData();

    const postObj = {
      name,
      sku,
      type,
      symbology,
      brand_id: parseInt(brand_id),
      category_id: parseInt(category_id),
      unit_id: parseInt(unit_id),
      purchase_unit_id: parseInt(purchase_unit_id),
      sale_unit_id: parseInt(sale_unit_id),
      buying_price: calculateById(units, purchase_unit_id, buying_price),
      selling_price: calculateById(units, sale_unit_id, selling_price),
      // buying_price: parseInt(buying_price),
      // selling_price: parseInt(selling_price),
      profit: parseInt(Number(selling_price) - Number(buying_price)),
      qty: qty.toString(),
      alert_qty,
      daily_sale_qty,
      tax_method,
      tax_id,
      has_stock: has_stock ? '1' : '0',
      qty_list: has_stock && JSON.stringify(qtyListArray),
      has_variant: has_variant ? '1' : '0',
      has_promotion: has_promotion ? '1' : '0',
      has_different_price: has_different_price ? '1' : '0',
      price_list: has_different_price && JSON.stringify(priceListArray),
      has_expired_date: has_expired_date ? '1' : '0',
      details,
      _method: 'PUT',
    };

    if (productListArray.length > 0) {
      postObj.product_list = JSON.stringify(productListArray);
    }

    let deleteAttachmentIds = getMissingUids(fields, values);

    if (deleteAttachmentIds.length > 0) {
      postObj.deleteAttachmentIds = deleteAttachmentIds;
    }

    if (values?.attachments.length > 0) {
      postObj.attachments = values.attachments
        ?.map((file) => (file.originFileObj ? file.originFileObj : null))
        .filter(Boolean);
    }

    if (values?.attach_file?.[0].url) {
      postObj.attach_file = values.attach_file?.[0].originFileObj;
    }

    if (values?.has_expired_date) {
      postObj.expired_date = product_expire?.expired_date;
    }

    if (has_promotion) {
      postObj.promotion_price = promotion?.promotion_price;
      postObj.starting_date = promotion && promotion?.starting_date;
      postObj.last_date = promotion && promotion?.last_date;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await updateProduct({ id, formData });

    if (data?.success) {
      setId(undefined);
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={'Edit Product'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
      width={1400}
    >
      <ProductForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
        data={data}
      />
    </CustomDrawer>
  );
};

export default ProductListEdit;
