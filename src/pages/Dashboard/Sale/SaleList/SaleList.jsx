import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SaleCreate } from "../../../../components/Sale/SaleCreate";
import { SaleTable } from "../../../../components/Sale/SaleTable";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../../redux/services/paramSlice/paramSlice";
import { SALE } from "../../../../utilities/apiEndpoints/inventory.api";
import { useCustomDebounce } from "../../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    render: (date) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {date}
      </span>
    ),
  },
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
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (customer) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {customer}
      </span>
    ),
  },
  {
    title: "Cashier",
    dataIndex: "cashier",
    key: "cashier",
    render: (biller) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {biller}
      </span>
    ),
  },
  {
    title: "Sale Status",
    dataIndex: "saleStatus",
    key: "saleStatus",
    render: (saleStatus) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {saleStatus}
      </span>
    ),
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    render: (paymentStatus) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {paymentStatus}
      </span>
    ),
  },
  {
    title: "Grand Total",
    dataIndex: "grandTotal",
    key: "grandTotal",
    render: (grandTotal) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {grandTotal}
      </span>
    ),
  },
  {
    title: "Paid",
    dataIndex: "paid",
    key: "paid",
    render: (paid) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {paid}
      </span>
    ),
  },
  {
    title: "Due",
    dataIndex: "due",
    key: "due",
    render: (due) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {due}
      </span>
    ),
  },
];

const SaleList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Sale"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={SALE}
    >
      <SaleCreate />

      <SaleTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default SaleList;
