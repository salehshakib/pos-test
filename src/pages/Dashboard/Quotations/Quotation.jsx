import { Row } from 'antd';
import { useState } from 'react';

import QuotationCreate from '../../../components/Generator/Quotation/QuotationCreate';
import QuotationTable from '../../../components/Generator/Quotation/QuotationTable';
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
import { GENERATE_QUOTATION } from '../../../utilities/apiEndpoints/generate.api';
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
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (supplier) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {supplier ?? 'N/A'}
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

const Quotation = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Quotation"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={GENERATE_QUOTATION}
    >
      <QuotationCreate />

      <QuotationTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default Quotation;
