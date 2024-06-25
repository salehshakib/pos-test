import { useState } from "react";
import defaultUser from "../../../assets/data/defaultUserImage";
import ProductCreate from "../../../components/Product/ProductCreate";
import ProductTable from "../../../components/Product/ProductTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { PRODUCT } from "../../../utilities/apiEndpoints/inventory.api";

const columns = [
  {
    title: "Img",
    dataIndex: "image",
    key: "image",
    fixed: "left",
    align: "center",
    width: 70,
    render: (img) => (
      <div className="w-8 h-8 rounded-md overflow-hidden mx-auto">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
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
    render: (sku) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {sku}
      </span>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "center",
    render: (type) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {type}
      </span>
    ),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    align: "center",
    render: (brand) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {brand}
      </span>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    align: "center",
    render: (category) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {category}
      </span>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    render: (quantity) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {quantity}
      </span>
    ),
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    align: "center",
    render: (unit) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {unit}
      </span>
    ),
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    align: "center",
    render: (cost) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {cost}
      </span>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    align: "center",
    render: (price) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {price}
      </span>
    ),
  },
];

const ProductList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Product"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={PRODUCT}
    >
      <ProductCreate />

      <ProductTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};

export default ProductList;
