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
  useUpdateStatusMutation,
} from "../../../../redux/services/department/departmentApi";
import {
  closeEditDrawer,
  openEditDrawer,
} from "../../../../redux/services/drawer/drawerSlice";
import { DEPARTMENT } from "../../../../utilities/configs/Api";
import DepartmentForm from "./DepartmentForm";
import CustomTable from "../../../../components/Shared/Table/CustomTable";

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
      console.log(status);
      return (
        <button
          className={`p-0 ${
            status == 1 ? "bg-[#22C55E]" : "bg-[#EF4444]"
          } rounded shadow-md`}
          onClick={() => handleStatus(record.id)}
        >
          <span className="font-medium text-white text-xs px-2 w-full">
            {status == 1 ? "Active" : "Inactive"}
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

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateStatusMutation();

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

  const handleStatusUpdate = async () => {
    const { data, error } = await updateStatus({
      data: {
        id: statusId,
      },
    });

    if (data?.success) {
      setId(undefined);
      setStatusModal(false);
    }
  };

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

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     setSelectedRows(selectedRows);
  //   },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.name === "Disabled User",
  //     name: record.name,
  //   }),
  // };

  // const updatePage = (newPage) => {
  //   setPagination((prevPagination) => ({ ...prevPagination, page: newPage }));
  // };

  // const updatePageSize = (newPageSize) => {
  //   setPagination((prevPagination) => ({
  //     ...prevPagination,
  //     perPage: newPageSize,
  //   }));
  // };

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
      {/* <Table
        rowKey={(record) => record.id}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        size="small"
        columns={newColumns}
        dataSource={departmentData}
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
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
          size: "default",
          // style: {
          //   marginTop: "20px",
          // },
        }}
        scroll={{
          x: "max-content",
        }}
        loading={isFetching}
      /> */}

      <CustomTable
        columns={newColumns}
        dataSource={departmentData}
        total={total}
        pagination={pagination}
        setPagination={setPagination}
        setSelectedRows={setSelectedRows}
        isLoading={isFetching}
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
        title="Status Update"
        open={statusModal}
        maskClosable
        okText="Yes"
        cancelText="No"
        onOk={handleStatusUpdate}
        onCancel={() => setStatusModal(false)}
        confirmLoading={isStatusUpdating}
      >
        Do you want to update your status?
      </Modal>
    </GlobalContainer>
  );
};

export default Department;
