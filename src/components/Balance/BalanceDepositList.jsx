import { Button, Descriptions } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { useGetAllBalanceDepositQuery } from '../../redux/services/balanceDeposit/balanceDepositApi';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import CustomTable from '../Shared/Table/CustomTable';

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

const BalanceDepositList = ({ data }) => {
  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    params: { ...pagination },
  });

  const { data: depositData, isFetching } = useGetAllBalanceDepositQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = depositData?.meta?.total;

  const dataSource =
    data?.results?.balancedeposit?.map((item) => {
      const { id, deposited_by, amount, deposited_at, deposited_type } =
        item ?? {};

      return {
        id,
        deposited_by,
        amount,
        deposited_at,
        deposited_type,
      };
    }) ?? [];

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Balance Deposit list',
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

export default BalanceDepositList;
