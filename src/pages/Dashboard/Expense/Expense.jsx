import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { ExpenseCreate } from "../../../components/Expense/ExpenseCreate";
import ExpenseTable from "../../../components/Expense/ExpenseTable";

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
    title: "Reference Id",
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
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    align: "center",
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
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
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    align: "center",
    render: (note) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {note}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    align: "center",
    render: (created_at) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {created_at}
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
            status == 1 ? "bg-[#22C55E]" : "bg-[#EF4444]"
          } rounded shadow-md w-[80px]`}
          onClick={() => handleStatusModal(record.id)}
        >
          <span className="font-medium text-white text-xs px-2 w-full">
            {status == 1 ? "Active" : "Inactive"}
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
    render: ({ handleEdit, handleDeleteModal }, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            onClick={() => handleEdit(record?.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button>
          <button
            onClick={() => handleDeleteModal(record?.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdDelete className="text-lg md:text-xl" />
          </button>
        </div>
      );
    },
  },
];

const Expense = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <GlobalContainer
      pageTitle="Expense List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <ExpenseCreate />

      <ExpenseTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};

export default Expense;
