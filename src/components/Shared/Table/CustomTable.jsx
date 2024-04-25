import { Table } from "antd";

const CustomTable = ({
  columns,
  dataSource,
  total,
  pagination,
  setPagination,
  setSelectedRows,
  isLoading,
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

  const updatePage = (newPage) => {
    setPagination((prevPagination) => ({ ...prevPagination, page: newPage }));
  };

  const updatePageSize = (newPageSize) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      perPage: newPageSize,
    }));
  };

  const paginationProps = {
    size: "default",
    total: total,
    defaultCurrent: 1,
    current: pagination.page,
    onChange: (page) => {
      updatePage(page);
    },
    showSizeChanger: true,
    defaultPageSize: pagination.perPage,
    onShowSizeChange: (current, size) => {
      updatePageSize(size);
    },
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <Table
      size="small"
      rowKey={(record) => record.id}
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      loading={isLoading}
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: "max-content",
      }}
      pagination={{ ...paginationProps }}
    />
  );
};

export default CustomTable;
