import { Dropdown, Table } from "antd";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoIosLock } from "react-icons/io";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const getMenuItems = (record) =>
  [
    {
      key: "edit",
      icon: <MdEditSquare size={20} />,
      label: <div className="flex justify-start items-center gap-3">Edit</div>,
      onClick: () => record?.handleEdit(record?.id),
      disabled: !record.handleEdit,
    },
    record?.handleChangePermission && {
      key: "permission",
      icon: <IoIosLock size={20} />,
      label: (
        <div className="flex justify-start items-center gap-3">
          Set Permissions
        </div>
      ),
      onClick: () => record?.handleChangePermission(record?.id),
    },
    {
      key: "delete",
      icon: <MdDelete size={20} />,
      label: (
        <div className="flex justify-start items-center gap-3">Delete</div>
      ),
      onClick: () => record?.handleDeleteModal(record?.id),
      disabled: !record.handleDeleteModal,
    },
  ].filter(Boolean);

const CustomTable = ({
  columns,
  dataSource,
  isRowSelection = false,
  total,
  pagination,
  updatePage,
  updatePageSize,
  setSelectedRows,
  isLoading,
  showPaging = true,
  tableStyleProps = {},
  status = true,
  created_at = true,
  action = true,
}) => {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const handlePageChange = (newPage) => {
    console.log(newPage);
    updatePage(newPage);
    // dispatch(updatePage({ page: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    console.log(newPageSize);
    updatePageSize(newPageSize);
    // dispatch(updatePageSize({ perPage: newPageSize }));
  };

  const tableProps = {
    loading: isLoading,
    size: "small",
    style: {
      width: "100%",
    },
    rowKey: (record) => record?.id,
    rowSelection: isRowSelection
      ? {
          type: "checkbox",
          ...rowSelection,
        }
      : false,
    onRow: (record) => ({
      onClick: () => console.log(record.id),
    }),
    scroll: {
      x: "max-content",
      // y: "60vh",
    },
    // sticky: {
    //   offsetHeader: 64,
    // },
    ...tableStyleProps,
  };

  const paginationProps = {
    size: "default",
    total: total,
    defaultCurrent: 1,
    current: pagination?.page,
    onChange: (page) => {
      handlePageChange(page);
    },
    showSizeChanger: true,
    // hideOnSinglePage: true,
    defaultPageSize: pagination?.perPage,
    onShowSizeChange: (current, size) => {
      handlePageSizeChange(size);
    },
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };

  const baseColumns = [
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
    ...columns,
  ];

  const statusColumn = {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "100px",
    align: "center",
    render: (status, record) => {
      return record?.handleStatusModal ? (
        <button
          className={`p-0 ${
            status == 1
              ? "bg-[#DCFCE7] text-[#16A34A]"
              : "bg-[#FEF2F2] text-[#EF4444]"
          } rounded shadow-md w-[80px]`}
          onClick={() => record?.handleStatusModal(record.id)}
        >
          <span className="font-medium text-xs px-2 w-full">
            {status.toString() === "1" ? "Active" : "Inactive"}
          </span>
        </button>
      ) : (
        <div
          className={`p-0 ${
            status == 1
              ? "bg-[#DCFCE7] text-[#16A34A]"
              : "bg-[#FEF2F2] text-[#EF4444]"
          } rounded shadow-md w-[80px]`}
        >
          <span className="font-medium text-xs px-2 w-full">
            {status.toString() === "1" ? "Active" : "Inactive"}
          </span>
        </div>
      );
    },
  };

  const timeColumns = {
    //created_at
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    align: "center",
    width: "100px",
    render: (created_at) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {created_at}
      </span>
    ),
  };

  const actionColumn = {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: "80px",
    fixed: "right",
    render: (props, record) => {
      if (record?.handleDetailsModal) {
        return (
          <div className="flex justify-center items-center gap-2">
            {/* <Tooltip title="Details"> */}
            <button
              onClick={() => record?.handleDetailsModal(record?.id)}
              className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
            >
              <TbListDetails className="text-lg md:text-xl" />
            </button>
            {/* </Tooltip> */}

            {/* <Tooltip title="More Actions"> */}
            <Dropdown
              menu={{
                items: getMenuItems(record),
              }}
              overlayStyle={{
                width: "max-content",
              }}
              placement="bottom"
              trigger={["click"]}
              autoAdjustOverflow
              arrow={{ pointAtCenter: true }}
            >
              <button className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300">
                <FiMoreHorizontal className="text-lg md:text-xl" />
              </button>
            </Dropdown>
            {/* </Tooltip> */}
          </div>
        );
      } else {
        return (
          <div className="flex justify-center items-center gap-2">
            {record?.handleEdit && (
              // <Tooltip title="Edit">
              <button
                onClick={() => record?.handleEdit(record?.id)}
                className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
              >
                <MdEditSquare className="text-lg md:text-xl" />
              </button>
              //  </Tooltip>
            )}

            {/* <Tooltip title="Delete"> */}
            <button
              onClick={() => record?.handleDeleteModal(record?.id)}
              className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
            >
              <MdDelete className="text-lg md:text-xl" />
            </button>
            {/* </Tooltip> */}
          </div>
        );
      }
    },
  };

  const newColumns = [...baseColumns];

  if (status) {
    newColumns.splice(newColumns.length, 0, statusColumn);
  }

  if (created_at) {
    newColumns.splice(newColumns.length, 0, timeColumns);
  }

  if (action) {
    newColumns.splice(newColumns.length, 0, actionColumn);
  }

  return (
    <>
      {/* <div className="h-[60vh] overflow-auto"> */}
      <Table
        {...tableProps}
        // pagination={false}
        pagination={showPaging ? { ...paginationProps } : false}
        columns={newColumns}
        dataSource={dataSource}
      />
      {/* </div> */}
      {/* {showPaging && !isLoading && (
        <Pagination
          {...paginationProps}
          total={dataSource?.length || 0}
          // showSizeChanger={true}
          // showTotal={
          //   (total, range) => `${range[0]}-${range[1]} of ${total} items`
          //   // console.log(total)
          // }
          size="large"
          className="w-full flex justify-end mt-10"
        />
      )} */}
    </>
  );
};

export default CustomTable;
