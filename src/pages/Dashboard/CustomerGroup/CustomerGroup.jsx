import { Dropdown } from "antd";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
import CustomerGroupCreate from "../../../components/CustomerGroup/CustomerGroupCreate";
import CustomerGroupTable from "../../../components/CustomerGroup/CustomerGroupTable";
import { dropdownStyleProps } from "../../../components/Shared/Dropdown/DropdownProps";
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
    align: "center",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    title: "Percentage (%)",
    dataIndex: "percentage",
    key: "percentage",
    align: "center",
    render: (percentage) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {percentage}
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

const CustomerGroup = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <GlobalContainer
      pageTitle="Customer Group"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CustomerGroupCreate />

      <CustomerGroupTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default CustomerGroup;
