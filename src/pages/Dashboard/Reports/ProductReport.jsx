import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductReportTable } from "../../../components/Report/ProductReportTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render: (product) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {product}
      </span>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {category}
      </span>
    ),
  },
  {
    title: "Purchased Amount",
    dataIndex: "purchasedAmount",
    key: "purchasedAmount",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: "Purchased Qty",
    dataIndex: "purchasedQty",
    key: "purchasedQty",
    render: (qty) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {qty}
      </span>
    ),
  },
  {
    title: "Sold Amount",
    dataIndex: "soldAmount",
    key: "soldAmount",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: "Sold Qty",
    dataIndex: "soldQty",
    key: "soldQty",
    render: (qty) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {qty}
      </span>
    ),
  },
  {
    title: "Returned Amount",
    dataIndex: "returnedAmount",
    key: "returnedAmount",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: "Returned Qty",
    dataIndex: "returnedQty",
    key: "returnedQty",
    render: (qty) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {qty}
      </span>
    ),
  },
  {
    title: "Purchase Returned Amount",
    dataIndex: "purchaseReturnedAmount",
    key: "purchaseReturnedAmount",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: "Purchase Returned Qty",
    dataIndex: "purchaseReturnedQty",
    key: "purchaseReturnedQty",
    render: (qty) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {qty}
      </span>
    ),
  },
  {
    title: "Profit",
    dataIndex: "profit",
    key: "profit",
    render: (profit) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {profit}
      </span>
    ),
  },
  {
    title: "In Stock",
    dataIndex: "inStock",
    key: "inStock",
    render: (stock) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {stock}
      </span>
    ),
  },
  {
    title: "Stock Worth (Price/Cost)",
    dataIndex: "stockWorth",
    key: "stockWorth",
    render: (worth) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {worth}
      </span>
    ),
  },
];

export const ProductReport = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Product Report"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      // api={PRODUCT}
    >
      <ProductReportTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
