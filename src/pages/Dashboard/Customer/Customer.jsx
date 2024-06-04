import { Dropdown } from "antd";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import CustomerCreate from "../../../components/Customer/CustomerCreate";
import CustomerTable from "../../../components/Customer/CustomerTable";
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
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    align: "left",
    render: (companyName) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {companyName}
      </span>
    ),
  },

  {
    title: "Customer Group",
    dataIndex: "customerGroup",
    key: "customerGroup",
    align: "center",
    render: (customerGroup) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {customerGroup}
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
  // {
  //   title: "Address",
  //   dataIndex: "address",
  //   key: "address",
  //   width: 350,
  //   render: (address) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {address}
  //     </span>
  //   ),
  // },
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
            status == 1
              ? "bg-[#DCFCE7] text-[#16A34A]"
              : "bg-[#FEF2F2] text-[#EF4444]"
          } rounded shadow-md w-[80px]`}
          onClick={() => handleStatusModal(record.id)}
        >
          <span className="font-medium text-xs px-2 w-full">
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
            // onClick={() => handleDeleteModal(record?.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <TbListDetails className="text-lg md:text-xl" />
          </button>

          <Dropdown
            menu={{
              items: [
                {
                  key: "edit",
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
                  key: "due",
                  label: (
                    <div className="flex justify-start items-center gap-3">
                      <PiBroom className="text-lg md:text-xl" />
                      Due Clear
                    </div>
                  ),
                },
                {
                  key: "delete",
                  label: (
                    <div
                      onClick={() => handleDeleteModal(record?.id)}
                      className="flex justify-start items-center gap-3"
                    >
                      <MdDelete className="text-lg md:text-xl" />
                      Delete
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
        </div>
      );
    },
  },
];

const Customer = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <GlobalContainer
      pageTitle="Customer List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CustomerCreate />

      <CustomerTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Customer;
