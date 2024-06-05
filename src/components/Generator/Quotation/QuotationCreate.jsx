import { Form } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../../redux/services/drawer/drawerSlice";
import { useCreateQuotationMutation } from "../../../redux/services/quotation/quotationApi";
import { appendToFormData } from "../../../utilities/lib/appendFormData";
import CustomDrawer from "../../Shared/Drawer/CustomDrawer";
import { QuotationForm } from "./QuotationForm";
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from "../../../utilities/lib/generator/generatorUtils";

const QuotationCreate = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState({
    product_list: {
      qty: {},
      sale_unit_id: {},
      net_unit_price: {},
      discount: {},
      tax_rate: {},
      tax: {},
      total: {},
    },
  });

  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createQuotation, { isLoading }] = useCreateQuotationMutation();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const { product_list } = formValues;

    const { attachment, discount, shipping_cost, tax_rate } = values ?? {};

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_id: parseInt(product_id),
            qty: product_list.qty[product_id],
            sale_unit_id: product_list.sale_unit_id[product_id],
            net_unit_price: product_list.net_unit_price[product_id],
            discount: product_list.discount[product_id],
            tax_rate: product_list.tax_rate[product_id],
            tax: product_list.tax[product_id],
            total: product_list.total[product_id],
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

    console.log(formValues.product_list);

    const totalTax =
      Object.values(formValues.product_list?.tax).reduce(
        (acc, cur) => acc + cur,
        0
      ) ?? 0;

    const postObj = {
      ...values,
      discount: Number(discount ?? 0).toFixed(2),
      shipping_cost: Number(shipping_cost ?? 0).toFixed(2),
      tax_rate: Number(tax_rate ?? 0).toFixed(2),
      item: productListArray.length,
      total_qty: totalQty,
      total_discount: Number(totalDiscount).toFixed(2),
      total_tax: Number(totalTax).toFixed(2),
      total_price: Number(totalPrice).toFixed(2),
      tax: Number(orderTax).toFixed(2),

      grand_total: calculateGrandTotal(
        totalPrice,
        orderTax,
        discount,
        shipping_cost
      ),
      attachment: attachment?.[0].originFileObj,
      product_list: JSON.stringify(productListArray),
    };

    console.log(postObj);

    appendToFormData(postObj, formData);

    const { data, error } = await createQuotation({ data: formData });

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

  const [products, setProducts] = useState([]);

  return (
    <CustomDrawer
      title={"Create Quotation"}
      open={isCreateDrawerOpen}
      form={form}
    >
      <QuotationForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
      />
    </CustomDrawer>
  );
};

export default QuotationCreate;
