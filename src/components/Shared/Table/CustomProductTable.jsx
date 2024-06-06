import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPagination,
  updatePage,
  updatePageSize,
} from "../../../redux/services/pagination/paginationSlice";

const CustomProductTable = ({
  columns,
  dataSource,
  isRowSelection = false,
  total,
  setSelectedRows,
  isLoading,
  showPaging = true,
  tableStyleProps = {},
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

  const pagination = useSelector(selectPagination);

  const handlePageChange = (newPage) => {
    dispatch(updatePage({ page: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    dispatch(updatePageSize({ perPage: newPageSize }));
  };

  const tableProps = {
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
    loading: isLoading,
    scroll: {
      x: "max-content",
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

  const newColumns = [
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

  return (
    <Table
      {...tableProps}
      columns={newColumns}
      dataSource={dataSource}
      pagination={showPaging ? { ...paginationProps } : false}
    />
  );
};

export default CustomProductTable;
