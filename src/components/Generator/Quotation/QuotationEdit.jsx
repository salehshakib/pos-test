import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../../redux/services/drawer/drawerSlice";
import {
  useGetQuotationDetailsQuery,
  useUpdateQuotationMutation,
} from "../../../redux/services/quotation/quotationApi";
import { appendToFormData } from "../../../utilities/lib/appendFormData";
import { errorFieldsUpdate } from "../../../utilities/lib/errorFieldsUpdate";
import { fieldsToUpdate } from "../../../utilities/lib/fieldsToUpdate";
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from "../../../utilities/lib/generator/generatorUtils";
import CustomDrawer from "../../Shared/Drawer/CustomDrawer";
import { QuotationForm } from "./QuotationForm";

const transformQuotationProducts = (quotationProducts) => {
  const productList = {
    qty: {},
    sale_unit_id: {},
    net_unit_price: {},
    discount: {},
    tax_rate: {},
    tax: {},
    total: {},
  };

  quotationProducts?.forEach(({ product_id, ...product }) => {
    productList.qty[product_id] = product.qty;
    productList.sale_unit_id[product_id] = product.sale_unit_id;
    productList.net_unit_price[product_id] = product.net_unit_price;
    productList.discount[product_id] = parseInt(product.discount);
    productList.tax_rate[product_id] = parseInt(product.tax_rate);
    productList.tax[product_id] = parseInt(product.tax);
    productList.total[product_id] = parseInt(product.total);
  });

  return productList;
};

const QuotationEdit = ({ id }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetQuotationDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );
  const [updateQuotation, { isLoading }] = useUpdateQuotationMutation();

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

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        product_list: transformQuotationProducts(data?.quotation_products),
      }));

      setFields(fieldData);
    }
  }, [data, setFields]);

  console.log(formValues);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    const { product_list } = formValues ?? {};

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
      product_list: JSON.stringify(productListArray),
    };

    if (attachment) {
      postObj.attachment = attachment?.[0].originFileObj;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await updateQuotation({
      id,
      data: formData,
    });

    if (data?.success) {
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };

  const [products, setProducts] = useState([]);

  return (
    <CustomDrawer
      title={"Edit Quotation"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <QuotationForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
      />
    </CustomDrawer>
  );
};

export default QuotationEdit;
