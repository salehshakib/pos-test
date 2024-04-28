import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../../../../components/Shared/Drawer/CustomDrawer";
import DeleteModal from "../../../../components/Shared/Modal/DeleteModal";
import CustomTable from "../../../../components/Shared/Table/CustomTable";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from "../../../../redux/services/category/categoryApi";
import {
  closeCreateDrawer,
  closeEditDrawer,
  openEditDrawer,
} from "../../../../redux/services/drawer/drawerSlice";
import CategoryForm from "./CategoryForm";

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
    // align: "center",
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
    // align: "center",
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
  {
    //created_at
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
            onClick={() => getDetails(record.id)}
            className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button>
          <button
            onClick={() => handleDelete(record.id)}
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

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  const { data, isLoading } = useGetCategoriesQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const { data: details, isFetching } = useGetCategoryDetailsQuery(
    { id },
    { skip: !id }
  );

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const getDetails = (id) => {
    setId(id);
    dispatch(openEditDrawer());
  };

  useEffect(() => {
    if (details) {
      const fieldData = [
        {
          name: "name",
          value: details?.name,
          errors: "",
        },
        {
          name: "parent_id",
          value: Number(details?.parent_id),
          errors: "",
        },
      ];

      setFields(fieldData);
    }
  }, [details, setFields]);

  const handleDelete = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleDeleteCategory = async () => {
    const { data } = await deleteCategory(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.category?.map((item) => {
      const { id, name, created_at, parent_id } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        category: name,
        parentCategory: parent_id ?? "N/A",
        created_at: date,
        action: { getDetails, handleDelete },
      };
    }) ?? [];

  const handleSubmit = async (values) => {
    const { data, error } = await createCategory({
      data: values,
    });

    if (data?.success) {
      setId(undefined);
      dispatch(closeCreateDrawer());
    }

    if (error) {
      const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
        name: fieldName,
        errors: error?.data?.errors[fieldName],
      }));

      setErrorFields(errorFields);
    }
  };

  const handleUpdate = async (values) => {
    const { data, error } = await updateCategory({
      data: { id, ...values },
    });

    if (data?.success) {
      setId(undefined);
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = Object.keys(error?.data?.errors)?.map(
        (fieldName) => ({
          name: fieldName,
          value: fields.find((field) => field.name === fieldName).value,
          errors: error?.data?.errors[fieldName],
        })
      );

      setFields(errorFields);
    }
  };

  return (
    <GlobalContainer
      pageTitle="Category"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CustomTable
        columns={newColumns}
        dataSource={dataSource}
        total={total}
        pagination={pagination}
        setPagination={setPagination}
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
      />

      <CustomDrawer title={"Create Category"} open={isCreateDrawerOpen}>
        <CategoryForm
          handleSubmit={handleSubmit}
          isLoading={isCreating}
          fields={errorFields}
        />
      </CustomDrawer>

      <CustomDrawer
        title={"Edit Category"}
        open={isEditDrawerOpen}
        isLoading={isFetching}
      >
        <CategoryForm
          handleSubmit={handleUpdate}
          isLoading={isUpdating}
          fields={fields}
        />
      </CustomDrawer>

      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleDeleteDepartment={handleDeleteCategory}
        isDeleting={isDeleting}
      />
    </GlobalContainer>
  );
};

export default Category;
