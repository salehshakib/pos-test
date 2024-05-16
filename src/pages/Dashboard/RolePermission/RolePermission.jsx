/* eslint-disable no-unused-vars */
import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
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
    title: "Description",
    dataIndex: "description",
    key: "description",
    align: "center",
    render: (description) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {description}
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

const RolePermission = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Role Permission List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      {/* <WarehouseCreate />

      <WarehouseTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      /> */}
    </GlobalContainer>
  );
};

export default RolePermission;
