import { useState } from "react";
import { HolidaysCreate } from "../../../components/Holidays/HolidaysCreate";
import { HolidaysTable } from "../../../components/Holidays/HolidaysTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { HOLIDAY } from "../../../utilities/apiEndpoints/hrm.api";

const columns = [];

export const Holidays = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Holidays"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={HOLIDAY}
    >
      <HolidaysCreate />

      <HolidaysTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
