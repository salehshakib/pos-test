import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CustomQuantityInput } from "../../Shared/Input/CustomQuantityInput";
import { ProductController } from "../../Shared/ProductControllerComponent/ProductController";
import CustomSelect from "../../Shared/Select/CustomSelect";
import {
  decrementCounter,
  incrementCounter,
  onActionChange,
  onDelete,
  onQuantityChange,
} from "../../../utilities/lib/productTable/counters";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
        {unitCost}
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
              onClick={() =>
                record.decrementCounter(record?.id, record.setFormValues)
              }
            />
          </div>
          <CustomQuantityInput
            // name={["product_list", "qty", record?.id]}
            noStyle={true}
            onChange={(value) =>
              record.onQuantityChange(record.id, value, record.setFormValues)
            }
            value={record?.formValues.product_list.qty?.[record?.id] ?? 0}
          />
          <div>
            <Button
              key={"add"}
              icon={<FaPlus />}
              type="primary"
              onClick={() =>
                record.incrementCounter(record?.id, record.setFormValues)
              }
              className=""
            />
          </div>
        </div>
      );
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 180,
    render: (action, record) => {
      return (
        action && (
          <div className="flex w-full  justify-center items-center gap-3">
            <CustomSelect
              name={["product_list", "action", record?.id]}
              placeholder="Type"
              options={[
                {
                  value: "Addition",
                  label: "Addition (+)",
                },
                {
                  value: "Subtraction",
                  label: "Subtraction (-)",
                },
              ]}
              onChange={(value) =>
                record.onActionChange(record.id, value, record.setFormValues)
              }
              styleProps={{ width: "9rem" }}
              noStyle={true}
            />
          </div>
        )
      );
    },
  },
  {
    title: <MdDelete className="text-lg md:text-xl text-center w-full" />,
    dataIndex: "delete",
    key: "delete",
    align: "center",
    width: 50,
    fixed: "right",
    render: (props, record) => {
      return (
        props && (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() =>
                record.onDelete(
                  record.id,
                  record.setProducts,
                  record.setFormValues
                )
              }
              className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
              type="button"
            >
              <MdDelete className="text-lg md:text-xl" />
            </button>
          </div>
        )
      );
    },
  },
];

export const AdjustmentProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();

  // const decrementCounter = (id) => {
  //   setFormValues((prevFormValues) => {
  //     const currentQty = prevFormValues.product_list.qty[id] || 1;
  //     const newQty = Math.max(Number(currentQty) - 1, 0);

  //     return {
  //       ...prevFormValues,
  //       product_list: {
  //         ...prevFormValues.product_list,
  //         qty: {
  //           ...prevFormValues.product_list.qty,
  //           [id]: newQty,
  //         },
  //       },
  //     };
  //   });
  // };

  // const onQuantityChange = (id, value) => {
  //   setFormValues((prevFormValues) => ({
  //     ...prevFormValues,
  //     product_list: {
  //       ...prevFormValues.product_list,
  //       qty: {
  //         ...prevFormValues.product_list.qty,
  //         [id]: parseInt(value, 10) || 0,
  //       },
  //     },
  //   }));
  // };

  // const onActionChange = (id, value, setFormValues) => {
  //   setFormValues((prevFormValues) => ({
  //     ...prevFormValues,
  //     product_list: {
  //       ...prevFormValues.product_list,
  //       action: {
  //         ...prevFormValues.product_list.action,
  //         [id]: value,
  //       },
  //     },
  //   }));
  // };

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

  const dataSource =
    products?.map((product) => {
      const { id, name, sku, buying_price: unit_cost } = product ?? {};

      formValues.product_list.qty[id] = formValues.product_list.qty[id] ?? 1;

      formValues.product_list.action[id] =
        formValues.product_list.action[id] ?? "Addition";

      return {
        id,
        name,
        sku,
        unitCost: `$${unit_cost ?? 0}`,
        action: true,
        delete: true,
        incrementCounter,
        decrementCounter,
        onQuantityChange,
        onActionChange,
        onDelete,
        products,
        setProducts,
        formValues,
        setFormValues,
      };
    }) ?? [];

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const total = Object.values(formValues.product_list.qty).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setTotalQuantity(total);
  }, [formValues, products]);

  products.length > 0 &&
    dataSource.push({
      id: "",
      name: "Total",
      unitCost: "",
      quantity: totalQuantity,
      action: false,
    });

  form.setFieldsValue(formValues);

  return (
    <ProductController
      products={products}
      setProducts={setProducts}
      columns={columns}
      dataSource={dataSource}
    />
  );
};
