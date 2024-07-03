import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HolidaysCreate } from "../../../components/Holidays/HolidaysCreate";
import { HolidaysTable } from "../../../components/Holidays/HolidaysTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { HOLIDAY } from "../../../utilities/apiEndpoints/hrm.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [];

export const Holidays = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Holidays"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={HOLIDAY}
    >
      <HolidaysCreate />

      <HolidaysTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
