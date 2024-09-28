export const columns = [
  {
    title: 'Return Reference',
    dataIndex: 'referenceNo',
    key: 'referenceNo',
    align: 'center',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
  {
    title: 'Sale Reference',
    dataIndex: 'saleReference',
    key: 'saleReference',
    align: 'center',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },

  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    align: 'center',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
  {
    title: 'Cashier',
    dataIndex: 'cashier',
    key: 'cashier',
    align: 'center',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
  {
    title: 'Grand Total',
    dataIndex: 'grandTotal',
    align: 'right',
    key: 'grandTotal',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
];
