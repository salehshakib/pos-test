// import { PageHeader } from "@ant-design/pro-layout";

import { PageContainer } from '@ant-design/pro-layout';
import { Button, Table } from 'antd';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdDeleteOutline, MdEditSquare } from 'react-icons/md';
import fakeData from './fakeData';

const columns = [
  {
    title: 'Staff ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    align: 'center',
    width: 80,
    render: (id) => (
      <span className="text-dark dark:text-white87 text-sm font-medium md:text-xs">
        {id}
      </span>
    ),
  },
  {
    title: 'Img',
    dataIndex: 'image',
    key: 'image',
    fixed: 'left',
    align: 'center',
    width: 50,
    render: (img) => (
      <div className="mx-auto h-8 w-8 overflow-hidden rounded-full">
        <img
          src={img}
          alt="defaultUser"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    render: (name) => (
      <span className="text-dark dark:text-white87 text-sm font-medium md:text-xs">
        {name}
      </span>
    ),
  },
  {
    //email
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email) => (
      <span className="text-dark dark:text-white87 text-sm font-medium md:text-xs">
        {email}
      </span>
    ),
  },
  {
    //phone
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone) => (
      <span className="text-dark dark:text-white87 text-sm font-medium md:text-xs">
        {'0' + phone}
      </span>
    ),
  },
  {
    //department
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    align: 'center',
    render: (department) => (
      <span className="text-dark dark:text-white87 text-sm font-medium md:text-xs">
        {department}
      </span>
    ),
  },
  {
    //action
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 50,
    fixed: 'right',
    render: () => (
      <div className="flex items-center justify-center gap-3">
        <Button className="hover:text-posPurple flex items-center justify-center border-none bg-transparent p-0 text-black hover:bg-none">
          <MdEditSquare className="text-2xl" />
        </Button>

        <Button className="hover:text-posPurple flex items-center justify-center border-none bg-transparent p-0 text-black hover:bg-none">
          <MdDeleteOutline className="text-2xl" />
        </Button>
      </div>
    ),
  },
];

const Hrm = () => {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // )yarn;
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <div className="h-full">
      <PageContainer
        title=<div className="text-xl md:text-3xl">HRM</div>
        subTitle={
          <Button
            type="text"
            icon={<FaCirclePlus />}
            className="flex items-center justify-center text-xl hover:bg-none md:text-3xl"
          />
        }
        extra={[]}
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          size="small"
          columns={columns}
          dataSource={fakeData}
          pagination={{
            showTotal: (total) => `Total ${total} items`,
            showSizeChanger: true,
          }}
        />
      </PageContainer>
    </div>
  );
};

export default Hrm;
