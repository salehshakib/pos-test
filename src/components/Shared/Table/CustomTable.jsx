import { Dropdown, Table, Pagination } from "antd";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPagination,
  updatePage,
  updatePageSize,
} from "../../../redux/services/pagination/paginationSlice";

const CustomTable = ({
  columns,
  dataSource,
  isRowSelection = false,
  total,
  setSelectedRows,
  isLoading,
  showPaging = true,
  tableStyleProps = {},
  status = true,
  created_at = true,
  action = true,
}) => {
  const dispatch = useDispatch();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  // const updatePage = (newPage) => {
  //   setPagination((prevPagination) => ({ ...prevPagination, page: newPage }));
  // };

  // const updatePageSize = (newPageSize) => {
  //   setPagination((prevPagination) => ({
  //     ...prevPagination,
  //     perPage: newPageSize,
  //   }));
  // };

  const pagination = useSelector(selectPagination);

  const handlePageChange = (newPage) => {
    dispatch(updatePage({ page: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    dispatch(updatePageSize({ perPage: newPageSize }));
  };

  const tableProps = {
    loading: isLoading,
    size: "small",
    style: {
      width: "100%",
    },
    rowKey: (record) => record.id,
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
    ...tableStyleProps,
  };

  const paginationProps = {
    size: "default",
    total: total,
    defaultCurrent: 1,
    current: pagination.page,
    onChange: (page) => {
      handlePageChange(page);
    },
    showSizeChanger: true,
    // hideOnSinglePage: true,
    defaultPageSize: pagination.perPage,
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
                items: [
                  {
                    key: "edit",
                    icon: <MdEditSquare size={20} />,
                    label: (
                      <div className="flex justify-start items-center gap-3">
                        Edit
                      </div>
                    ),
                    onClick: () => record?.handleEdit(record?.id),
                  },
                  {
                    key: "due",
                    icon: <PiBroom size={20} />,
                    label: (
                      <div className="flex justify-start items-center gap-3">
                        Due Clear
                      </div>
                    ),
                  },
                  {
                    key: "delete",
                    icon: <MdDelete size={20} />,
                    label: (
                      <div className="flex justify-start items-center gap-3">
                        Delete
                      </div>
                    ),
                    onClick: () => record?.handleDeleteModal(record?.id),
                  },
                ],
              }}
              placement="bottom"
              trigger={["click"]}
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
      <div className="h-[60vh] overflow-auto">
        <Table
          {...tableProps}
          pagination={showPaging ? { ...paginationProps } : false}
          columns={newColumns}
          dataSource={dataSource}
        />
      </div>
      <Pagination
        {...paginationProps}
        size="large"
        className="w-full flex justify-end"
      />
    </>
  );
};

export default CustomTable;
