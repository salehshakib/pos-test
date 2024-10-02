import { Button, Descriptions } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { useGetAllBalanceWithdrawQuery } from '../../redux/services/balanceWithdraw/balanceWithdrawApi';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import CustomTable from '../Shared/Table/CustomTable';

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

const BalanceWithdrawList = ({ data }) => {
  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    params: { ...pagination },
  });

  const { data: withdrawData, isFetching } = useGetAllBalanceWithdrawQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = withdrawData?.meta?.total;

  const dataSource =
    withdrawData?.results?.balancewithdrawal?.map((item) => {
      const { id, withdrawal_by, amount, withdrawal_at, withdrawal_type } =
        item ?? {};

      return {
        id,
        withdrawal_by,
        amount,
        withdrawal_at,
        withdrawal_type,
      };
    }) ?? [];

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Balance Withdraw List',
  });

  return (
    <>
      <div className="flex justify-end mb-10">
        <Button
          key={'print'}
          type="primary"
          onClick={handlePrint}
          className="px-12 py-4"
        >
          Print
        </Button>
      </div>

      <div className="space-y-10 my-10 mx-10" ref={printRef}>
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

        <CustomTable
          columns={columns}
          dataSource={dataSource}
          total={total}
          pagination={pagination}
          updatePage={updatePage}
          updatePageSize={updatePageSize}
          isLoading={isFetching}
          status={false}
          created_at={false}
          action={false}
        />
      </div>
    </>
  );
};

export default BalanceWithdrawList;
