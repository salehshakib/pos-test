import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import DepartmentCreate from "../../../components/Department/DepartmentCreate";
import DepartmentTable from "../../../components/Department/DepartmentTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { DEPARTMENT } from "../../../utilities/apiEndpoints/hrm.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
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

const Department = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Department"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={DEPARTMENT}
    >
      <DepartmentCreate />

      <DepartmentTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Department;
