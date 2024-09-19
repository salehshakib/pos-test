export const saleColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    render: (date) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {date}
      </span>
    ),
  },
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
    align: 'center',
    render: (warehouse) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {warehouse ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (customer) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {customer ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Cashier',
    dataIndex: 'cashier',
    key: 'cashier',
    render: (biller) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {paid}
      </span>
    ),
  },
  {
    title: 'Due',
    dataIndex: 'due',
    align: 'right',
    key: 'due',
    render: (due) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {due}
      </span>
    ),
  },
];
