import { Form } from "antd";
import { useEffect, useState } from "react";
import { ProductController } from "../../Shared/ProductControllerComponent/ProductController";
import { columns } from "./productColumns";
import { ProductTable } from "../../Shared/ProductControllerComponent/ProductTable";

function setFormValuesId(
  id,
  sale_unit_id,
  unit_cost,
  sale_units,
  formValues,
  productUnits
) {
  formValues.product_list.qty[id] = formValues.product_list.qty[id] || 1;

  formValues.product_list.sale_unit_id[id] =
    formValues.product_list.sale_unit_id[id] ?? sale_unit_id;

  formValues.product_list.net_unit_price[id] = unit_cost;

  formValues.product_list.discount[id] =
    formValues.product_list.discount[id] ?? 0;

  formValues.product_list.tax[id] = parseFloat(
    (
      (parseInt(productUnits.sale_units[id]) *
        parseInt(formValues.product_list.tax_rate[id]) *
        parseInt(formValues.product_list.net_unit_price[id]) *
        parseInt(formValues.product_list.qty[id])) /
      100
    ).toFixed(2)
  );

  formValues.product_list.tax_rate[id] =
    formValues.product_list.tax_rate[id] ?? 0;

  productUnits.sale_units[id] =
    productUnits?.sale_units[id] ?? sale_units?.operation_value ?? 1;

  formValues.product_list.total[id] =
    productUnits.sale_units[id] *
      parseInt(unit_cost) *
      formValues.product_list.qty[id] -
    formValues.product_list.discount[id] +
    formValues.product_list.tax[id];
}

export const ReturnProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();

  const [productUnits, setProductUnits] = useState({
    sale_units: {},
  });

  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;
      const newQty = currentQty + 1;

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const decrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;
      const newQty = currentQty - 1;

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const onQuantityChange = (id, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      product_list: {
        ...prevFormValues.product_list,
        qty: {
          ...prevFormValues.product_list.qty,
          [id]: parseInt(value, 10) || 0,
        },
      },
    }));
  };

  const onDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  console.log(formValues);

  const dataSource = products?.map((product) => {
    const {
      id,
      name,
      sku,
      buying_price: unit_cost,
      sale_unit_id,
      sale_units,
    } = product ?? {};

    console.log(product);

    setFormValuesId(
      id,
      sale_unit_id,
      unit_cost,
      sale_units,
      formValues,
      productUnits
    );

    return {
      id,
      name,
      sku,
      unitCost: formValues.product_list.net_unit_price[id],
      delete: true,
      discount: formValues.product_list.discount[id],
      tax: formValues.product_list.tax[id],
      subTotal: formValues.product_list.total[id],
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      onDelete,
      // handleProductEdit,
    };
  });

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    const total = Object.values(formValues.product_list.qty).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setTotalQuantity(total);

    const totalPrice = Object.values(formValues.product_list.total).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setTotalPrice(totalPrice?.toFixed(2));

    const totalTax = Object.values(formValues.product_list.tax).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setTotalTax(totalTax.toFixed(2));

    const totalDiscount = Object.values(
      formValues.product_list.discount
    ).reduce((acc, cur) => acc + cur, 0);

    setTotalDiscount(totalDiscount.toFixed(2));
  }, [formValues, products]);

  products?.length > 0 &&
    dataSource.push({
      //   key: "total",
      id: "",
      name: "Total",
      quantity: totalQuantity,
      subTotal: totalPrice,
      tax: totalTax,
      discount: totalDiscount,
      action: false,
    });

  form.setFieldsValue(formValues);

  return <ProductTable columns={columns} dataSource={dataSource} />;
};
