import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useCurrentUser } from '../../redux/services/auth/authSlice';
import {
  closeCreateDrawer,
  openCreateDrawer,
} from '../../redux/services/drawer/drawerSlice';
import { useCreatePurchaseMutation } from '../../redux/services/purchase/purchaseApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from '../../utilities/lib/generator/generatorUtils';
import { openNotification } from '../../utilities/lib/openToaster';
import { decimalConverter } from '../../utilities/lib/return/decimalComverter';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { PurchaseForm } from './PurchaseForm';

export const PurchaseCreate = () => {
  const dispatch = useDispatch();

  const user = useSelector(useCurrentUser);

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createPurchase, { isLoading }] = useCreatePurchaseMutation();

  const { state } = useLocation();

  useEffect(() => {
    if (state?.selectedProduct) {
      dispatch(openCreateDrawer());
    }
  }, [state, dispatch]);

  const handleSubmit = async (values, { formValues }) => {
    const formData = new FormData();

    const { product_list } = formValues;

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_variant_id: parseInt(product_id),
            qty: product_list.qty[product_id],
            received: product_list.recieved[product_id],
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
      discount_type,
    } = values;

    const grandTotal = calculateGrandTotal(
      totalPrice,
      values.tax_rate,
      values?.discount ?? 0,
      values?.shipping_cost ?? 0
    );

    const postObj = {
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
      discount_type,
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
    };

    if (payment_status === 'Partial') {
      // postObj.paid_amount = decimalConverter(paid_amount);
      postObj.due = decimalConverter(grandTotal - paid_amount);
    }

    if (attachment?.[0].originFileObj) {
      postObj.attachment = attachment?.[0].originFileObj;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await createPurchase({
      data: formData,
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

  return (
    <CustomDrawer
      title={'Create Purchase'}
      open={isCreateDrawerOpen}
      width={1400}
    >
      <PurchaseForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};
