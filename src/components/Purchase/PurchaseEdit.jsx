import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCurrentUser } from '../../redux/services/auth/authSlice';
import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetPurchaseDetailsQuery,
  useUpdatePurchaseMutation,
} from '../../redux/services/purchase/purchaseApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { getMissingUids } from '../../utilities/lib/deletedImageIds';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from '../../utilities/lib/generator/generatorUtils';
import { openNotification } from '../../utilities/lib/openToaster';
import { decimalConverter } from '../../utilities/lib/return/decimalComverter';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { PurchaseForm } from './PurchaseForm';

export const PurchaseEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const user = useSelector(useCurrentUser);

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetPurchaseDetailsQuery(
    { id, params: { child: 1, parent: 1 } },
    { skip: !id }
  );

  const [updatePurchase, { isLoading }] = useUpdatePurchaseMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      let newFieldData = [
        ...fieldData,
        {
          name: 'warehouse_id',
          value: data?.warehouse_id.toString(),
          errors: '',
        },
        {
          name: 'supplier_id',
          value: data?.supplier_id.toString(),
          errors: '',
        },
        // {
        //   name: 'tax_id',
        //   value: data?.supplier_id.toString(),
        //   errors: '',
        // },
      ];

      if (data?.attachments?.length > 0) {
        newFieldData = [
          ...newFieldData,
          {
            name: 'attachment',
            value: [
              {
                url: data?.attachments?.[0]?.url,
              },
            ],
            erros: '',
          },
        ];
      }

      setFields(newFieldData);
    } else {
      setFields([]);
    }
  }, [data, isEditDrawerOpen, setFields, form]);

  const handleUpdate = async (values, { formValues }) => {
    const formData = new FormData();

    const { product_list } = formValues;

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_id: parseInt(product_id),
            qty: product_list.qty[product_id],
            recieved: product_list.recieved[product_id],
            purchase_unit_id: product_list.purchase_unit_id[product_id],
            net_unit_cost: decimalConverter(
              product_list.net_unit_cost[product_id]
            ),
            discount: decimalConverter(product_list.discount[product_id]),
            tax_rate: decimalConverter(product_list.tax_rate[product_id]),
            tax: decimalConverter(product_list.tax[product_id]),
            total: decimalConverter(product_list.total[product_id]),
          }))
      : [];

    if (productListArray.length === 0) {
      openNotification('info', 'Please add atleast one product');

      return;
    }

    const totalPrice = calculateTotalPrice(product_list);
    const orderTax = calculateTotalTax(
      totalPrice,
      values.tax_rate,
      values?.discount
    );

    const totalQty =
      Object.values(formValues.product_list?.qty).reduce(
        (acc, cur) => acc + parseInt(cur),
        0
      ) ?? 0;

    const totalDiscount =
      Object.values(formValues.product_list?.discount).reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
      ) ?? 0;

    const totalTax =
      Object.values(formValues.product_list?.tax).reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
      ) ?? 0;

    const {
      attachment,
      warehouse_id,
      supplier_id,
      purchase_status,
      currency,
      exchange_rate,
      purchase_note,
      payment_status,
      paid_amount,
      payment_type,
    } = values;

    const grandTotal = calculateGrandTotal(
      totalPrice,
      values.tax_rate,
      values?.discount ?? 0,
      values?.shipping_cost ?? 0
    );

    const postData = {
      warehouse_id,
      supplier_id,
      purchase_status,
      currency,
      exchange_rate,
      purchase_note,
      payment_status,
      payment_type,
      paid_amount: paid_amount && decimalConverter(paid_amount),
      due_amount: paid_amount ? decimalConverter(grandTotal - paid_amount) : 0,
      purchase_at: dayjs(values?.purchase_at).format('YYYY-MM-DD'),
      discount: decimalConverter(values?.discount),
      shipping_cost: decimalConverter(values?.shipping_cost),
      tax_rate: decimalConverter(values?.tax_rate),
      item: productListArray.length,
      total_qty: totalQty,
      total_discount: decimalConverter(totalDiscount),
      total_tax: decimalConverter(totalTax),
      total_price: decimalConverter(totalPrice),
      tax: decimalConverter(orderTax),
      grand_total: grandTotal,
      product_list: JSON.stringify(productListArray),
      petty_cash_id: user?.petty_cash_id,
      _method: 'put',
    };

    if (attachment?.length > 0) {
      postData.attachment = attachment?.[0]?.originFileObj;
    }

    let deleteAttachmentIds = getMissingUids(fields, values, 'attachment');

    if (deleteAttachmentIds?.length > 0) {
      postData.deleteAttachmentIds = deleteAttachmentIds;
    }

    appendToFormData(postData, formData);

    const { data, error } = await updatePurchase({
      id,
      data: formData,
    });

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
      title={'Edit Purchase'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
      width={1400}
    >
      {!isFetching && (
        <PurchaseForm
          handleSubmit={handleUpdate}
          isLoading={isLoading}
          fields={fields}
          form={form}
          data={data}
        />
      )}
    </CustomDrawer>
  );
};
