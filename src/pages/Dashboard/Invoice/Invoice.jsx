import { Row } from 'antd';
import { useState } from 'react';

import InvoiceCreate from '../../../components/Generator/Invoice/InvoiceCreate';
import InvoiceTable from '../../../components/Generator/Invoice/InvoiceTable';
import {
  CashierFilter,
  CustomerFilter,
  ProductFilter,
  SaleStatusFilter,
  SupplierFilter,
  WarehouseFilter,
} from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { GENERATE_INVOICE } from '../../../utilities/apiEndpoints/generate.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Reference',
    dataIndex: 'reference',
    key: 'reference',
    align: 'center',
    render: (reference) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {reference}
      </span>
    ),
  },
  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    render: (warehouse) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {warehouse ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Cashier',
    dataIndex: 'cashier',
    key: 'cashier',
    render: (cashier) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {cashier ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (customer) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {customer ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Total',
    dataIndex: 'total',
    align: 'right',
    key: 'total',
    render: (total) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {total}
      </span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <WarehouseFilter />
      <CashierFilter />
      <SupplierFilter />
      <CustomerFilter />
      <ProductFilter />
      <SaleStatusFilter />
    </Row>
  );
};

const Invoice = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Invoice"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={GENERATE_INVOICE}
    >
      <InvoiceCreate />

      <InvoiceTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default Invoice;
