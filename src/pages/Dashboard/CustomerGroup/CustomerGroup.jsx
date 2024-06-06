import { useState } from "react";
import CustomerGroupCreate from "../../../components/CustomerGroup/CustomerGroupCreate";
import CustomerGroupTable from "../../../components/CustomerGroup/CustomerGroupTable";
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
  {
    title: "Percentage (%)",
    dataIndex: "percentage",
    key: "percentage",
    align: "center",
    render: (percentage) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {percentage}
      </span>
    ),
  },
];

const CustomerGroup = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <GlobalContainer
      pageTitle="Customer Group"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CustomerGroupCreate />

      <CustomerGroupTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default CustomerGroup;
