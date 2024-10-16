import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectPagination,
  updatePage,
  updatePageSize,
} from '../../../redux/services/pagination/paginationSlice';
import { useGlobalLoader } from '../../../utilities/hooks/useGlobalLoader';

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
  const globalLoading = useGlobalLoader();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
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
    size: 'small',
    style: {
      width: '100%',
    },
    rowKey: (record) => record.id,
    rowSelection: isRowSelection
      ? {
          type: 'checkbox',
          ...rowSelection,
        }
      : false,
    onRow: (_record) => ({
      onClick: () => {},
    }),
    loading: isLoading || globalLoading,
    scroll: {
      x: 'max-content',
      // y: 340,
    },

    ...tableStyleProps,
  };

  const paginationProps = {
    size: 'default',
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

  // const newColumns = [...columns];

  return (
    <Table
      {...tableProps}
      columns={columns}
      dataSource={dataSource}
      pagination={showPaging ? { ...paginationProps } : false}
    />
  );
};

export default CustomProductTable;
