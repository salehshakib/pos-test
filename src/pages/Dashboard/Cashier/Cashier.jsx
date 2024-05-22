import { Dropdown } from "antd";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
import CashierCreate from "../../../components/Cashier/CashierCreate";
import CashierTable from "../../../components/Cashier/CashierTable";
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
  // {
  //   title: "Img",
  //   dataIndex: "image",
  //   key: "image",
  //   fixed: "left",
  //   align: "center",
  //   width: 70,
  //   render: (img) => (
  //     <div className="w-8 h-8 rounded-full overflow-hidden mx-auto">
  //       <img
  //         src={img ?? defaultUser}
  //         alt="defaultUser"
  //         className="w-full h-full object-cover"
  //       />
  //     </div>
  //   ),
  // },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    fixed: "left",

    render: ({ name, email }) => (
      <div className="flex flex-col cursor-pointer ">
        <span className="text-xs md:text-sm text-dark dark:text-white87 font-medium">
          {name}
        </span>
        <span className="text-xs dark:text-white60 primary-text">{email}</span>
      </div>
    ),
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
    key: "companyName",
    render: (companyName) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {companyName}
      </span>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    render: (phone) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {phone}
      </span>
    ),
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 350,
    render: (address) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {address}
      </span>
    ),
  },
  {
    title: "Vat Number",
    dataIndex: "vatNumber",
    key: "vatNumber",
    align: "center",
    render: (vatNumber) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {vatNumber}
      </span>
    ),
  },

  {
    title: "Created At",
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
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <div
                      onClick={() => handleEdit(record?.id)}
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
          {/* <button
            onClick={() => handleEdit(record?.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button> */}
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

const Cashier = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <GlobalContainer
      pageTitle="Cashier List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CashierCreate />

      <CashierTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};

export default Cashier;
