import { useState } from 'react';

import PettyCashRequestTable from '../../../components/PettyCashRequest/PettyCashReqeustTable';
import PettyCashRequestCreate from '../../../components/PettyCashRequest/PettyCashRequestCreate';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { PETTYCASH_REQUEST } from '../../../utilities/apiEndpoints/account.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    render: (warehouse) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {warehouse}
      </span>
    ),
  },
  {
    title: 'Requested By',
    dataIndex: 'requested_by',
    key: 'requested_by',
    render: (requested_by) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {requested_by}
      </span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => (
      <span className="text-dark text-xs font-medium md:text-sm">{amount}</span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    align: 'center',
    render: (status, record) => {
      return record?.handleStatusModal ? (
        <button
          className={`p-0 ${
            status?.toString() === 'Requested'
              ? 'bg-[#2ea5d8] text-[#ebebeb]'
              : 'bg-[#DCFCE7] text-[#16A34A]'
          } w-[80px] rounded shadow-md`}
          onClick={() => record?.handleStatusModal(record.id)}
        >
          <span className="w-full px-2 text-xs font-medium">{status}</span>
        </button>
      ) : (
        <div
          className={`p-0 ${
            status?.toString() === 'Accepted'
              ? 'bg-[#DCFCE7] text-[#16A34A]'
              : ' bg-[#FEF2F2] text-[#EF4444]'
          } w-[80px] rounded shadow-md`}
        >
          <span className="w-full px-2 text-xs font-medium">{status}</span>
        </div>
      );
    },
  },
];

const PettyCashRequest = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Balance Deposit"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={PETTYCASH_REQUEST}
    >
      <PettyCashRequestCreate />

      <PettyCashRequestTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default PettyCashRequest;
