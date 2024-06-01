import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomInput from "../../../Shared/Input/CustomInput";
import { ProductController } from "../../../Shared/ProductControllerComponent/ProductController";

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
    width: 150,
    render: (quantity, record) => {
      return quantity > 0 ? (
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
          <CustomInput
            type={"number"}
            name={["product_list", "qty", record?.id]}
            placeholder="quantity"
            noStyle={true}
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
        {discount}
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
        {tax}
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
        {subTotal}
      </span>
    ),
  },
  {
    title: <MdDelete className="text-lg md:text-xl text-center w-full" />,
    dataIndex: "delete",
    key: "delete",
    align: "center",
    width: 50,
    fixed: "right",
    render: (props, record) => {
      const { setRowId } = props ?? {};
      return (
        props && (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setRowId(record?.id)}
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

export const QuotationProductTable = () => {
  const [products, setProducts] = useState([]);
  const [rowId, setRowId] = useState(undefined);
  const form = Form.useFormInstance();

  console.log(rowId);

  const [counters, setCounters] = useState({});

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

  useEffect(() => {
    if (rowId !== undefined) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== rowId)
      );
    }
  }, [rowId]);

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
      delete: {
        setRowId,
      },
      incrementCounter,
      decrementCounter,
    };
  });

  const productListData = Form.useWatch("product_list", form);

  products.length > 0 &&
    dataSource.push({
      id: "total",
      name: "Total",
      quantity: productListData
        ? Object.values(productListData?.qty)?.reduce(
            (acc, cur) => acc + cur,
            0
          )
        : -1,
    });

  return (
    <ProductController
      products={products}
      setProducts={setProducts}
      columns={columns}
      dataSource={dataSource}
    />
  );
};
