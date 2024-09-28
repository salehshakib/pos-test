import { Dropdown, Table } from 'antd';
import { useState } from 'react';
import { FaFileCsv, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { IoIosLock } from 'react-icons/io';
import {
  MdDelete,
  MdEditDocument,
  MdEditSquare,
  MdFileDownload,
} from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';

import { useFormatDate } from '../../../utilities/hooks/useFormatDate';
import { useGlobalLoader } from '../../../utilities/hooks/useGlobalLoader';
import { formatDate } from '../../../utilities/lib/dateFormat';
import { usePermission } from '../../../utilities/lib/getPermission';

const getDownloadItems = (record) =>
  [
    {
      key: 'pdf',
      icon: <FaFilePdf size={20} />,
      label: <div className="flex items-center justify-start gap-3">PDF</div>,
      onClick: () => record?.handleFileDownload(record?.id, 'pdf'),
    },
    {
      key: 'xlsx',
      icon: <FaFileExcel size={20} />,
      label: <div className="flex items-center justify-start gap-3">Excel</div>,
      onClick: () => record?.handleFileDownload(record?.id, 'xlsx'),
    },
    {
      key: 'csv',
      icon: <FaFileCsv size={20} />,
      label: <div className="flex items-center justify-start gap-3">CSV</div>,
      onClick: () => record?.handleFileDownload(record?.id, 'csv'),
      // disabled: !record.handleDeleteModal,
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
  selectedRows,
  changeSelectedRows,
  isLoading,
  showPaging = true,
  tableStyleProps = {},
  status = true,
  created_at = true,
  action = true,
  title,
  hideOnSinglePage = false,
  expandable,
}) => {
  const globalLoading = useGlobalLoader();
  const route = window.location.pathname.substring(1);

  const rowSelection = {
    selectedRowKeys: selectedRows?.map((item) => item?.id),
    onChange: (selectedRowKeys, selectedRows) => {
      changeSelectedRows
        ? changeSelectedRows(selectedRows)
        : setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (newPage) => {
    updatePage ? updatePage(newPage) : setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    updatePageSize ? updatePageSize(newPageSize) : setPageSize(newPageSize);
  };

  const isDetailsPermitted = usePermission(route, 'show');
  const isEditPermitted = usePermission(route, 'update');
  const isDeletePermitted = usePermission(route, 'delete');
  const isStatusPermitted = usePermission(route, 'status');

  const getMenuItems = (record) =>
    [
      isEditPermitted && {
        key: 'edit',
        icon: <MdEditSquare size={20} />,
        label: (
          <div className="flex items-center justify-start gap-3">Edit</div>
        ),
        onClick: () => record?.handleEdit(record?.id),
        disabled: !record.handleEdit,
      },
      record?.handleEditStockAndPrice &&
        isEditPermitted && {
          key: 'editStockAndPrice',
          icon: <MdEditDocument size={20} />,
          label: (
            <div className="flex items-center justify-start gap-3">
              Edit Stock & Price
            </div>
          ),
          onClick: () => record?.handleEditStockAndPrice(record?.id),
          disabled: !record.handleEdit,
        },
      record?.handleChangePermission && {
        key: 'permission',
        icon: <IoIosLock size={20} />,
        label: (
          <div className="flex items-center justify-start gap-3">
            Set Permissions
          </div>
        ),
        onClick: () => record?.handleChangePermission(record?.id),
      },
      isDeletePermitted && {
        key: 'delete',
        icon: <MdDelete size={20} />,
        label: (
          <div className="flex items-center justify-start gap-3">Delete</div>
        ),
        onClick: () => record?.handleDeleteModal(record?.id),
        disabled: !record.handleDeleteModal,
      },
    ].filter(Boolean);

  const tableProps = {
    loading: isLoading || globalLoading,
    size: 'small',
    style: {
      width: '100%',
      ...tableStyleProps?.style,
    },
    rowKey: (record) => record?.id,
    rowSelection: isRowSelection
      ? {
          type: 'checkbox',
          ...rowSelection,
        }
      : false,
    onRow: (_record) => ({
      onClick: () => {},
    }),
    scroll: {
      x: 'max-content',
      ...tableStyleProps?.scroll,
    },

    ...tableStyleProps,
  };

  if (title) {
    tableProps.title = () => (
      <span className="text-[14px] text-lg font-semibold underline">
        {title}
      </span>
    );
  }

  if (expandable) {
    tableProps.expandable = expandable;
  }

  // if(pagination) {

  const paginationProps = {
    size: 'default',
    total: total,
    defaultCurrent: 1,
    current: pagination?.page ?? page,
    onChange: (page) => {
      handlePageChange(page);
    },
    showSizeChanger: true,
    hideOnSinglePage: hideOnSinglePage,
    defaultPageSize: pagination?.perPage ?? pageSize,
    onShowSizeChange: (current, size) => {
      handlePageSizeChange(size);
    },
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };

  const idColumn = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // fixed: 'left',
      align: 'center',
      width: 60,
      render: (id) => (
        <span className="text-dark   text-xs font-medium md:text-sm">{id}</span>
      ),
    },
  ];

  const baseColumns = [...idColumn, ...columns];

  const statusColumn = {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    align: 'center',
    render: (status, record) => {
      return record?.handleStatusModal ? (
        <button
          className={`p-0 ${
            status?.toString() === '1'
              ? 'bg-[#DCFCE7] text-[#16A34A]'
              : 'bg-[#FEF2F2] text-[#EF4444]'
          } w-[80px] rounded shadow-md`}
          onClick={() => record?.handleStatusModal(record.id)}
        >
          <span className="w-full px-2 text-xs font-medium">
            {status?.toString() === '1' ? 'Active' : 'Inactive'}
          </span>
        </button>
      ) : (
        <div
          className={`p-0 ${
            status?.toString() === '1'
              ? 'bg-[#DCFCE7] text-[#16A34A]'
              : 'bg-[#FEF2F2] text-[#EF4444]'
          } w-[80px] rounded shadow-md`}
        >
          <span className="w-full px-2 text-xs font-medium">
            {status?.toString() === '1' ? 'Active' : 'Inactive'}
          </span>
        </div>
      );
    },
  };

  const format = useFormatDate();

  const { pathname } = useLocation();

  const timeColumns = {
    //created_at
    title:
      pathname.includes('generator/invoice') ||
      pathname.includes('generator/quotation') ||
      pathname.includes('purchase-return') ||
      pathname.includes('payroll')
        ? 'Date'
        : 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    align: 'center',
    width: '100px',
    render: (created_at) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {formatDate(created_at, format)}
      </span>
    ),
  };

  const actionColumn = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: '80px',
    fixed: 'right',
    render: (props, record) => {
      if (record?.handleDetailsModal && isDetailsPermitted) {
        // if (record?.handleDetailsModal) {
        return (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => record?.handleDetailsModal(record?.id)}
              className="primary-bg rounded-xl p-1 text-white duration-300 hover:scale-110"
            >
              <TbListDetails className="text-lg md:text-xl" />
            </button>
            {(record?.handleEdit || record?.handleDeleteModal) && (
              <Dropdown
                menu={{
                  items: getMenuItems(record),
                }}
                overlayStyle={{
                  width: 'max-content',
                }}
                placement="bottom"
                trigger={['click']}
                autoAdjustOverflow
                arrow={{ pointAtCenter: true }}
              >
                <button className="primary-bg rounded-xl p-1 text-white duration-300 hover:scale-110">
                  <FiMoreHorizontal className="text-lg md:text-xl" />
                </button>
              </Dropdown>
            )}

            {record?.handleFileDownload && (
              <Dropdown
                menu={{
                  items: getDownloadItems(record),
                }}
                overlayStyle={{
                  width: 'max-content',
                }}
                placement="bottom"
                trigger={['click']}
                autoAdjustOverflow
                arrow={{ pointAtCenter: true }}
              >
                <button className="primary-bg rounded-xl p-1 text-white duration-300 hover:scale-110">
                  <MdFileDownload className="text-lg md:text-xl" />
                </button>
              </Dropdown>
            )}
          </div>
        );
      } else {
        return (
          <div className="flex items-center justify-center gap-2">
            {record?.handleEdit && isEditPermitted && (
              <button
                onClick={() => record?.handleEdit(record?.id)}
                className="primary-bg rounded-xl p-1 text-white duration-300 hover:scale-110"
              >
                <MdEditSquare className="text-lg md:text-xl" />
              </button>
            )}

            {record?.handleFileDownload && (
              <Dropdown
                menu={{
                  items: getDownloadItems(record),
                }}
                overlayStyle={{
                  width: 'max-content',
                }}
                placement="bottom"
                trigger={['click']}
                autoAdjustOverflow
                arrow={{ pointAtCenter: true }}
              >
                <button className="primary-bg rounded-xl p-1 text-white duration-300 hover:scale-110">
                  <MdFileDownload className="text-lg md:text-xl" />
                </button>
              </Dropdown>
            )}
            {/* {record?.handleFileDownload && (
              <button
                onClick={() => record?.handleFileDownload(record?.id)}
                className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
              >
                <MdFileDownload className="text-lg md:text-xl" />
              </button>
            )}
            {record?.handleFileDownload && (
              <button
                onClick={() => record?.handleFileDownload(record?.id)}
                className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
              >
                <MdFileDownload className="text-lg md:text-xl" />
              </button>
            )} */}

            {record?.handleDeleteModal && isDeletePermitted && (
              <button
                onClick={() => record?.handleDeleteModal(record?.id)}
                className="primary-bg rounded-xl p-1 text-white duration-300 hover:scale-110"
              >
                <MdDelete className="text-lg md:text-xl" />
              </button>
            )}
          </div>
        );
      }
    },
  };

  const newColumns = [...baseColumns];

  if (status && isStatusPermitted) {
    newColumns.splice(newColumns.length, 0, statusColumn);
  }

  if (created_at) {
    newColumns.splice(newColumns.length, 0, timeColumns);
  }

  if (action) {
    newColumns.splice(newColumns.length, 0, actionColumn);
  }

  return (
    <Table
      {...tableProps}
      pagination={showPaging ? { ...paginationProps } : false}
      columns={newColumns}
      dataSource={dataSource}
      expandable={{
        ...expandable,
      }}
    />
  );
};

export default CustomTable;
