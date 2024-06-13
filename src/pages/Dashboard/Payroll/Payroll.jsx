import { useState } from "react";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { PayrollCreate } from "../../../components/Payroll/PayrollCreate";
import { PayrollTable } from "../../../components/Payroll/PayrollTable";

const columns = [];

export const Payroll = () => {
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
      pageTitle="Payroll"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      // handleExport={handleExport}
    >
      <PayrollCreate />

      <PayrollTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};
