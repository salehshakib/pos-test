import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { DesignationCreate } from "../../../components/Designation/DesignationCreate";
import { DesignationTable } from "../../../components/Designation/DesignationTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { DESIGNATION } from "../../../utilities/apiEndpoints/hrm.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

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
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Designation"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={DESIGNATION}
    >
      <DesignationCreate />

      <DesignationTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Designation;
