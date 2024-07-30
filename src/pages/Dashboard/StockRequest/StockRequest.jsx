import { useState } from "react";
import StockRequestCreate from "../../../components/StockRequest/StockRequestCreate";
import StockRequestTable from "../../../components/StockRequest/StockRequestTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { STOCK_COUNT } from "../../../utilities/apiEndpoints/inventory.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";
import { useFilterParams } from "../../../utilities/hooks/useParams";

const columns = [
  {
    title: "From Warehouse",
    dataIndex: "fromWarehouse",
    key: "fromWarehouse",
    render: (fromWarehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {fromWarehouse ?? "N/A"}
      </span>
    ),
  },
  {
    title: "To Warehouse",
    dataIndex: "toWarehouse",
    key: "toWarehouse",
    render: (toWarehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {toWarehouse ?? "N/A"}
      </span>
    ),
  },
  {
    title: "Request Quantity",
    dataIndex: "reqQty",
    key: "reqQty",
    align: "center",
    render: (reqQty) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {reqQty ?? "N/A"}
      </span>
    ),
  },
];

const StockRequest = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Stock Request"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={STOCK_COUNT}
    >
      <StockRequestCreate />

      <StockRequestTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default StockRequest;
