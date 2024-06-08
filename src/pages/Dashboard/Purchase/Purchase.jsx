import { useState } from "react";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { PurchaseCreate } from "../../../components/Purchase/PurchaseCreate";
import { PurchaseTable } from "../../../components/Purchase/PurchaseTable";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {date}
      </span>
    ),
  },
  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
    render: (reference) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {reference}
      </span>
    ),
  },
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
    render: (supplier) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {supplier}
      </span>
    ),
  },

  {
    title: "Purchase Status",
    dataIndex: "purchaseStatus",
    key: "purchaseStatus",
    render: (purchaseStatus) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {purchaseStatus}
      </span>
    ),
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    render: (paymentStatus) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {paymentStatus}
      </span>
    ),
  },
  {
    title: "Grand Total",
    dataIndex: "grandTotal",
    key: "grandTotal",
    render: (grandTotal) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {grandTotal}
      </span>
    ),
  },
  {
    title: "Paid",
    dataIndex: "paid",
    key: "paid",
    render: (paid) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {paid}
      </span>
    ),
  },
  {
    title: "Due",
    dataIndex: "due",
    key: "due",
    render: (due) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {due}
      </span>
    ),
  },
  {
    title: "Returned Amount",
    dataIndex: "returnedAmount",
    key: "returnedAmount",
    render: (returnedAmount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {returnedAmount}
      </span>
    ),
  },
];

const Purchase = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Purchase"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <PurchaseCreate />

      <PurchaseTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Purchase;
