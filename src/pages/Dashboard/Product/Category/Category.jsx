import { MdDelete, MdEditSquare } from "react-icons/md";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CustomTable from "../../../../components/Shared/Table/CustomTable";
import CustomDrawer from "../../../../components/Shared/Drawer/CustomDrawer";
import StatusModal from "../../../../components/Shared/Modal/StatusModal";
import DeleteModal from "../../../../components/Shared/Modal/DeleteModal";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    align: "center",
    width: 60,
    render: (id) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {id}
      </span>
    ),
  },
  {
    title: "Parent Category",
    dataIndex: "parentCategory",
    key: "parentCategory",
    align: "center",
    render: (parentCategory) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {parentCategory}
      </span>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    align: "center",
    render: (category) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {category}
      </span>
    ),
  },
  {
    title: "Products",
    dataIndex: "products",
    key: "products",
    align: "center",
    render: (products) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {products}
      </span>
    ),
  },
  {
    title: "Stock Quantity",
    dataIndex: "stockQuantity",
    key: "stockQuantity",
    align: "center",
    render: (stockQuantity) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {stockQuantity?.price} USD / {stockQuantity?.cost} USD
      </span>
    ),
  },

  // {
  //   title: "Status",
  //   dataIndex: "status",
  //   key: "status",
  //   width: "80px",
  //   align: "center",
  //   render: ({ status, handleStatus }, record) => {
  //     return (
  //       <button
  //         className={`p-0 ${
  //           status == 1 ? "bg-[#22C55E]" : "bg-[#EF4444]"
  //         } rounded shadow-md w-full`}
  //         onClick={() => handleStatus(record.id)}
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
    render: ({ getDetails, handleDelete }, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            // onClick={() => getDetails(record.id)}
            className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button>
          <button
            // onClick={() => handleDelete(record.id)}
            className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdDelete className="text-lg md:text-xl" />
          </button>
        </div>
      );
    },
  },
];
const Category = () => {
  const dispatch = useDispatch();
  const { isCreateDrawerOpen, isEditDrawerOpen } = useSelector(
    (state) => state.drawer
  );

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const [fields, setFields] = useState([]);
  const [errorFields, setErrorFields] = useState([]);

  const [id, setId] = useState(undefined);

  const [statusModal, setStatusModal] = useState(false);
  const [statusId, setStatusId] = useState(undefined);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  return (
    <GlobalContainer
      pageTitle="Category"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CustomTable
        columns={newColumns}
        // dataSource={departmentData}
        // total={total}
        pagination={pagination}
        setPagination={setPagination}
        setSelectedRows={setSelectedRows}
        // isLoading={isDepartmentsLoading}
      />

      <CustomDrawer title={"Create Department"} open={isCreateDrawerOpen}>
        {/* <DepartmentForm
          handleSubmit={handleSubmit}
          isLoading={isCreating}
          fields={errorFields}
        /> */}
      </CustomDrawer>

      <CustomDrawer
        title={"Edit Department"}
        open={isEditDrawerOpen}
        // isLoading={isDetailsFetching}
      >
        {/* <DepartmentForm
          handleSubmit={handleUpdate}
          isLoading={isUpdating}
          fields={fields}
        /> */}
      </CustomDrawer>

      {/* <StatusModal
        statusModal={statusModal}
        setStatusModal={setStatusModal}
        handleStatusUpdate={handleStatusUpdate}
        isStatusUpdating={isStatusUpdating}
      />

      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleDeleteDepartment={handleDeleteDepartment}
        isDeleting={isDeleting}
      /> */}
    </GlobalContainer>
  );
};

export default Category;
