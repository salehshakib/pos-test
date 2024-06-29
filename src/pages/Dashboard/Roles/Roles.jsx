import { useState } from "react";
import { RolesCreate } from "../../../components/Roles/RolesCreate";
import { RolesTable } from "../../../components/Roles/RolesTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { ROLE } from "../../../utilities/apiEndpoints/auth.api";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
];

export const Roles = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Role Permission"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={ROLE}
    >
      <RolesCreate />

      <RolesTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};
