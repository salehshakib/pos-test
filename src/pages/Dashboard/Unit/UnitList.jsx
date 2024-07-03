import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UnitCreate from "../../../components/Unit/UnitCreate";
import UnitTable from "../../../components/Unit/UnitTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { UNIT } from "../../../utilities/apiEndpoints/helper.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    align: "center",
    render: (code) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {code}
      </span>
    ),
  },

  {
    title: "Base Unit",
    dataIndex: "baseUnit",
    key: "baseUnit",
    align: "center",
    render: (baseUnit) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {baseUnit ?? "N/A"}
      </span>
    ),
  },
  {
    title: "For",
    dataIndex: "type",
    key: "type",
    align: "center",
    render: (type) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {type}
      </span>
    ),
  },
  {
    title: "Operator",
    dataIndex: "operator",
    key: "operator",
    align: "center",
    render: (operator) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {operator ?? "N/A"}
      </span>
    ),
  },
  {
    title: "Operator Value",
    dataIndex: "operatorValue",
    key: "operatorValue",
    align: "center",
    render: (operatorValue) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {operatorValue ?? "N/A"}
      </span>
    ),
  },
];

const UnitList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Unit"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={UNIT}
    >
      <UnitCreate />

      <UnitTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default UnitList;
