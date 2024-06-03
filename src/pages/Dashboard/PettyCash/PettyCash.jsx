import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { PettyCashCreate } from "../../../components/PettyCash/PettyCashCreate";
import { PettyCashTable } from "../../../components/PettyCash/PettyCashTable";
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
    title: "User",
    dataIndex: "user",
    key: "user",
    render: (user) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {user}
      </span>
    ),
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
      </span>
    ),
  },
  {
    title: "Cash in Hand",
    dataIndex: "cash_in_hand",
    key: "cash_in_hand",
    render: (cash_in_hand) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {cash_in_hand}
      </span>
    ),
  },
  {
    title: "Closes At",
    dataIndex: "closes_at",
    key: "closes_at",
    align: "center",
    render: (closes_at) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {closes_at}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "80px",
    align: "center",
    render: (status, record) => {
      return (
        <button
          className={`p-0 ${
            status == 1 ? "bg-[#22C55E]" : "bg-[#EF4444]"
          } rounded shadow-md w-[80px]`}
          onClick={() => record.handleStatusModal(record.id)}
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
    render: (_, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            onClick={() => record?.handleEdit(record?.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button>
        </div>
      );
    },
  },
];

export const PettyCash = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Petty Cash"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <PettyCashCreate />

      <PettyCashTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
