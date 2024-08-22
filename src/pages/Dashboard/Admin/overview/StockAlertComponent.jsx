import { useSelector } from 'react-redux';
import CustomTable from '../../../../components/Shared/Table/CustomTable';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGetAlertReportQuery } from '../../../../redux/services/reports/summaryApi';
import { useGetWarehousesQuery } from '../../../../redux/services/warehouse/warehouseApi';
import { usePagination } from '../../../../utilities/hooks/usePagination';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';

const columns = [
  {
    //sl no
    title: 'SL No',
    dataIndex: 'slNo',
    key: 'slNo',
    align: 'center',
    render: (slNo) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {slNo}
      </span>
    ),
  },
  {
    //name
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    //sku
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    align: 'center',
    render: (sku) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {sku}
      </span>
    ),
  },
  {
    //stock
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    align: 'center',
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
      </span>
    ),
  },
  {
    //stock
    title: 'Min Qty',
    dataIndex: 'minQty',
    key: 'minQty',
    align: 'center',
    render: (minQty) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {minQty}
      </span>
    ),
  },
  {
    //stock
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
    render: (stock, record) => (
      <span
        className={`"text-xs font-medium md:text-sm text-dark dark:text-white87" ${
          record?.stock < record?.minQty ? 'text-red-500' : ''
        }`}
      >
        {stock}
      </span>
    ),
  },
  {
    //stock
    title: 'Unit Cost',
    dataIndex: 'unitCost',
    key: 'unitCost',
    align: 'center',
    render: (unitCost) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {unitCost}
      </span>
    ),
  },
];
export const StockAlertComponent = () => {
  const { pagination, updatePage, updatePageSize } = usePagination();

  const warehouseParams = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data: warehouseData } = useGetWarehousesQuery({
    params: warehouseParams,
  });

  const warehouseIds = warehouseData?.results?.warehouse?.map(
    (warehouse) => warehouse?.id
  );

  const params = useGlobalParams({
    isDefaultParams: false,
    params: {
      ...pagination,
      child: 1,
      need_alert_qty: 1,
      warehouse_ids: warehouseIds,
    },
  });

  const { data, isFetching } = useGetAlertReportQuery(
    { params },
    {
      skip: !warehouseIds?.length,
    }
  );

  const total = data?.meta?.total;

  const currency = useSelector(useCurrency);

  const dataSource =
    data?.results?.product?.flatMap((item, index) => {
      const {
        name,
        alert_qty,
        sku,
        product_qties,
        product_prices,
        selling_price: unit_cost,
      } = item ?? {};

      return product_qties.map((qty, i) => ({
        id: `${index}-${i}`,
        name,
        sku,
        minQty: alert_qty,
        warehouse: qty.warehouses?.name ?? '',
        stock: qty.qty ?? 0,
        unitCost: product_prices?.length
          ? showCurrency(product_prices?.[i]?.selling_price, currency)
          : showCurrency(unit_cost, currency),
      }));
    }) ?? [];

  return (
    <CustomTable
      title={'Limited Stock Products'}
      columns={columns}
      dataSource={dataSource}
      isLoading={isFetching}
      created_at={false}
      action={false}
      status={false}
      total={total}
      pagination={pagination}
      updatePage={updatePage}
      updatePageSize={updatePageSize}
    />
  );
};
