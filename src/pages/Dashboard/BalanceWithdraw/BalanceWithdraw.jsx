import dayjs from 'dayjs';
import { useState } from 'react';

import BalanceWithdrawCreate from '../../../components/BalanceWithdraw/BalanceWithdrawCreate';
import BalanceWithdrawTable from '../../../components/BalanceWithdraw/BalanceWithdrawTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { BALANCE_WITHDRAWAL } from '../../../utilities/apiEndpoints/account.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Withdrawal By',
    dataIndex: 'withdrawal_by',
    key: 'withdrawal_by',
    render: (withdrawal_by) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {withdrawal_by}
      </span>
    ),
  },
  {
    title: 'Withdrawal Type',
    dataIndex: 'withdrawal_type',
    key: 'withdrawal_type',
    render: (withdrawal_type) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {withdrawal_type}
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
    title: 'Withdrawal At',
    dataIndex: 'withdrawal_at',
    key: 'withdrawal_at',
    render: (withdrawal_at) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {dayjs(withdrawal_at).format('DD-MM-YYYY')}
      </span>
    ),
  },
];

const BalanceWithdraw = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Balance Withdrawal"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={BALANCE_WITHDRAWAL}
    >
      <BalanceWithdrawCreate />

      <BalanceWithdrawTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default BalanceWithdraw;
