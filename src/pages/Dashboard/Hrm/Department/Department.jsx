/* eslint-disable no-unused-vars */
import { Modal, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../../../../components/Shared/Drawer/CustomDrawer";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import {
  useCreateDepartmentMutation,
  useGetDepartmentDetailsQuery,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
} from "../../../../redux/services/department/departmentApi";
import {
  closeEditDrawer,
  openEditDrawer,
} from "../../../../redux/services/drawer/drawerSlice";
import { DEPARTMENT } from "../../../../utilities/configs/Api";
import DepartmentForm from "./DepartmentForm";

const columns = [
  {
    //department
    title: "Department",
    dataIndex: "department",
    key: "department",
    align: "center",
    render: (department) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {department}
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
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "80px",
    align: "center",
    render: ({ status, handleStatus }, record) => {
      return status === "1" ? (
        <button
          className="p-0 bg-[#22C55E] rounded shadow-md"
          onClick={() => handleStatus(record.id)}
        >
          <span className="font-medium text-white text-xs px-2  w-full">
            Active
          </span>
        </button>
      ) : (
        <button className="p-0 bg-[#ff0000] rounded  shadow-md">
          <span className="font-medium text-white text-xs px-2  w-full">
            Inactive
          </span>
        </button>
      );
    },
  },
  {
    //action
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 70,
    fixed: "right",
    render: (getDetails, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            onClick={() => getDetails(record.id)}
            className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-xl" />
          </button>
          <button className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300">
            <MdDelete className="text-xl" />
          </button>
        </div>
      );
    },
  },
];

const Department = () => {
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

  //get all data query
  const { data, isFetching } = useGetDepartmentsQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const { data: details, isFetching: isDetailsFetching } =
    useGetDepartmentDetailsQuery({ id }, { skip: !id });

  const [createDepartment, { isLoading: isCreating }] =
    useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] =
    useUpdateDepartmentMutation();

  const getDetails = (id) => {
    setId(id);
    dispatch(openEditDrawer());
  };

  useEffect(() => {
    if (details) {
      setFields([
        {
          name: "name",
          value: details?.name,
          errors: "",
        },
      ]);
    }
  }, [details]);

  const handleStatus = (id) => {
    setStatusModal(true);
    setStatusId(id);
  };

  // const handleStatusUpdate = () => {};

  const departmentData =
    data?.results?.department?.map((item) => {
      const { id, name, created_at, is_active } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        department: name,
        status: { status: is_active, handleStatus },
        created_at: date,
        action: getDetails,
      };
    }) ?? [];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const updatePage = (newPage) => {
    setPagination((prevPagination) => ({ ...prevPagination, page: newPage }));
  };

  const updatePageSize = (newPageSize) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      perPage: newPageSize,
    }));
  };

  const handleSubmit = async (values) => {
    const { data, error } = await createDepartment({
      url: DEPARTMENT,
      data: values,
    });

    if (data?.success) {
      setId(undefined);
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
    const { data, error } = await updateDepartment({
      url: DEPARTMENT,
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
      pageTitle="Department"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <Table
        rowKey={(record) => record.id}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        size="small"
        columns={newColumns}
        dataSource={departmentData}
        pagination={{
          showTotal: (total) => `Total ${total} items`,
          defaultCurrent: 1,
          defaultPageSize: pagination.perPage,
          total: total,
          showSizeChanger: true,
          current: pagination.page,
          onShowSizeChange: (current, size) => {
            updatePageSize(size);
          },
          onChange: (page) => {
            updatePage(page);
          },
        }}
        scroll={{
          x: "max-content",
        }}
        loading={isFetching}
      />

      <CustomDrawer title={"Create Department"} open={isCreateDrawerOpen}>
        <DepartmentForm
          handleSubmit={handleSubmit}
          isLoading={isCreating}
          fields={errorFields}
          //error fields
        />
      </CustomDrawer>

      <CustomDrawer
        open={isEditDrawerOpen}
        title={"Edit Department"}
        isLoading={isDetailsFetching}
        // isFetching={isFetchingDetails}
      >
        <DepartmentForm
          handleSubmit={handleUpdate}
          isLoading={isUpdating}
          fields={fields}
          //initial values fields
        />
      </CustomDrawer>

      <Modal
        title="Status Upate"
        open={statusModal}
        // onOk={handleStatusUpate}
        onCancel={() => setStatusModal(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </GlobalContainer>
  );
};

export default Department;
