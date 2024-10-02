import dayjs from 'dayjs';
import { useState } from 'react';

import BalanceDepositCreate from '../../../components/BalanceDeposit/BalanceDepositCreate';
import BalanceDepositTable from '../../../components/BalanceDeposit/BalanceDepositTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { BALANCE_DEPOSIT } from '../../../utilities/apiEndpoints/account.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Deposited By',
    dataIndex: 'deposited_by',
    key: 'deposited_by',
    render: (deposited_by) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {deposited_by}
      </span>
    ),
  },
  {
    title: 'Deposited Type',
    dataIndex: 'deposited_type',
    key: 'deposited_type',
    render: (deposited_type) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {deposited_type}
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
    title: 'Deposited At',
    dataIndex: 'deposited_at',
    key: 'deposited_at',
    render: (deposited_at) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {dayjs(deposited_at).format('DD-MM-YYYY')}
      </span>
    ),
  },
];

const BalanceDeposit = () => {
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
      api={BALANCE_DEPOSIT}
    >
      <BalanceDepositCreate />

      <BalanceDepositTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default BalanceDeposit;
