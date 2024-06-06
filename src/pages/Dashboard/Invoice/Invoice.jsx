import { Dropdown } from "antd";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import InvoiceCreate from "../../../components/Generator/Invoice/InvoiceCreate";
import InvoiceTable from "../../../components/Generator/Invoice/InvoiceTable";
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
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
      </span>
    ),
  },
  {
    title: "Cashier",
    dataIndex: "cashier",
    key: "cashier",
    render: (cashier) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {cashier}
      </span>
    ),
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (customer) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {customer}
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
    title: "Total",
    dataIndex: "total",
    key: "total",
    align: "center",
    render: (total) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {total}
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
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "center",
    width: 120,
    fixed: "right",
    render: (_, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            onClick={() => record?.handleDetailsModal(record?.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <TbListDetails className="text-lg md:text-xl" />
          </button>

          <Dropdown
            menu={{
              items: [
                {
                  key: "edit",
                  icon: <MdEditSquare size={20} />,
                  label: (
                    <div className="flex justify-start items-center gap-3">
                      Edit
                    </div>
                  ),
                  onClick: () => record?.handleEdit(record?.id),
                },
                {
                  key: "due",
                  icon: <PiBroom size={20} />,
                  label: (
                    <div className="flex justify-start items-center gap-3">
                      Due Clear
                    </div>
                  ),
                },
                {
                  key: "delete",
                  icon: <MdDelete size={20} />,
                  label: (
                    <div className="flex justify-start items-center gap-3">
                      Delete
                    </div>
                  ),
                  onClick: () => record?.handleDeleteModal(record?.id),
                },
              ],
            }}
            placement="bottom"
            trigger={["click"]}
          >
            <button className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300">
              <FiMoreHorizontal className="text-lg md:text-xl" />
            </button>
          </Dropdown>
        </div>
      );
    },
  },
];

const Invoice = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <GlobalContainer
      pageTitle="Invoice"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <InvoiceCreate />

      <InvoiceTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};

export default Invoice;
