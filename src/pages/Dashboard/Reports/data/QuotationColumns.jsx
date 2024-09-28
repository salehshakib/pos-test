export const columns = [
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
    key: 'total',
    render: (total) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {total}
      </span>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    render: (date) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{date}</span>
    ),
  },
];
