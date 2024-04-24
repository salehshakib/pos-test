import { Table } from "antd";
import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import { useGetAllDataQuery } from "../../../../redux/services/fetchApi";
import fakeData from "../fakeData";
import { useDispatch, useSelector } from "react-redux";
import { openEditDrawer } from "../../../../redux/services/global/globalSlice";

const columns = [
  {
    title: "Staff ID",
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
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name) => (
      <div className="flex flex-col cursor-pointer ">
        <span className="text-xs md:text-sm text-dark dark:text-white87 font-medium">
          {name}
        </span>
        <span className="text-xs dark:text-white60 text-posPurple ">
          admin@gmail.com
        </span>
      </div>
    ),
  },
  {
    //adress
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {address}
      </span>
    ),
  },
  {
    //phone
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    render: (phone) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {phone}
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
    //action
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 50,
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

const Employee = () => {
  const dispatch = useDispatch();
  const { isCreateDrawerOpen, isEditDrawerOpen } = useSelector(
    (state) => state.globalState
  );

  const [pagination, setPagination] = useState({ page: 1, perPage: 20 });
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const [fields, setFields] = useState([]);
  const [errorFields, setErrorFields] = useState([]);

  const [id, setId] = useState(undefined);

  const { data, isFetching } = useGetAllDataQuery({
    url: "inventory/category",
    params: pagination,
  });

  const total = data?.meta?.total;

  console.log(data, isFetching);

  // const { data: details } = useGetDetailsQuery(
  //   { url: DEPARTMENT, id },
  //   { skip: !id }
  // );

  // console.log(details);

  const getDetails = (id) => {
    setId(id);
    dispatch(openEditDrawer());
  };

  // const departmentData =
  // data?.results?.department?.map((item) => {
  //   const { id, name, created_at, is_active } = item;
  //   const date = dayjs(created_at).format("DD-MM-YYYY");

  //   return {
  //     id,
  //     department: name,
  //     status: is_active,
  //     created_at: date,
  //     action: getDetails,
  //   };
  // }) ?? [];

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

  // const handleSubmit = async (values) => {
  //   const { data, error } = await storeData({
  //     url: DEPARTMENT,
  //     data: values,
  //   });

  //   if (data?.success) {
  //     setId(undefined);
  //   }

  //   if (error) {
  //     const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
  //       name: fieldName,
  //       errors: error?.data?.errors[fieldName],
  //     }));

  //     setErrorFields(errorFields);
  //   }
  // };

  // const handleUpdate = async (values) => {
  //   console.log(values);
  // };

  return (
    <div className="h-full ">
      <GlobalContainer
        pageTitle="Employee"
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
          dataSource={fakeData}
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
      </GlobalContainer>
    </div>
  );
};

export default Employee;
