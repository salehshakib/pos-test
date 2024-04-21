// import { PageHeader } from "@ant-design/pro-layout";

import { Table } from "antd";
import { MdDelete, MdEditSquare } from "react-icons/md";
import PageComponent from "../../../../components/Shared/PageComponent/PageComponent";
import fakeData from "../fakeData";
import CreateDepartment from "./CreateDepartment";
import { useGetDepartmentsQuery } from "../../../../redux/services/department/departmentApi";

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
    title: "",
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
    // fixed: "left",
    render: (name) => (
      //   <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
      //     {name}
      //   </span>
      <div className="flex flex-col cursor-pointer ">
        {/* <Link className="inline-block" to={`/profile/${record.key}/overview`} key={record.key}> */}
        <span className="text-xs md:text-sm text-dark dark:text-white87 font-medium">
          {name}
        </span>
        {/* </Link> */}
        <span className="text-xs dark:text-white60 text-posPurple ">
          admin@gmail.com
        </span>
      </div>
    ),
  },
  //   {
  //     //email
  //     title: "Email",
  //     dataIndex: "email",
  //     key: "email",
  //     render: (email) => (
  //       <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //         {email}
  //       </span>
  //     ),
  //   },
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

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};

const Department = () => {
  // const handleEdit = () => {};

  // const handleDelete = () => {};

  const { data } = useGetDepartmentsQuery({ pageSize: 10, page: 1 });

  console.log(data);

  return (
    <div className="h-full ">
      <PageComponent
        pageTitle="Department"
        drawerComponent={<CreateDepartment />}
      >
        <Table
          rowKey={(record) => record.id}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          size="small"
          columns={columns}
          dataSource={fakeData}
          pagination={{
            showTotal: (total) => `Total ${total} items`,
            showSizeChanger: true,
          }}
          scroll={{
            x: "max-content",
          }}
        />
      </PageComponent>
    </div>
  );
};

export default Department;
