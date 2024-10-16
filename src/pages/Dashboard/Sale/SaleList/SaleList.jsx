import { Modal, Row, Spin } from 'antd';
import { useState } from 'react';

import {
  CashierFilter,
  CustomerFilter,
  PaymentStatusFilter,
  ProductFilter,
  SaleStatusFilter,
  TaxFilter,
  WarehouseFilter,
} from '../../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import { SaleCreate } from '../../../../components/Sale/SaleCreate';
import { SaleTable } from '../../../../components/Sale/SaleTable';
import SellInvoice from '../../../../components/Shared/Invoice/SellInvoice';
import GlobalContainer from '../../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../../layout/FormLayout';
import { useGetSaleDetailsQuery } from '../../../../redux/services/sale/saleApi';
import { SALE } from '../../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../../utilities/hooks/useParams';

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
    title: 'Cashier',
    dataIndex: 'cashier',
    key: 'cashier',
    render: (biller) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {biller}
      </span>
    ),
  },
  {
    title: 'Sale Status',
    dataIndex: 'saleStatus',
    key: 'saleStatus',
    align: 'center',
    render: (saleStatus) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {saleStatus ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    align: 'center',
    render: (paymentStatus) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {paymentStatus ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Grand Total',
    dataIndex: 'grandTotal',
    align: 'right',
    key: 'grandTotal',
    render: (grandTotal) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {grandTotal}
      </span>
    ),
  },
  {
    title: 'Paid',
    dataIndex: 'paid',
    align: 'right',
    key: 'paid',
    render: (paid) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{paid}</span>
    ),
  },
  {
    title: 'Due',
    dataIndex: 'due',
    align: 'right',
    key: 'due',
    render: (due) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{due}</span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <CustomerFilter />
      <WarehouseFilter />
      <CashierFilter />
      <ProductFilter name="sale_product_ids" />
      <TaxFilter />
      <SaleStatusFilter />
      <PaymentStatusFilter />
    </Row>
  );
};

const SaleList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const [id, setId] = useState(null);

  const { data: saleData, isFetching } = useGetSaleDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Sell"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={SALE}
    >
      <SaleCreate setId={setId} />

      {isFetching ? (
        <div className="flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <SaleTable
          newColumns={newColumns}
          keyword={keyword}
          setSelectedRows={setSelectedRows}
          searchParams={searchParams}
        />
      )}
      {saleData && (
        <Modal
          open={id}
          onCancel={() => setId(null)}
          footer={null}
          width={1000}
          destroyOnClose
        >
          <SellInvoice invoice={saleData} />
        </Modal>
      )}
    </GlobalContainer>
  );
};

export default SaleList;
