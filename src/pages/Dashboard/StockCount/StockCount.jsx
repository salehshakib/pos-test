import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StockCountCreate from "../../../components/StockCount/StockCountCreate";
import StockCountTable from "../../../components/StockCount/StockCountTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { STOCK_COUNT } from "../../../utilities/apiEndpoints/inventory.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
    align: "center",
    render: (reference) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {reference}
      </span>
    ),
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    align: "center",
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
      </span>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    align: "center",
    render: (category) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {category}
      </span>
    ),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    align: "center",
    render: (brand) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {brand}
      </span>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "center",
    render: (type) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {type}
      </span>
    ),
  },
];

const StockCount = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Stock Count"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={STOCK_COUNT}
    >
      <StockCountCreate />

      <StockCountTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default StockCount;
