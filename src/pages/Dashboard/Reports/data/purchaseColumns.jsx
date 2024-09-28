export const columns = [
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
    title: 'Purchase Status',
    dataIndex: 'purchaseStatus',
    key: 'purchaseStatus',
    align: 'center',
    render: (purchaseStatus) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {purchaseStatus ?? 'N/A'}
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
    key: 'paid',
    render: (paid) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{paid}</span>
    ),
  },
  {
    title: 'Due',
    dataIndex: 'due',
    key: 'due',
    render: (due) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{due}</span>
    ),
  },
];
