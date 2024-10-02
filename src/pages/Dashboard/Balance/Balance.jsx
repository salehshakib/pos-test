import { Button, Tabs } from 'antd';

import AllTransactionList from '../../../components/Balance/AllTransactionList';
import BalanceDepositList from '../../../components/Balance/BalanceDepositList';
import BalanceWithdrawList from '../../../components/Balance/BalanceWithdrawList';
import { FilterDateRange } from '../../../components/ReusableComponent/FilterDateRange';
import { useGetAllBalanceQuery } from '../../../redux/services/balance/balanceApi';

const Balance = () => {
  const { data } = useGetAllBalanceQuery({});

  const items = [
    {
      key: '1',
      label: 'All',
      children: <AllTransactionList data={data} />,
    },
    {
      key: '2',
      label: 'Balance Deposit',
      children: <BalanceDepositList data={data} />,
    },
    {
      key: '3',
      label: 'Balance Withdrawal',
      children: <BalanceWithdrawList data={data} />,
    },
  ];

  return (
    <section className="p-10">
      <section>
        <Tabs
          defaultActiveKey="1"
          items={items}
          size="middle"
          tabBarExtraContent={
            <div className="flex items-center gap-4">
              <FilterDateRange />
              <Button type="primary" className="mb-5 px-12">
                Print
              </Button>
            </div>
          }
        />
      </section>
    </section>
  );
};

export default Balance;
