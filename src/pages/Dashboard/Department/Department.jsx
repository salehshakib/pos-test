import { useState } from "react";
import DepartmentCreate from "../../../components/Department/DepartmentCreate";
import DepartmentTable from "../../../components/Department/DepartmentTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { DEPARTMENT } from "../../../utilities/apiEndpoints/hrm.api";

const columns = [
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
];

const Department = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Department"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={DEPARTMENT}
    >
      <DepartmentCreate />

      <DepartmentTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Department;
