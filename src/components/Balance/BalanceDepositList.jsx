import { Button, Descriptions, Modal } from 'antd';
import dayjs from 'dayjs';

import { useGetAllBalanceDepositQuery } from '../../redux/services/balanceDeposit/balanceDepositApi';
import { showCurrency } from '../../utilities/lib/currency';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import CustomPrintTable from '../Shared/Table/CustomPrintTable';
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

const BalanceDepositList = ({
  data,
  printRef,
  currency,
  open,
  setOpen,
  handlePrint,
}) => {
  const { data: depositData, isFetching } = useGetAllBalanceDepositQuery(
    {},
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const dataSource =
    depositData?.results?.balancedeposit?.map((item) => {
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

  return (
    <>
      <div className="space-y-10 my-10 mx-10">
        <Descriptions bordered className="max-w-xl mx-auto">
          <Descriptions.Item label="Total Balance" span={6}>
            {showCurrency(data?.amount ?? 0, currency)}
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
          isLoading={isFetching}
          status={false}
          created_at={false}
          action={false}
          showPaging={false}
        />

        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
          width={1200}
        >
          <Button onClick={handlePrint}>Print</Button>
          <CustomPrintTable data={dataSource} ref={printRef} />
        </Modal>
      </div>
    </>
  );
};

export default BalanceDepositList;
