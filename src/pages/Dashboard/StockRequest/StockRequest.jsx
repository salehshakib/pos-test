import { useState } from 'react';

import StockRequestCreate from '../../../components/StockRequest/StockRequestCreate';
import StockRequestTable from '../../../components/StockRequest/StockRequestTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { STOCK_REQUEST } from '../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'From Warehouse',
    dataIndex: 'fromWarehouse',
    key: 'fromWarehouse',
    render: (fromWarehouse) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {fromWarehouse ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'To Warehouse',
    dataIndex: 'toWarehouse',
    key: 'toWarehouse',
    render: (toWarehouse) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {toWarehouse ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Request Quantity',
    dataIndex: 'reqQty',
    key: 'reqQty',
    align: 'center',
    width: 150,
    render: (reqQty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {reqQty ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Transfer Status',
    dataIndex: 'transfer_status',
    key: 'transfer_status',
    width: 125,
    align: 'center',
    render: (status, record) => {
      return record?.handleStatusModal ? (
        <div className="flex justify-center items-center w-full">
          <button
            className={`p-0 ${
              status?.toString() === 'Pending'
                ? 'bg-[#FEF2F2] text-[#EF4444]'
                : 'bg-[#DCFCE7] text-[#16A34A]'
            } w-[80px] rounded shadow-md`}
          >
            <span className="w-full px-2 text-xs font-medium text-center">
              {status}
            </span>
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <div
            className={`p-0 ${
              status?.toString() === 'Pending'
                ? 'bg-[#FEF2F2] text-[#EF4444]'
                : 'bg-[#DCFCE7] text-[#16A34A]'
            } w-[80px] rounded shadow-md`}
          >
            <span className="w-full px-2 text-xs font-medium text-center">
              {status}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Request Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    align: 'center',
    render: (status, record) => {
      return record?.handleStatusModal ? (
        <div className="flex justify-center items-center w-full">
          <button
            className={`p-0 ${
              status?.toString() === 'Pending'
                ? 'bg-[#FEF2F2] text-[#EF4444]'
                : 'bg-[#DCFCE7] text-[#16A34A]'
            } w-[80px] rounded shadow-md`}
          >
            <span className="w-full px-2 text-xs font-medium">{status}</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <div
            className={`p-0 ${
              status?.toString() === 'Pending'
                ? 'bg-[#FEF2F2] text-[#EF4444]'
                : 'bg-[#DCFCE7] text-[#16A34A]'
            } w-[80px] rounded shadow-md`}
          >
            <span className="w-full px-2 text-xs font-medium">{status}</span>
          </div>
        </div>
      );
    },
  },
];

const StockRequest = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Stock Request"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={STOCK_REQUEST}
    >
      <StockRequestCreate />

      <StockRequestTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default StockRequest;
