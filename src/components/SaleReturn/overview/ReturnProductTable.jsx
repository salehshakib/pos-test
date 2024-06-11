import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { setFormValuesId } from "../../../utilities/lib/updateFormValues/updateFormValues";
import CustomCheckbox from "../../Shared/Checkbox/CustomCheckbox";
import { CustomQuantityInput } from "../../Shared/Input/CustomQuantityInput";
import { ProductTable } from "../../Shared/ProductControllerComponent/ProductTable";

const columns = [
  {
    title: "",
    dataIndex: "delete",
    key: "delete",
    align: "center",
    width: 50,
    fixed: "left",
    render: (props, record) => {
      return (
        props && (
          <div className="flex justify-center items-center gap-3 pl-9">
            <CustomCheckbox value={record?.id} />
          </div>
        )
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
    align: "center",
    render: (sku) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {sku}
      </span>
    ),
  },
  {
    title: "Unit Cost",
    dataIndex: "unitCost",
    key: "unitCost",
    align: "center",
    render: (unitCost) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {unitCost ? "$" + unitCost : ""}
      </span>
    ),
  },

  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    width: 140,
    render: (quantity, record) => {
      return quantity > -1 ? (
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {quantity}
        </span>
      ) : (
        <div className="flex gap-1 justify-center items-center">
          <div>
            <Button
              key={"sub"}
              icon={<FaMinus />}
              type="primary"
              onClick={() => record.decrementCounter(record?.id)}
            />
          </div>
          <CustomQuantityInput
            name={["product_list", "qty", record?.id]}
            noStyle={true}
            onChange={(value) => record.onQuantityChange(record.id, value)}
          />
          <div>
            <Button
              key={"add"}
              icon={<FaPlus />}
              type="primary"
              onClick={() => record.incrementCounter(record?.id)}
              className=""
            />
          </div>
        </div>
      );
    },
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    align: "center",
    render: (discount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        ${discount}
      </span>
    ),
  },
  {
    title: "Tax",
    dataIndex: "tax",
    key: "tax",
    align: "center",
    render: (tax) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        ${tax}
      </span>
    ),
  },
  {
    title: "SubTotal",
    dataIndex: "subTotal",
    key: "subTotal",
    align: "center",
    render: (subTotal) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        ${subTotal}
      </span>
    ),
  },
];

export const ReturnProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productUnits,
  // form,
  // setProductUnits,
}) => {
  const form = Form.useFormInstance();

  console.log(form.getFieldValue("product_list"));
  console.log(formValues);

  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;
      const newQty = parseInt(currentQty) + 1;

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
      const newQty = parseInt(currentQty) - 1;

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

  const dataSource = products?.map((product) => {
    const {
      id,
      name,
      sku,
      buying_price: unit_cost,
      sale_unit_id,
      sale_units,
      taxes,
    } = product ?? {};

    setFormValuesId(
      id,
      sale_unit_id,
      unit_cost,
      sale_units,
      formValues,
      productUnits,
      taxes
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
    };
  });

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    const total = Object.values(formValues.product_list.qty).reduce(
      (acc, cur) => acc + parseInt(cur),
      0
    );
    setTotalQuantity(total);

    const totalPrice = Object.values(formValues.product_list.total).reduce(
      (acc, cur) => acc + parseFloat(cur),
      0
    );
    setTotalPrice(totalPrice?.toFixed(2));

    const totalTax = Object.values(formValues.product_list.tax).reduce(
      (acc, cur) => acc + parseFloat(cur),
      0
    );
    setTotalTax(totalTax.toFixed(2));

    const totalDiscount = Object.values(
      formValues.product_list.discount
    ).reduce((acc, cur) => acc + parseFloat(cur), 0);

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

  return (
    <ProductTable
      columns={columns}
      dataSource={dataSource}
      styleProps={{
        scroll: {
          x: 800,
          y: 400,
        },
      }}
    />
  );
};
