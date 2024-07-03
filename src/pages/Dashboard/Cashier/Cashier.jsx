import { useState } from "react";
import CashierCreate from "../../../components/Cashier/CashierCreate";
import CashierTable from "../../../components/Cashier/CashierTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { CASHIER } from "../../../utilities/apiEndpoints/people.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    fixed: "left",

    render: ({ name, email }) => (
      <div className="flex flex-col cursor-pointer ">
        <span className="text-xs md:text-sm text-dark dark:text-white87 font-medium">
          {name}
        </span>
        <span className="text-xs dark:text-white60 primary-text">{email}</span>
      </div>
    ),
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
    key: "companyName",
    render: (companyName) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {companyName}
      </span>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    render: (phone) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {phone}
      </span>
    ),
  },
  {
    title: "Vat Number",
    dataIndex: "vatNumber",
    key: "vatNumber",
    align: "center",
    render: (vatNumber) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {vatNumber}
      </span>
    ),
  },
];

const Cashier = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();
  return (
    <GlobalContainer
      pageTitle="Cashier"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={CASHIER}
    >
      <CashierCreate />

      <CashierTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Cashier;
