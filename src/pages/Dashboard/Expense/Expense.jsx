import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { ExpenseCreate } from "../../../components/Expense/ExpenseCreate";
import ExpenseTable from "../../../components/Expense/ExpenseTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { EXPENSE } from "../../../utilities/apiEndpoints/account.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Reference Id",
    dataIndex: "reference",
    key: "reference",
    align: "center",
    render: (reference) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {reference}
      </span>
    ),
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    align: "center",
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
      </span>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    align: "center",
    render: (category) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {category}
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
    title: "Note",
    dataIndex: "note",
    key: "note",
    align: "center",
    render: (note) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {note}
      </span>
    ),
  },
];

const Expense = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Expense"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={EXPENSE}
    >
      <ExpenseCreate />

      <ExpenseTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Expense;
