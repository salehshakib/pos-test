import { Descriptions, Table } from 'antd';
import dayjs from 'dayjs';

import { useGetAllBalanceDepositQuery } from '../../redux/services/balanceDeposit/balanceDepositApi';
import { useGetAllBalanceWithdrawQuery } from '../../redux/services/balanceWithdraw/balanceWithdrawApi';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';

const columns = [
  {
    title: 'Transaction By',
    dataIndex: 'transaction_by',
    key: 'transaction_by',

    render: (transaction_by) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {transaction_by}
      </span>
    ),
  },
  {
    title: 'Transaction Type',
    dataIndex: 'transaction_type',
    key: 'transaction_type',
    render: (transaction_type) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {transaction_type}
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
    title: 'Transaction At',
    dataIndex: 'transaction_at',
    key: 'transaction_at',
    render: (transaction_at) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {dayjs(transaction_at).format('DD-MM-YYYY')}
      </span>
    ),
  },
];

const AllTransactionList = ({ data }) => {
  const { data: withdrawData, isFetching } = useGetAllBalanceWithdrawQuery(
    {},
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const { data: depositData, isFetching: isDepositFetching } =
    useGetAllBalanceDepositQuery(
      {},
      {
        skip: !useUrlIndexPermission(),
      }
    );

  const withdrawDataSource =
    withdrawData?.results?.balancewithdrawal?.map((item) => {
      const { id, withdrawal_by, amount, withdrawal_at, withdrawal_type } =
        item ?? {};

      return {
        id,
        transaction_by: withdrawal_by,
        amount,
        transaction_at: withdrawal_at,
        transaction_type: withdrawal_type,
        payment_type: 'Withdraw',
      };
    }) ?? [];

  const depositDataSource =
    depositData?.results?.balancedeposit?.map((item) => {
      const { id, deposited_by, amount, deposited_at, deposited_type } =
        item ?? {};

      return {
        id,
        transaction_by: deposited_by,
        amount,
        transaction_at: deposited_at,
        transaction_type: deposited_type,
        payment_type: 'Deposit',
      };
    }) ?? [];

  const combinedDataSource = [...withdrawDataSource, ...depositDataSource];

  return (
    <>
      <div className="space-y-10 my-10 mx-10">
        <Descriptions bordered className="max-w-xl mx-auto">
          <Descriptions.Item label="Total Balance" span={6}>
            {data?.amount}
          </Descriptions.Item>
          <Descriptions.Item label="Total Deposit" span={6}>
            {dayjs(data?.last_deposit).format('DD-MM-YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Total Withdrawal" span={6}>
            {dayjs(data?.last_withdrawal).format('DD-MM-YYYY')}
          </Descriptions.Item>
        </Descriptions>
        <Table
          columns={columns}
          dataSource={combinedDataSource}
          loading={isFetching || isDepositFetching}
          pagination={false}
        />
      </div>
    </>
  );
};

export default AllTransactionList;
