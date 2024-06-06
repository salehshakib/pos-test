import { useState } from "react";
import ExpenseCategoryCreate from "../../../components/ExpenseCategory/ExpenseCategoryCreate";
import ExpenseCategoryTable from "../../../components/ExpenseCategory/ExpenseCategoryTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

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
  return (
    <GlobalContainer
      pageTitle="Expense Category"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <ExpenseCategoryCreate />

      <ExpenseCategoryTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default ExpenseCategory;
