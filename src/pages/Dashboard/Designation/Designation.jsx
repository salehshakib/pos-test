import { useState } from "react";
import { DesignationCreate } from "../../../components/Designation/DesignationCreate";
import { DesignationTable } from "../../../components/Designation/DesignationTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [];

const Designation = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  // const [exportBrand, { isLoading }] = useExportBrandMutation();

  // const handleExport = async (format) => {
  //   const { data, error } = await exportBrand({
  //     data: { format },
  //   });

  //   console.log(data);
  // };

  return (
    <GlobalContainer
      pageTitle="Designation"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      // handleExport={handleExport}
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
