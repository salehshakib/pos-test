import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import ExpenseCategoryCreate from "../../../components/ExpenseCategory/ExpenseCategoryCreate";
import ExpenseCategoryTable from "../../../components/ExpenseCategory/ExpenseCategoryTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { EXPENSE_CATEGORY } from "../../../utilities/apiEndpoints/account.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
];

const ExpenseCategory = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Expense Category"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={EXPENSE_CATEGORY}
    >
      <ExpenseCategoryCreate />

      <ExpenseCategoryTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default ExpenseCategory;
