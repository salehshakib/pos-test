import { Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import CustomDrawer from "../../../../components/Shared/Drawer/CustomDrawer";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import { useGetAllDataQuery } from "../../../../redux/services/fetchApi";
import { useStoreDataMutation } from "../../../../redux/services/mutationApi";
import { DEPARTMENT } from "../../../../utilities/configs/Api";
import CreateDepartment from "./CreateDepartment";

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
    //action
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 70,
    fixed: "right",
    render: () => (
      <div className="flex justify-center items-center gap-3 ">
        <button className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300">
          <MdEditSquare className="text-xl" />
        </button>
        <button className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300">
          <MdDelete className="text-xl" />
        </button>
      </div>
    ),
  },
];

const Department = () => {
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //get all data query
  const { data, isLoading } = useGetAllDataQuery({
    url: DEPARTMENT,
    params: pagination,
  });

  const [storeData, { isLoading: isMutating }] = useStoreDataMutation();

  const departmentData =
    data?.results?.department?.map((item) => {
      const { id, name, created_at } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        department: name,
        created_at: date,
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

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const hideDrawer = () => {
    setIsDrawerOpen(false);
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

  const [fields, setFields] = useState([]);
  const handleSubmit = async (values) => {
    const { data, error } = await storeData({
      url: DEPARTMENT,
      data: values,
    });

    if (data?.success) {
      hideDrawer();
    }

    if (error) {
      const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
        name: fieldName,
        errors: error?.data?.errors[fieldName],
      }));

      setFields(errorFields);
    }
  };

  return (
    <GlobalContainer
      pageTitle="Department"
      openDrawer={openDrawer}
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
          showSizeChanger: true,
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
        loading={isLoading}
      />

      <CustomDrawer
        open={isDrawerOpen}
        onClose={hideDrawer}
        title={"Create Department"}
      >
        <CreateDepartment
          onClose={hideDrawer}
          handleSubmit={handleSubmit}
          isLoading={isMutating}
          fields={fields}
        />
      </CustomDrawer>
    </GlobalContainer>
    // </div>
  );
};

export default Department;
