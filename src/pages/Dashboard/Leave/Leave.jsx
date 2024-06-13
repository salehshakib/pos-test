import { useState } from "react";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { LeaveCreate } from "../../../components/Leave/LeaveCreate";
import { LeaveTable } from "../../../components/Leave/LeaveTable";

const columns = [];

export const Leave = () => {
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
      pageTitle="Leave"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      // handleExport={handleExport}
    >
      <LeaveCreate />

      <LeaveTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};
