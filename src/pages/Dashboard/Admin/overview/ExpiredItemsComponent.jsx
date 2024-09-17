import CustomTable from '../../../../components/Shared/Table/CustomTable';
import { useGetAllProductsQuery } from '../../../../redux/services/product/productApi';
import { useGetWarehousesQuery } from '../../../../redux/services/warehouse/warehouseApi';
import { usePagination } from '../../../../utilities/hooks/usePagination';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../../utilities/hooks/useParams';

const columns = [
  {
    //sl no
    title: 'SL No',
    dataIndex: 'slNo',
    key: 'slNo',
    align: 'center',
    render: (slNo) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {sku}
      </span>
    ),
  },
  {
    //expire date
    title: 'Expire Date',
    dataIndex: 'expireDate',
    key: 'expireDate',
    align: 'center',
    render: (expireDate) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {expireDate}
      </span>
    ),
  },
];

export const ExpiredItemsComponent = () => {
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
    isRelationalParams: true,
    params: {
      ...pagination,
      need_expire: 1,
      warehouse_ids: warehouseIds,
    },
  });

  const { isLoading } = useGetAllProductsQuery(
    { params },
    {
      skip: !warehouseIds?.length,
      // skip: !useUrlIndexPermission(),
    }
  );

  return (
    <CustomTable
      title={'Expired Products'}
      columns={columns}
      dataSource={[]}
      isLoading={isLoading}
      created_at={false}
      action={false}
      pagination={pagination}
      updatePage={updatePage}
      updatePageSize={updatePageSize}
    />
  );
};
