import { Button, Tabs } from 'antd';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import AllTransactionList from '../../../components/Balance/AllTransactionList';
import BalanceDepositList from '../../../components/Balance/BalanceDepositList';
import BalanceWithdrawList from '../../../components/Balance/BalanceWithdrawList';
import { FilterDateRange } from '../../../components/ReusableComponent/FilterDateRange';
import { useGetAllBalanceQuery } from '../../../redux/services/balance/balanceApi';
import { useCurrency } from '../../../redux/services/pos/posSlice';

const Balance = () => {
  const { data } = useGetAllBalanceQuery({});
  const currency = useSelector(useCurrency);
  const [open, setOpen] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [key, setKey] = useState('1');

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrintAction = () => {
    if (key === '1') {
      setOpen(true);
    } else if (key === '2') {
      setOpenDeposit(true);
    } else if (key === '3') {
      setOpenWithdraw(true);
    }
  };

  const items = [
    {
      key: '1',
      label: 'All',
      children: (
        <AllTransactionList
          data={data}
          currency={currency}
          printRef={printRef}
          open={open}
          setOpen={setOpen}
          handlePrint={handlePrint}
        />
      ),
    },
    {
      key: '2',
      label: 'Balance Deposit',
      children: (
        <BalanceDepositList
          data={data}
          currency={currency}
          printRef={printRef}
          open={openDeposit}
          setOpen={setOpenDeposit}
          handlePrint={handlePrint}
        />
      ),
    },
    {
      key: '3',
      label: 'Balance Withdrawal',
      children: (
        <BalanceWithdrawList
          data={data}
          currency={currency}
          printRef={printRef}
          open={openWithdraw}
          setOpen={setOpenWithdraw}
          handlePrint={handlePrint}
        />
      ),
    },
  ];

  return (
    <section className="p-10">
      <section>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={(key) => {
            setKey(key);
          }}
          size="middle"
          tabBarExtraContent={
            <div className="flex items-center gap-4">
              <FilterDateRange />
              <Button
                type="primary"
                className="mb-5 px-12"
                onClick={handlePrintAction}
              >
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
