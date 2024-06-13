import { useState } from "react";
import DepartmentCreate from "../../../components/Department/DepartmentCreate";
import DepartmentTable from "../../../components/Department/DepartmentTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    //department
    title: "Department",
    dataIndex: "department",
    key: "department",
    // align: "center",
    render: (department) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {department}
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
