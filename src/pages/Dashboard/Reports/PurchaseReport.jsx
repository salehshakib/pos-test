import { useState } from "react";
import { PurchaseReportTable } from "../../../components/Report/PurchaseReportTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    title: "Product Name",
    dataIndex: "product",
    key: "product",
    render: (product) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {product}
      </span>
    ),
  },
  {
    title: "Purchased Amount",
    dataIndex: "soldAmount",
    key: "soldAmount",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: "Purchased Qty",
    dataIndex: "soldQty",
    key: "soldQty",
    render: (qty) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {qty}
      </span>
    ),
  },
  {
    title: "In Stock",
    dataIndex: "inStock",
    key: "inStock",
    render: (stock) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {stock}
      </span>
    ),
  },
];

export const PurchaseReport = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <GlobalContainer
      pageTitle="Purchase Report"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <PurchaseReportTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
