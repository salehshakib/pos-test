import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SaleReturnCreate from "../../../components/SaleReturn/SaleReturnCreate";
import SaleReturnTable from "../../../components/SaleReturn/SaleReturnTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { SALE_RETURN } from "../../../utilities/apiEndpoints/inventory.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Return Reference",
    dataIndex: "referenceNo",
    key: "referenceNo",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Sale Reference",
    dataIndex: "saleReference",
    key: "saleReference",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },

  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Cashier",
    dataIndex: "cashier",
    key: "cashier",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Grand Total",
    dataIndex: "grandTotal",
    key: "grandTotal",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
];

const SaleReturn = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Sale Return"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={SALE_RETURN}
    >
      <SaleReturnCreate />

      <SaleReturnTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default SaleReturn;
