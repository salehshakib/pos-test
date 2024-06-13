import { useState } from "react";
import { HolidaysCreate } from "../../../components/Holidays/HolidaysCreate";
import { HolidaysTable } from "../../../components/Holidays/HolidaysTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [];

export const Holidays = () => {
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
      pageTitle="Holidays"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      // handleExport={handleExport}
    >
      <HolidaysCreate />

      <HolidaysTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
