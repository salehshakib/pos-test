import { useState } from "react";
import { DesignationCreate } from "../../../components/Designation/DesignationCreate";
import { DesignationTable } from "../../../components/Designation/DesignationTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { DESIGNATION } from "../../../utilities/apiEndpoints/hrm.api";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
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

const Designation = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Designation"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={DESIGNATION}
    >
      <DesignationCreate />

      <DesignationTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Designation;
