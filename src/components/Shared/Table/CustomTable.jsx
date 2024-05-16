import { Table } from "antd";

const CustomTable = ({
  columns,
  dataSource,
  isRowSelection = false,
  total,
  pagination = false,
  setPagination,
  setSelectedRows,
  isLoading,
  setId,
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
    // defaultPageSize: pagination.perPage,
    defaultPageSize: 20,
    onShowSizeChange: (current, size) => {
      updatePageSize(size);
    },
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <Table
      size="small"
      style={{
        width: "100%",
      }}
      rowKey={(record) => record.id}
      rowSelection={
        isRowSelection
          ? {
              type: "checkbox",
              ...rowSelection,
            }
          : false
      }
      onRow={(record) => ({
        onClick: () => {
          setId(record.id);
        },
      })}
      loading={isLoading}
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: "max-content",
      }}
      pagination={pagination ? { ...paginationProps } : false}
    />
  );
};

export default CustomTable;
