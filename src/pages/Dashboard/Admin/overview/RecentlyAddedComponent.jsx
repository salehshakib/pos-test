import CustomTable from '../../../../components/Shared/Table/CustomTable';

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
    //sale
    title: 'Sale Price',
    dataIndex: 'salePrice',
    key: 'salePrice',
    align: 'right',
    render: (salePrice) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {salePrice}
      </span>
    ),
  },
];

export const RecentlyAddedComponent = () => {
  return (
    <CustomTable
      title={'Added Products'}
      columns={columns}
      dataSource={[]}
      created_at={false}
      action={false}
    />
  );
};
