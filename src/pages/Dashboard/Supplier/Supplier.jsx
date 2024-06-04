import { Dropdown } from "antd";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import SupplierCreate from "../../../components/Supplier/SupplierCreate";
import SupplierTable from "../../../components/Supplier/SupplierTable";
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
                  icon: <MdEditSquare size={20} />,
                  label: (
                    <div className="flex justify-start items-center gap-3">
                      Edit
                    </div>
                  ),
                  onClick: () => handleEdit(record?.id),
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
                  onClick: () => handleDeleteModal(record?.id),
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

export const Supplier = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <GlobalContainer
      pageTitle="Supplier List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <SupplierCreate />

      <SupplierTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
