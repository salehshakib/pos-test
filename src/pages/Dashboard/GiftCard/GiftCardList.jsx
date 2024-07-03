import { useState } from "react";
import GiftCardCreate from "../../../components/GiftCard/GiftCardCreate";
import GiftCardTable from "../../../components/GiftCard/GiftCardTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { GIFT_CARD } from "../../../utilities/apiEndpoints/offer.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    align: "center",
    render: (customer) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {customer}
      </span>
    ),
  },
  {
    title: "Card No",
    dataIndex: "cardNo",
    key: "cardNo",
    align: "center",
    render: (cardNo) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {cardNo}
      </span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: "Expense",
    dataIndex: "expense",
    key: "expense",
    align: "center",
    render: (expense) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {expense}
      </span>
    ),
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    align: "center",
    render: (balance) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {balance}
      </span>
    ),
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    align: "center",
    render: (createdBy) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {createdBy}
      </span>
    ),
  },
];

const GiftCardList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Gift Card"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={GIFT_CARD}
    >
      <GiftCardCreate />

      <GiftCardTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
export default GiftCardList;
