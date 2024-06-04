import { Dropdown } from "antd";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
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
        {cashier ?? "N/A"}
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
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     width: "80px",
  //     align: "center",
  //     render: ({ status, handleStatusModal }, record) => {
  //       return (
  //         <button
  //           className={`p-0 ${
  //             status == 1 ? "bg-[#22C55E]" : "bg-[#EF4444]"
  //           } rounded shadow-md w-[80px]`}
  //           onClick={() => handleStatusModal(record.id)}
  //         >
  //           <span className="font-medium text-xs px-2 w-full">
  //             {status == 1 ? "Active" : "Inactive"}
  //           </span>
  //         </button>
  //       );
  //     },
  //   },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "center",
    width: 120,
    fixed: "right",
    render: (props, record) => {
      const { handleEdit, handleDeleteModal } = props ?? {};
      return (
        <div className="flex justify-center items-center gap-3 ">
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <div
                      // onClick={() => handleEdit(record?.id)}
                      className="flex justify-start items-center gap-3"
                    >
                      <FaEye className="text-lg md:text-xl" />
                      Details
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <div
                      onClick={() => handleEdit(record?.id)}
                      className="flex justify-start items-center gap-3"
                    >
                      <MdEditSquare className="text-lg md:text-xl" />
                      Edit
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <div className="flex justify-start items-center gap-3">
                      <PiBroom className="text-lg md:text-xl" />
                      Due Clear
                    </div>
                  ),
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
