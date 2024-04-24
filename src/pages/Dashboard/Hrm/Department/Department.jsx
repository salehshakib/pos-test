import { Table, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../../../../components/Shared/Drawer/CustomDrawer";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import {
  useGetAllDataQuery,
  useGetDetailsQuery,
} from "../../../../redux/services/fetchApi";
import { openEditDrawer } from "../../../../redux/services/global/globalSlice";
import { useStoreDataMutation } from "../../../../redux/services/mutationApi";
import { DEPARTMENT } from "../../../../utilities/configs/Api";
import CreateDepartment from "./CreateDepartment";

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
    render: (status) =>
      status === 1 ? (
        <Tag color="#22C55E">
          <span className="font-medium text-white text-md ">Active</span>
        </Tag>
      ) : (
        <Tag color="#ff0000">Inactive</Tag>
      ),
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
  const [pagination, setPagination] = useState({ page: 1, perPage: 20 });
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fields, setFields] = useState([]);
  const dispatch = useDispatch();
  const { isCreateDrawerOpen, isEditDrawerOpen } = useSelector(
    (state) => state.globalState
  );

  const [id, setId] = useState(undefined);

  //get all data query
  const { data, isFetching } = useGetAllDataQuery({
    url: DEPARTMENT,
    params: pagination,
  });

  const total = data?.meta?.total;

  console.log(data);
  console.log(isFetching);

  const { data: details } = useGetDetailsQuery(
    { url: DEPARTMENT, id },
    { skip: !id }
  );

  console.log(details);

  const [storeData, { isLoading: isCreating }] = useStoreDataMutation();

  const getDetails = (id) => {
    setId(id);
    dispatch(openEditDrawer());
    // setIsEditDrawerOpen(true);
  };

  const departmentData =
    data?.results?.department?.map((item) => {
      const { id, name, created_at, is_active } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        department: name,
        status: is_active,
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
    const { data, error } = await storeData({
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

      setFields(errorFields);
    }
  };

  const handleUpdate = async (values) => {
    console.log(values);
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
        <CreateDepartment
          handleSubmit={handleSubmit}
          isLoading={isCreating}
          fields={fields}
        />
      </CustomDrawer>

      <CustomDrawer open={isEditDrawerOpen} title={"Edit Department"}>
        <CreateDepartment handleSubmit={handleUpdate} fields={fields} />
      </CustomDrawer>
    </GlobalContainer>
  );
};

export default Department;
