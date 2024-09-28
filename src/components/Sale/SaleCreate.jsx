import { Form } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCreateSaleMutation } from '../../redux/services/sale/saleApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from '../../utilities/lib/generator/generatorUtils';
import { openNotification } from '../../utilities/lib/openToaster';
import { decimalConverter } from '../../utilities/lib/return/decimalComverter';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { SaleForm } from './SaleForm';

export const SaleCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createSale, { isLoading }] = useCreateSaleMutation();

  const { pettyCashId } = useSelector((state) => state.pettyCash);

  const handleSubmit = async (values, { formValues }) => {
    const formData = new FormData();

    const { product_list } = formValues;

    const {
      attachment,
      discount,
      shipping_cost,
      tax_rate,
      sale_at,
      paid_amount,
      discount_type,
    } = values ?? {};

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

    const grandTotal = calculateGrandTotal(
      totalPrice,
      values.tax_rate,
      discount ?? 0,
      shipping_cost ?? 0,
      discount_type
    );

    const postObj = {
      ...values,
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
        Number(values?.recieved_amount ?? 0) - Number(values?.paid_amount ?? 0)
      ),
      grand_total: decimalConverter(grandTotal),

      product_list: JSON.stringify(productListArray),
      petty_cash_id: pettyCashId,
    };

    if (paid_amount) {
      postObj.paid_amount = decimalConverter(paid_amount);
    }

    if (attachment?.[0].originFileObj) {
      postObj.attachment = attachment?.[0].originFileObj;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await createSale({
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
    <CustomDrawer title={'Create Sell'} open={isCreateDrawerOpen} width={1400}>
      <SaleForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};
