import { useState } from "react";
import { PayrollCreate } from "../../../components/Payroll/PayrollCreate";
import { PayrollTable } from "../../../components/Payroll/PayrollTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { PAYROLL } from "../../../utilities/apiEndpoints/hrm.api";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name, record) => (
      <div className="flex flex-col cursor-pointer ">
        <span className="text-xs md:text-sm text-dark dark:text-white87 font-medium">
          {name}
        </span>
        <span className="text-xs dark:text-white60 primary-text">
          {record?.email}
        </span>
      </div>
    ),
  },
  {
    //department
    title: "Department",
    dataIndex: "department",
    key: "department",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Payment Type",
    dataIndex: "paymentType",
    key: "paymentType",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Bonus",
    dataIndex: "bonus",
    key: "bonus",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Loan",
    dataIndex: "loan",
    key: "loan",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
];

export const Payroll = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Payroll"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={PAYROLL}
    >
      <PayrollCreate />

      <PayrollTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};
