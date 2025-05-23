import { Row } from 'antd';
import { useState } from 'react';

import { WarehouseFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import TransferCreate from '../../../components/Transfer/TransferCreate';
import TransferTable from '../../../components/Transfer/TransferTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { TRANSFER } from '../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    render: (date) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{date}</span>
    ),
  },
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
    title: 'Warehouse (From)',
    dataIndex: 'warehouse_from',
    key: 'warehouse_from',
    render: (warehouseFrom) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {warehouseFrom ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Warehouse (To)',
    dataIndex: 'warehouse_to',
    key: 'warehouse_to',
    render: (warehouseTo) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {warehouseTo ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    align: 'center',
    render: (qty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{qty}</span>
    ),
  },
  {
    title: 'Product Cost',
    dataIndex: 'product_cost',
    key: 'product_cost',
    align: 'right',
    render: (productCost) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {productCost}
      </span>
    ),
  },
  {
    title: 'Product VAT',
    dataIndex: 'product_tax',
    align: 'right',
    key: 'product_tax',
    render: (productTax) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {productTax}
      </span>
    ),
  },
  {
    title: 'Grand Total',
    dataIndex: 'grand_total',
    align: 'right',
    key: 'grand_total',
    render: (grandTotal) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {grandTotal}
      </span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    align: 'center',
    render: (status, record) => {
      return record?.handleStatusModal ? (
        <button
          className={`p-0 ${
            status?.toString() === 'Pending'
              ? 'bg-[#FEF2F2] text-[#EF4444]'
              : 'bg-[#DCFCE7] text-[#16A34A]'
          } w-[80px] rounded shadow-md`}
          onClick={() => record?.handleStatusModal(record.id)}
        >
          <span className="w-full px-2 text-xs font-medium">{status}</span>
        </button>
      ) : (
        <div
          className={`p-0 ${
            status?.toString() === 'Pending'
              ? 'bg-[#FEF2F2] text-[#EF4444]'
              : 'bg-[#DCFCE7] text-[#16A34A]'
          } w-[80px] rounded shadow-md`}
        >
          <span className="w-full px-2 text-xs font-medium">{status}</span>
        </div>
      );
    },
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <WarehouseFilter />
    </Row>
  );
};

const TransferList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle={'Transfer'}
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={TRANSFER}
    >
      <TransferCreate />

      <TransferTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default TransferList;
