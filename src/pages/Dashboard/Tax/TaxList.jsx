import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TaxCreate from "../../../components/Tax/TaxCreate";
import TaxTable from "../../../components/Tax/TaxTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { TAX } from "../../../utilities/apiEndpoints/helper.api";
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
    title: "Rate (%)",
    dataIndex: "rate",
    key: "rate",
    align: "center",
    render: (rate) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {rate}
      </span>
    ),
  },
];

const TaxList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Tax"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={TAX}
    >
      <TaxCreate />

      <TaxTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default TaxList;
