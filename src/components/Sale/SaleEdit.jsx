import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetSaleDetailsQuery,
  useUpdateSaleMutation,
} from '../../redux/services/sale/saleApi';
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
import { SaleForm } from './SaleForm';

export const SaleEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);
  const { pettyCashId } = useSelector((state) => state.pettyCash);

  const { data, isFetching } = useGetSaleDetailsQuery(
    {
      id,
      params: {
        child: 1,
        parent: 1,
      },
    },
    { skip: !id }
  );

  const [updateSale, { isLoading }] = useUpdateSaleMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      const newFieldData = [...fieldData];

      setFields(newFieldData);
    } else {
      setFields([]);
    }
  }, [data, isEditDrawerOpen, setFields]);

  const handleUpdate = async (values, { formValues }) => {
    const formData = new FormData();

    const { product_list } = formValues;

    const {
      attachment,
      discount,
      shipping_cost,
      tax_rate,
      sale_at,
      recieved_amount,
      paid_amount,
      discount_type,
      payment_status,
    } = values ?? {};

    if (parseFloat(recieved_amount) < parseFloat(paid_amount)) {
      return openNotification(
        'error',
        'Recieved amount cannot be less than paid amount'
      );
    }

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_variant_id: parseInt(product_id),
            qty: product_list.qty[product_id],
            sale_unit_id: product_list.sale_unit_id[product_id],
            net_unit_price: decimalConverter(
              product_list.net_unit_price[product_id]
            ),
            discount: decimalConverter(product_list.discount[product_id]),
            tax_rate: decimalConverter(product_list.tax_rate[product_id]),
            tax: decimalConverter(product_list.tax[product_id]),
            total: decimalConverter(product_list.total[product_id]),
          }))
      : [];

    if (productListArray.length === 0) {
      return openNotification('info', 'Please add atleast one product');
    }

    const totalPrice = calculateTotalPrice(product_list);
    const orderTax = calculateTotalTax(totalPrice, values.tax_rate, discount);

    const totalQty =
      Object.values(formValues.product_list?.qty).reduce(
        (acc, cur) => acc + parseInt(cur, 10),
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

    const grandTotal = calculateGrandTotal(
      totalPrice,
      values.tax_rate,
      discount ?? 0,
      shipping_cost ?? 0,
      discount_type
    );

    const postObj = {
      ...values,
      gift_card_id: values?.gift_card_id?.split('-')[0],
      sale_at: dayjs(sale_at).format('YYYY-MM-DD'),
      discount:
        discount_type === 'Percentage'
          ? decimalConverter(
              (parseFloat(discount) * parseFloat(totalPrice)) / 100
            )
          : decimalConverter(discount),
      shipping_cost: decimalConverter(shipping_cost),
      tax_rate: decimalConverter(tax_rate),
      item: productListArray.length,
      total_qty: totalQty,
      total_discount: decimalConverter(totalDiscount),
      total_tax: decimalConverter(totalTax),
      total_price: decimalConverter(totalPrice),
      tax: decimalConverter(orderTax),
      change: decimalConverter(
        Number(values?.recieved_amount) - Number(values?.paid_amount)
      ),
      grand_total: grandTotal,
      product_list: JSON.stringify(productListArray),
      petty_cash_id: pettyCashId,
      _method: 'PUT',
    };

    if (payment_status === 'Partial') {
      // postObj.paid_amount = decimalConverter(paid_amount);
      postObj.due = decimalConverter(grandTotal - paid_amount);
    }

    if (paid_amount) {
      postObj.paid_amount = decimalConverter(paid_amount);
    }

    if (attachment?.length > 0) {
      postObj.attachment = attachment?.[0].originFileObj;
    }

    let deleteAttachmentIds = getMissingUids(fields, values, 'attachment');

    if (deleteAttachmentIds?.length > 0) {
      postObj.deleteAttachmentIds = deleteAttachmentIds;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await updateSale({
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
      title={'Edit Sell'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
      width={1400}
    >
      <SaleForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
        data={data}
      />
    </CustomDrawer>
  );
};
