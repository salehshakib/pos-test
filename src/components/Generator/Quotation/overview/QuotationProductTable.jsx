import { Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { FaEdit, FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CustomQuantityInput } from "../../../Shared/Input/CustomQuantityInput";
import { ProductController } from "../../../Shared/ProductControllerComponent/ProductController";
import CustomForm from "../../../Shared/Form/CustomForm";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (name, record) => (
      <div
        className={`flex items-center gap-2 ${
          name !== "Total" && "hover:underline hover:cursor-pointer"
        }`}
        onClick={() => {
          record?.handleProductEdit(record?.id, record?.name);
        }}
      >
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {name}
        </span>
        {name !== "Total" && <FaEdit className="primary-text" />}
      </div>
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

const ProductForm = ({
  productId,
  productName,
  productEditModal,
  hideModal,
}) => {
  const [productForm] = Form.useForm();

  const handleSubmit = () => {
    console.log("values");

    // productForm.resetFields();
    // hideModal();
  };

  return (
    <Modal
      title={productName}
      open={productEditModal}
      onCancel={hideModal}
      centered
      width={800}
      okText="Update"
      onOk={handleSubmit}
      // onClose={}
    >
      <CustomForm
        submitBtn={false}
        form={productForm}
        // handleSubmit={handleSubmit}
      ></CustomForm>
    </Modal>
  );
};
export const QuotationProductTable = () => {
  const [products, setProducts] = useState([]);
  const form = Form.useFormInstance();

  // [{"product_id":4,"qty":1,"sale_unit_id":1,"net_unit_price":250.00,"discount":0.00,"tax_rate":0.00,"tax":0.00,"total":250.00}]

  const [formValues, setFormValues] = useState({
    product_list: {
      qty: {},
      action: {},
      sale_unit_id: {},
      net_unit_price: {},
      discount: {},
      tax_rate: {},
      tax: {},
      total: {},
    },
  });

  const [counters, setCounters] = useState({});
  const [discounts, setDiscounts] = useState({});
  const [taxs, setTaxs] = useState({});

  const [productEditModal, setProductEditModal] = useState(false);
  const [productId, setProductId] = useState(undefined);
  const [productName, setProductName] = useState(null);

  const handleProductEdit = (id, name) => {
    setProductId(id);
    setProductName(name);
    setProductEditModal(true);
  };

  const hideModal = () => setProductEditModal(false);

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
      delete: true,
      discount: "$0.00",
      tax: "$0.00",
      subTotal: `$${parseInt(unit_cost) * (counters[id] ?? 1)}`,
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      onDelete,
      handleProductEdit,
    };
  });

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const total = Object.values(counters).reduce((acc, cur) => acc + cur, 1);
    setTotalQuantity(total === 0 ? 0 : total);
  }, [counters]);

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
    }
  }, [products]);

  return (
    <>
      <ProductController
        products={products}
        setProducts={setProducts}
        columns={columns}
        dataSource={dataSource}
      />

      <ProductForm
        productEditModal={productEditModal}
        productId={productId}
        productName={productName}
        hideModal={hideModal}
      />
    </>
  );
};
