import { Form } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { useCreateSaleMutation } from "../../redux/services/sale/saleApi";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from "../../utilities/lib/generator/generatorUtils";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { SaleForm } from "./SaleForm";

const decimalConverter = (value) => {
  return Number(value).toFixed(2);
};

export const SaleCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createSale, { isLoading }] = useCreateSaleMutation();

  const [formValues, setFormValues] = useState({
    product_list: {
      product_id: {},
      qty: {},
      sale_unit_id: {},
      net_unit_price: {},
      discount: {},
      tax_rate: {},
      tax: {},
      total: {},

      tax_id: {},
    },
  });

  const [products, setProducts] = useState([]);
  const [productUnits, setProductUnits] = useState({
    sale_units: {},
    tax_rate: {},
  });

  // useEffect(() => {
  //   if (!isCreateDrawerOpen) {
  //     form.resetFields();
  //   }

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const { product_list } = formValues;

    console.log(product_list);
    const {
      attachment,
      discount,
      shipping_cost,
      tax_rate,
      sale_at,
      paid_amount,
    } = values ?? {};

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_id: parseInt(product_id),
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

    const totalPrice = calculateTotalPrice(product_list);
    const orderTax = calculateTotalTax(totalPrice, values.tax_rate);

    const totalQty =
      Object.values(formValues.product_list?.qty).reduce(
        (acc, cur) => acc + cur,
        0
      ) ?? 0;

    const totalDiscount =
      Object.values(formValues.product_list?.discount).reduce(
        (acc, cur) => acc + cur,
        0
      ) ?? 0;

    const totalTax =
      Object.values(formValues.product_list?.tax).reduce(
        (acc, cur) => acc + cur,
        0
      ) ?? 0;

    const postObj = {
      ...values,
      sale_at: dayjs(sale_at).format("YYYY-MM-DD"),
      discount: Number(discount ?? 0).toFixed(2),
      shipping_cost: Number(shipping_cost ?? 0).toFixed(2),
      tax_rate: Number(tax_rate ?? 0).toFixed(2),
      item: productListArray.length,
      total_qty: totalQty,
      total_discount: Number(totalDiscount).toFixed(2),
      total_tax: Number(totalTax).toFixed(2),
      total_price: Number(totalPrice).toFixed(2),
      tax: Number(orderTax).toFixed(2),
      change: values?.recieved_amount - values?.paid_amount,
      grand_total: calculateGrandTotal(
        totalPrice,
        orderTax,
        discount,
        shipping_cost
      ),

      product_list: JSON.stringify(productListArray),
      petty_cash_id: 8,
    };

    if (paid_amount) {
      postObj.paid_amount = Number(paid_amount).toFixed(2);
    }

    if (attachment?.[0].originFileObj) {
      postObj.attachment = attachment?.[0].originFileObj;
    }

    appendToFormData(postObj, formData);

    console.log(postObj);

    const { data, error } = await createSale({
      data: formData,
    });
    if (data?.success) {
      dispatch(closeCreateDrawer());
      form.resetFields();

      setFormValues({
        product_list: {
          product_id: {},
          qty: {},
          sale_unit_id: {},
          net_unit_price: {},
          discount: {},
          tax_rate: {},
          tax: {},
          total: {},

          tax_id: {},
        },
      });

      setProducts([]);

      setProductUnits({
        sale_units: {},
        tax_rate: {},
      });
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
    <CustomDrawer title={"Create Sale"} open={isCreateDrawerOpen}>
      <SaleForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
        productUnits={productUnits}
        setProductUnits={setProductUnits}
      />
    </CustomDrawer>
  );
};
