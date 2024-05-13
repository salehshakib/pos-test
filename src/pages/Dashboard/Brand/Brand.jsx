import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import BrandForm from "../../../components/Brand/BrandForm";
import CustomDrawer from "../../../components/Shared/Drawer/CustomDrawer";
import DeleteModal from "../../../components/Shared/Modal/DeleteModal";
import CustomTable from "../../../components/Shared/Table/CustomTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import {
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandDetailsQuery,
  useGetBrandsQuery,
  useUpdateBrandMutation,
} from "../../../redux/services/brand/brandApi";
import {
  closeEditDrawer,
  openEditDrawer,
} from "../../../redux/services/drawer/drawerSlice";

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
    title: "Image",
    dataIndex: "image",
    key: "image",
    fixed: "left",
    align: "center",
    width: 70,
    render: (img) => (
      <div className="w-8 h-8 rounded-full overflow-hidden mx-auto">
        <img
          src={img}
          alt="defaultUser"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    // align: "center",
    render: (brand) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {brand}
      </span>
    ),
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    // align: "center",
    render: (productName) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {productName}
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
    render: ({ getDetails, handleDeleteModal }, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            onClick={() => getDetails(record.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button>
          <button
            onClick={() => handleDeleteModal(record.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdDelete className="text-lg md:text-xl" />
          </button>
        </div>
      );
    },
  },
];

const Brand = () => {
  const dispatch = useDispatch();
  const { isCreateDrawerOpen, isEditDrawerOpen } = useSelector(
    (state) => state.drawer
  );

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const [fields, setFields] = useState([]);
  const [errorFields, setErrorFields] = useState([
    {
      name: "brand_image",
      value: [
        {
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
      ],
      errors: "",
    },
  ]);

  const [id, setId] = useState(undefined);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  const { data, isLoading } = useGetBrandsQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const { data: details, isFetching } = useGetBrandDetailsQuery(
    { id },
    { skip: !id }
  );

  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();

  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();

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
          name: "brand_image",
          value: {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          },
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
    const { data } = await deleteBrand(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.category?.map((item) => {
      const { id, created_at } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      console.log(item);

      return {
        id,
        // category: name,
        // parentCategory: parent_id ?? "N/A",
        created_at: date,
        action: { getDetails, handleDeleteModal },
      };
    }) ?? [];

  const handleSubmit = async (values) => {
    console.log(values);
    // const { data, error } = await createBrand({
    //   data: values,
    // });

    // if (data?.success) {
    //   setId(undefined);
    //   dispatch(closeCreateDrawer());
    // }

    // if (error) {
    //   const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
    //     name: fieldName,
    //     errors: error?.data?.errors[fieldName],
    //   }));

    //   setErrorFields(errorFields);
    // }
  };

  const handleUpdate = async (values) => {
    const { data, error } = await updateBrand({
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
      pageTitle="Brand"
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

      <CustomDrawer title={"Create Brand"} open={isCreateDrawerOpen}>
        <BrandForm
          handleSubmit={handleSubmit}
          isLoading={isCreating}
          fields={errorFields}
        />
      </CustomDrawer>

      <CustomDrawer
        title={"Edit Category"}
        open={isEditDrawerOpen}
        isLoading={isFetching}
        fields={fields}
      >
        <BrandForm
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

export default Brand;
