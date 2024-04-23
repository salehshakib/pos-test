// import { PageHeader } from "@ant-design/pro-layout";

import { Table } from "antd";
import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import { useGetAllDataQuery } from "../../../../redux/services/api";
import CreateDepartment from "./CreateDepartment";
import dayjs from "dayjs";
import CustomDrawer from "../../../../components/Shared/Drawer/CustomDrawer";

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
  // {
  //   title: "",
  //   dataIndex: "image",
  //   key: "image",
  //   fixed: "left",
  //   align: "center",
  //   width: 70,
  //   render: (img) => (
  //     <div className="w-8 h-8 rounded-full overflow-hidden mx-auto">
  //       <img
  //         src={img}
  //         alt="defaultUser"
  //         className="w-full h-full object-cover"
  //       />
  //     </div>
  //   ),
  // },
  // {
  //   title: "Name",
  //   dataIndex: "name",
  //   key: "name",
  //   // fixed: "left",
  //   render: (name) => (
  //     //   <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //     //     {name}
  //     //   </span>
  //     <div className="flex flex-col cursor-pointer ">
  //       {/* <Link className="inline-block" to={`/profile/${record.key}/overview`} key={record.key}> */}
  //       <span className="text-xs md:text-sm text-dark dark:text-white87 font-medium">
  //         {name}
  //       </span>
  //       {/* </Link> */}
  //       <span className="text-xs dark:text-white60 text-posPurple ">
  //         admin@gmail.com
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   //adress
  //   title: "Address",
  //   dataIndex: "address",
  //   key: "address",
  //   render: (address) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {address}
  //     </span>
  //   ),
  // },
  // {
  //   //phone
  //   title: "Phone",
  //   dataIndex: "phone",
  //   key: "phone",
  //   align: "center",
  //   render: (phone) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {phone}
  //     </span>
  //   ),
  // },
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
    url: "human-resource/department",
    params: pagination,
  });

  console.log(data, isLoading);

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

  return (
    <GlobalContainer
      pageTitle="Department"
      // drawerComponent={<CreateDepartment />}
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
        <CreateDepartment onClose={hideDrawer} />
      </CustomDrawer>
    </GlobalContainer>
    // </div>
  );
};

export default Department;
