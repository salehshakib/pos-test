import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../../../../components/Shared/Drawer/CustomDrawer";
import DeleteModal from "../../../../components/Shared/Modal/DeleteModal";
import CustomTable from "../../../../components/Shared/Table/CustomTable";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";

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
    // name
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
    // value
    title: "Value",
    dataIndex: "value",
    key: "value",
    align: "center",
    render: (value) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {value}
      </span>
    ),
  },
  {
    // discount plan
    title: "Discount Plan",
    dataIndex: "discount_plan",
    key: "discount_plan",
    align: "center",
    render: (discountPlan) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {discountPlan}
      </span>
    ),
  },
  {
    // validity
    title: "Validity",
    dataIndex: "validity",
    key: "validity",
    align: "center",
    render: (validity) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {validity}
      </span>
    ),
  },
  {
    // days
    title: "Days",
    dataIndex: "days",
    key: "days",
    align: "center",
    render: (days) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {days}
      </span>
    ),
  },
  {
    // products
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
          } rounded shadow-md w-full`}
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
    render: ({ getDetails, handleDeleteModal }, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            onClick={() => getDetails(record.id)}
            className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button>
          <button
            onClick={() => handleDeleteModal(record.id)}
            className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdDelete className="text-lg md:text-xl" />
          </button>
        </div>
      );
    },
  },
];

const Discount = () => {
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

  //get all data query
  // const { data, isLoading } = useGetDepartmentsQuery({
  //   params: pagination,
  // });

  // const total = data?.meta?.total;

  // const { data: details, isFetching } = useGetDepartmentDetailsQuery(
  //   { id },
  //   { skip: !id }
  // );

  // const [createDepartment, { isLoading: isCreating }] =
  //   useCreateDepartmentMutation();

  // const [updateDepartment, { isLoading: isUpdating }] =
  //   useUpdateDepartmentMutation();

  // const [updateStatus, { isLoading: isStatusUpdating }] =
  //   useUpdateDepartmentStatusMutation();

  // const [deleteDepartment, { isLoading: isDeleting }] =
  //   useDeleteDepartmentMutation();

  // const getDetails = (id) => {
  //   setId(id);
  //   dispatch(openEditDrawer());
  // };

  // useEffect(() => {
  //   if (details) {
  //     // const fieldData = fieldsToUpdate(details);

  //     const fieldData = [
  //       {
  //         name: "name",
  //         value: details?.name,
  //         errors: "",
  //       },
  //     ];

  //     setFields(fieldData);
  //   }
  // }, [details, setFields]);

  const handleStatus = (id) => {
    setStatusModal(true);
    setStatusId(id);
  };

  const handleStatusUpdate = async () => {
    console.log(statusId);
    //   const { data, error } = await updateStatus(statusId);

    //   if (data?.success) {
    //     setId(undefined);
    //     setStatusModal(false);
    //   }
  };

  const handleDelete = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleDeleteDepartment = async () => {
    //   const { data, error } = await deleteDepartment(deleteId);
    //   if (data?.success) {
    //     setDeleteModal(false);
    //   }
  };

  // const dataSource =
  //   data?.results?.department?.map((item) => {
  //     const { id, name, created_at, is_active } = item;
  //     const date = dayjs(created_at).format("DD-MM-YYYY");

  //     return {
  //       id,
  //       department: name,
  //       status: { status: is_active, handleStatusModal },
  //       created_at: date,
  //       action: { getDetails, handleDeleteModal },
  //     };
  //   }) ?? [];

  const handleSubmit = async (values) => {
    //   const { data, error } = await createDepartment({
    //     data: values,
    //   });
    //   if (data?.success) {
    //     setId(undefined);
    //     dispatch(closeCreateDrawer());
    //   }
    //   if (error) {
    //     const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
    //       name: fieldName,
    //       errors: error?.data?.errors[fieldName],
    //     }));
    //     setErrorFields(errorFields);
    //   }
  };

  const handleUpdate = async (values) => {
    //   const { data, error } = await updateDepartment({
    //     data: { id, ...values },
    //   });
    //   if (data?.success) {
    //     setId(undefined);
    //     dispatch(closeEditDrawer());
    //   }
    //   if (error) {
    //     const errorFields = Object.keys(error?.data?.errors)?.map(
    //       (fieldName) => ({
    //         name: fieldName,
    //         value: fields.find((field) => field.name === fieldName).value,
    //         errors: error?.data?.errors[fieldName],
    //       })
    //     );
    //     setFields(errorFields);
    //   }
  };
  return (
    <GlobalContainer
      pageTitle="Discount"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CustomTable
        columns={newColumns}
        pagination={pagination}
        setPagination={setPagination}
        setSelectedRows={setSelectedRows}
        //   dataSource={dataSource}
        //   total={total}
        //   isLoading={isLoading}
      />

      <CustomDrawer title={"Create Discount"} open={isCreateDrawerOpen}>
        {/* <WarehouseForm
        handleSubmit={handleSubmit}
        isLoading={isCreating}
        fields={errorFields}
      /> */}
      </CustomDrawer>

      <CustomDrawer
        title={"Edit Discount"}
        open={isEditDrawerOpen}
        //   isLoading={isFetching}
      >
        {/* <CategoryForm
    handleSubmit={handleUpdate}
    isLoading={isUpdating}
    fields={fields}
  /> */}
      </CustomDrawer>

      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        //   handleDeleteDepartment={handleDeleteCategory}
        //   isDeleting={isDeleting}
      />
    </GlobalContainer>
  );
};

export default Discount;
