import { useState } from "react";
import QuotationCreate from "../../../components/Generator/Quotation/QuotationCreate";
import QuotationTable from "../../../components/Generator/Quotation/QuotationTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { GENERATE_QUOTATION } from "../../../utilities/apiEndpoints/generate.api";

const columns = [
  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
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
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
      </span>
    ),
  },
  {
    title: "Cashier",
    dataIndex: "cashier",
    key: "cashier",
    render: (cashier) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {cashier}
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
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
    render: (supplier) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {supplier}
      </span>
    ),
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    align: "center",
    render: (total) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {total}
      </span>
    ),
  },
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
];

const Quotation = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Quotation"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={GENERATE_QUOTATION}
    >
      <QuotationCreate />

      <QuotationTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Quotation;
