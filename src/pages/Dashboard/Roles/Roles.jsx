import { useState } from "react";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { RolesCreate } from "../../../components/Roles/RolesCreate";
import { RolesTable } from "../../../components/Roles/RolesTable";

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
  //   {
  //     title: "Department",
  //     dataIndex: "department",
  //     key: "department",
  //     render: (department) => (
  //       <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //         {department}
  //       </span>
  //     ),
  //   },
];

export const Roles = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  // const [exportBrand, { isLoading }] = useExportBrandMutation();

  // const handleExport = async (format) => {
  //   const { data, error } = await exportBrand({
  //     data: { format },
  //   });

  //   //console.log(data);
  // };

  return (
    <GlobalContainer
      pageTitle="Roles"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      // handleExport={handleExport}
    >
      <RolesCreate />

      <RolesTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};
