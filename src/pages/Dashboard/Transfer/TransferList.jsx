import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import TransferCreate from "../../../components/Transfer/TransferCreate";
import TransferTable from "../../../components/Transfer/TransferTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    align: "center",
    width: 80,
    render: (id) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {id}
      </span>
    ),
  },
  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
    align: "center",
    render: (reference) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {reference}
      </span>
    ),
  },
  {
    title: "Warehouse (From)",
    dataIndex: "warehouse_from",
    key: "warehouse_from",
    align: "center",
    render: (warehouseFrom) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouseFrom}
      </span>
    ),
  },
  {
    title: "Warehouse (To)",
    dataIndex: "warehouse_to",
    key: "warehouse_to",
    align: "center",
    render: (warehouseTo) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouseTo}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    render: (date) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {date}
      </span>
    ),
  },
  {
    title: "Product Cost",
    dataIndex: "product_cost",
    key: "product_cost",
    align: "center",
    render: (productCost) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {productCost}
      </span>
    ),
  },
  {
    title: "Product Tax",
    dataIndex: "product_tax",
    key: "product_tax",
    align: "center",
    render: (productTax) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {productTax}
      </span>
    ),
  },
  {
    title: "Grand Total",
    dataIndex: "grand_total",
    key: "grand_total",
    align: "center",
    render: (grandTotal) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {grandTotal}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "80px",
    align: "center",
    render: ({ status, handleStatusModal }, record) => {
      return (
        <button
          className={`p-0 ${
            status === 1 ? "bg-[#22C55E]" : "bg-[#EF4444]"
          } rounded shadow-md w-[80px]`}
          onClick={() => handleStatusModal(record.id)}
        >
          <span className="font-medium text-white text-xs px-2 w-full">
            {status === 1 ? "Active" : "Inactive"}
          </span>
        </button>
      );
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 70,
    fixed: "right",
    render: ({ getDetails, handleDeleteModal }, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            onClick={() => getDetails(record.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button>
          <button
            onClick={() => handleDeleteModal(record.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdDelete className="text-lg md:text-xl" />
          </button>
        </div>
      );
    },
  },
];

const TransferList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle={"Transfer List"}
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <TransferCreate />
      <TransferTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default TransferList;
