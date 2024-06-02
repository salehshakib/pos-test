import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CustomQuantityInput } from "../../Shared/Input/CustomQuantityInput";
import { ProductController } from "../../Shared/ProductControllerComponent/ProductController";
import CustomSelect from "../../Shared/Select/CustomSelect";

const columns = [
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
              onChange={(value) => record.onActionChange(record.id, value)}
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
              onClick={() => record.onDelete(record.id)}
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

export const AdjustmentProductTable = () => {
  const [products, setProducts] = useState([]);
  const form = Form.useFormInstance();

  const [counters, setCounters] = useState({});
  const [actions, setActions] = useState({});

  const incrementCounter = (id, stock = 5) => {
    if (counters[id] >= stock) return;

    if (counters[id] === undefined) {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [id]: 2,
      }));
      return;
    }

    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
  };

  const decrementCounter = (id) => {
    if (counters[id] <= 0) return;

    if (!counters[id]) {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [id]: 0,
      }));
      return;
    }

    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) - 1,
    }));
  };

  const onQuantityChange = (id, value) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: parseInt(value, 10) || 0,
    }));
  };

  const onActionChange = (id, value) => {
    setActions((prevActions) => ({
      ...prevActions,
      [id]: value,
    }));
  };

  const onDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const dataSource = products?.map((product) => {
    const { id, name, sku, buying_price: unit_cost } = product;

    return {
      id,
      name,
      sku,
      unitCost: `$${unit_cost}`,
      quantity: form.setFieldValue(
        ["product_list", "qty", id],
        counters[id] ?? 1
      ),
      action: true,
      actionValue: form.setFieldValue(
        ["product_list", "action", id],
        actions[id] ?? "Addition"
      ),
      delete: true,
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      onActionChange,
      onDelete,
    };
  });

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const total = Object.values(counters).reduce((acc, cur) => acc + cur, 1);
    setTotalQuantity(total === 0 ? 0 : total);
  }, [counters]);

  // if (products.length > 0) {
  //   dataSource.push({
  //     id: "total",
  //     name: "Total",
  //     quantity: totalQuantity,
  //     action: false,
  //   });
  // }

  products.length > 0 &&
    dataSource.push({
      id: "total",
      name: "Total",
      quantity: totalQuantity,
      action: false,
    });

  useEffect(() => {
    if (products.length === 0) {
      setCounters({});
      setActions({});
    }
  }, [products]);

  return (
    <ProductController
      products={products}
      setProducts={setProducts}
      columns={columns}
      dataSource={dataSource}
    />
  );
};
