import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PurchaseReturnCreate from "../../../components/PurchaseReturn/PurchaseReturnCreate";
import PurchaseReturnTable from "../../../components/PurchaseReturn/PurchaseReturnTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { PURCHASE_RETURN } from "../../../utilities/apiEndpoints/inventory.api";
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
    title: "Purchase Reference",
    dataIndex: "purchaseReference",
    key: "purchaseReference",
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
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
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

const PurchaseReturn = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Purchase Return"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={PURCHASE_RETURN}
    >
      <PurchaseReturnCreate />

      <PurchaseReturnTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default PurchaseReturn;
