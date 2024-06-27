import { App, Button } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";
import CustomCheckbox from "../../Shared/Checkbox/CustomCheckbox";
import { CustomQuantityInput } from "../../Shared/Input/CustomQuantityInput";
import { ProductTable } from "../../Shared/ProductControllerComponent/ProductTable";
import { onDelete } from "../../../utilities/lib/productTable/counters";

const columns = [
  {
    title: "Choose",
    dataIndex: "delete",
    key: "delete",
    align: "center",
    width: 80,
    fixed: "left",
    render: (props, record) => {
      return (
        props && (
          <div className="flex justify-center items-center gap-3 pl-9">
            <CustomCheckbox value={record?.id} name={["delete", record?.id]} />
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
    width: 100,
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
    width: 100,
    render: (unitCost) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {unitCost ?? 0}
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
            // name={["product_list", "qty", record?.id]}
            value={record.formValues.product_list.qty[record?.id] || 0}
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
    width: 100,
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
    width: 100,
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
    width: 100,
    render: (subTotal) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        ${subTotal}
      </span>
    ),
  },
];

function setFormValuesId(
  id,
  purchase_unit_id,
  unit_cost,
  purchase_units,
  formValues,
  productUnits,
  tax_id,
  // eslint-disable-next-line no-unused-vars
  taxes
) {
  const sanitizeIntValue = (value) => {
    const number = parseInt(value);
    return isNaN(number) ? 0 : number;
  };

  const sanitizeFloatValue = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? 0 : number;
  };

  if (id) {
    formValues.product_list.qty[id] = sanitizeIntValue(
      formValues.product_list.qty?.[id] || 1
    );

    formValues.product_list.net_unit_cost[id] =
      sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id]) ||
      sanitizeFloatValue(unit_cost) ||
      "0";

    formValues.product_list.discount[id] = sanitizeFloatValue(
      formValues.product_list.discount?.[id] ?? 0
    );

    formValues.product_list.tax_rate[id] = sanitizeIntValue(
      formValues.product_list.tax_rate?.[id] ?? taxes?.rate ?? 0
    );

    formValues.product_list.tax[id] = sanitizeFloatValue(
      (
        (sanitizeIntValue(productUnits.purchase_units?.[id] ?? 1) *
          sanitizeFloatValue(formValues.product_list.tax_rate?.[id]) *
          sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id]) *
          sanitizeIntValue(formValues.product_list.qty?.[id])) /
        100
      ).toFixed(2)
    );

    const purchaseUnitsOperationValue = purchase_units?.operation_value ?? 1;

    productUnits.purchase_units[id] =
      sanitizeIntValue(productUnits?.purchase_units?.[id]) ||
      purchaseUnitsOperationValue;

    formValues.product_list.total[id] =
      sanitizeIntValue(productUnits.purchase_units?.[id]) *
        sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id] ?? 0) *
        sanitizeIntValue(formValues.product_list.qty?.[id]) -
      sanitizeFloatValue(formValues.product_list.discount?.[id]) +
      sanitizeFloatValue(formValues.product_list.tax?.[id]);

    formValues.product_list.purchase_unit_id[id] =
      formValues.product_list.purchase_unit_id?.[id] ?? purchase_unit_id;

    if (formValues?.product_list?.tax_id) {
      formValues.product_list.tax_id[id] =
        formValues.product_list.tax_id?.[id] ?? tax_id;
    }
  }
}

export const ReturnProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productUnits,
  form,
}) => {
  const { message } = App.useApp();

  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;

      if (currentQty === parseInt(formValues?.product_list?.max_return?.[id])) {
        message.error("Maximum quantity reached");
      }

      const newQty = Math.min(
        Number(currentQty) + 1,
        parseInt(formValues?.product_list?.max_return?.[id])
      );

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

      const newQty = Math.min(
        Number(currentQty) - 1,
        parseInt(formValues?.product_list?.max_return?.[id])
      );

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
    const qty = Math.min(
      parseInt(value),
      parseInt(formValues?.product_list?.max_return?.[id])
    );

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      product_list: {
        ...prevFormValues.product_list,
        qty: {
          ...prevFormValues.product_list.qty,
          [id]: qty || 0,
        },
      },
    }));
  };

  // const onDelete = (id) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.filter((product) => product.id !== id)
  //   );

  //   setFormValues((prevFormValues) => {
  //     const { product_list } = prevFormValues;

  //     const updatedProductList = Object.keys(product_list).reduce(
  //       (acc, key) => {
  //         // eslint-disable-next-line no-unused-vars
  //         const { [id]: _, ...rest } = product_list[key];
  //         acc[key] = rest;
  //         return acc;
  //       },
  //       {}
  //     );

  //     return {
  //       ...prevFormValues,
  //       product_list: updatedProductList,
  //     };
  //   });
  // };

  const dataSource = products?.map((product) => {
    const {
      id,
      name,
      sku,
      buying_price: unit_cost,
      purchase_unit_id,
      purchase_units,
      taxes,
    } = product ?? {};

    setFormValuesId(
      id,
      purchase_unit_id,
      unit_cost ?? 0,
      purchase_units,
      formValues,
      productUnits,
      taxes
    );

    return {
      id,
      name,
      sku,
      unitCost: "$" + formValues.product_list.net_unit_cost[id],
      delete: true,
      discount: formValues.product_list.discount[id],
      tax: formValues.product_list.tax[id],
      subTotal: formValues.product_list.total[id],
      qty: formValues.product_list.qty[id],
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      onDelete,
      products,
      setProducts,
      formValues,
      setFormValues,
    };
  });

  form.setFieldsValue(formValues);

  return <ProductTable columns={columns} dataSource={dataSource} />;
};
