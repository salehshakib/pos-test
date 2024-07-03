import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SaleReportTable } from "../../../components/Report/SaleReportTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Product Name",
    dataIndex: "product",
    key: "product",
    render: (product) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {product}
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
    title: "In Stock",
    dataIndex: "inStock",
    key: "inStock",
    render: (stock) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {stock}
      </span>
    ),
  },
];

export const SaleReport = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);
  return (
    <GlobalContainer
      pageTitle="Sale Report"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
    >
      <SaleReportTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
