import { useState } from 'react';
import StockCountCreate from '../../../components/StockCount/StockCountCreate';
import StockCountTable from '../../../components/StockCount/StockCountTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { STOCK_COUNT } from '../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Reference',
    dataIndex: 'reference',
    key: 'reference',
    align: 'center',
    render: (reference) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {reference}
      </span>
    ),
  },
  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    render: (warehouse) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {warehouse ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (category) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {category ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    render: (brand) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {brand ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    render: (type) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {type}
      </span>
    ),
  },
];

const StockCount = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Stock Count"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={STOCK_COUNT}
    >
      <StockCountCreate />

      <StockCountTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default StockCount;
