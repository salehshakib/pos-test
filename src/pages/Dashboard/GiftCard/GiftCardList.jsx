import { Row } from 'antd';
import { useState } from 'react';

import GiftCardCreate from '../../../components/GiftCard/GiftCardCreate';
import GiftCardTable from '../../../components/GiftCard/GiftCardTable';
import { GiftCardTypeFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { GIFT_CARD } from '../../../utilities/apiEndpoints/offer.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Card No',
    dataIndex: 'cardNo',
    key: 'cardNo',
    align: 'center',
    render: (cardNo) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {cardNo}
      </span>
    ),
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy',
    key: 'createdBy',
    render: (createdBy) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {createdBy}
      </span>
    ),
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (customer) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {customer}
      </span>
    ),
  },

  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {amount}
      </span>
    ),
  },
  {
    title: 'Expense',
    dataIndex: 'expense',
    key: 'expense',
    render: (expense) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {expense}
      </span>
    ),
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    render: (balance) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {balance}
      </span>
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
            status == 1
              ? 'bg-[#DCFCE7] text-[#16A34A]'
              : 'bg-[#FEF2F2] text-[#EF4444]'
          } w-[80px] rounded shadow-md`}
          onClick={() => record?.handleStatusModal(record.id)}
        >
          <span className="w-full px-2 text-xs font-medium">
            {status.toString() === '1' ? 'Active' : 'Inactive'}
          </span>
        </button>
      ) : (
        <div
          className={`p-0 ${
            status == 1
              ? 'bg-[#DCFCE7] text-[#16A34A]'
              : 'bg-[#FEF2F2] text-[#EF4444]'
          } w-[80px] rounded shadow-md`}
        >
          <span className="w-full px-2 text-xs font-medium">
            {status.toString() === '1' ? 'Active' : 'Inactive'}
          </span>
        </div>
      );
    },
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <GiftCardTypeFilter />
    </Row>
  );
};

const GiftCardList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Gift Card"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={GIFT_CARD}
    >
      <GiftCardCreate />

      <GiftCardTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};
export default GiftCardList;
