import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
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
    title: "Reference Id",
    dataIndex: "reference_id",
    key: "reference_id",
    render: (reference_id) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {reference_id}
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
    title: "Open At",
    dataIndex: "open_at",
    key: "open_at",
    align: "center",
    render: (open_at) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {open_at}
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
    render: (status) => {
      return (
        <button
          className={`p-0 ${
            status == "Open"
              ? "bg-[#DCFCE7] text-[#16A34A]"
              : "bg-[#FEF2F2] text-[#EF4444]"
          } rounded shadow-md w-[80px]`}
          // onClick={() => record.handleStatusModal(record.id)}
        >
          <span className="font-medium text-xs px-2 w-full">{status}</span>
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
            onClick={() => record?.handleDetailsModal(record?.id)}
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
      <PettyCashTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
