import { Dropdown } from "antd";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
import { dropdownStyleProps } from "../../../components/Shared/Dropdown/DropdownProps";
import WarehouseCreate from "../../../components/Warehouse/WarehouseCreate";
import WarehouseTable from "../../../components/Warehouse/WarehouseTable";
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
    //department
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
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    render: (email) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {email}
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
    width: 300,
    render: (address) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {address}
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
  // {
  //   title: "Status",
  //   dataIndex: "status",
  //   key: "status",
  //   width: "80px",
  //   align: "center",
  //   render: ({ status, handleStatusModal }, record) => {
  //     return (
  //       <button
  //         className={`p-0 ${
  //           status == 1 ? "bg-[#22C55E]" : "bg-[#EF4444]"
  //         } rounded shadow-md w-full`}
  //         onClick={() => handleStatusModal(record.id)}
  //       >
  //         <span className="font-medium text-white text-xs px-2 w-full">
  //           {status == 1 ? "Active" : "Inactive"}
  //         </span>
  //       </button>
  //     );
  //   },
  // },
  {
    //action
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 70,
    fixed: "right",
    render: ({ handleEdit, handleDeleteModal }, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          {/* <button
            // onClick={() => handleDeleteModal(record?.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <TbListDetails className="text-lg md:text-xl" />
          </button> */}

          <Dropdown
            {...dropdownStyleProps}
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

const Warehouse = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Warehouse List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <WarehouseCreate />

      <WarehouseTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Warehouse;
