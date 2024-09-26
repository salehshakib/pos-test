import defaultUser from '../../assets/data/defaultUserImage';
import { showCurrency } from '../../utilities/lib/currency';
import CustomTable from '../Shared/Table/CustomTable';

const expandColumns = [
  {
    title: 'Img',
    dataIndex: 'img',
    key: 'img',
    // fixed: 'left',
    align: 'center',
    width: 70,
    render: (img) => (
      <div className="mx-auto h-8 w-8 overflow-hidden rounded-md">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
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
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    align: 'center',
    render: (qty) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {qty}
      </span>
    ),
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
    align: 'right',
    render: (cost) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {cost}
      </span>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    align: 'right',
    render: (price) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {price}
      </span>
    ),
  },
];

export const expandedRowRender = (record, data, currency) => {
  if (record.hasVariant !== 'Yes') return null;

  console.log(data.results.product);

  // Handle variant data source here if needed
  const expandedData =
    data?.results?.product
      ?.find((product) => product.id === record.id)
      ?.variants?.map((variant) => ({
        id: variant.id,
        name: variant.name,
        sku: variant.sku,
        quantity: variant.qty,
        cost: showCurrency(variant.buying_price, currency),
        price: showCurrency(variant.selling_price, currency),
        created_at: variant.created_at,
        status: record.status,
        handleDeleteModal: record.handleDeleteVariantModal,
      })) ?? [];

  return (
    <CustomTable
      columns={expandColumns}
      dataSource={expandedData}
      showPaging={false}
      status={false}
      tableStyleProps={{
        bordered: true,
        scroll: {
          x: 'min-content',
        },
      }}
    />
  );
};
