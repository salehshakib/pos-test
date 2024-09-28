export const columns = [
  // {
  //   title: 'Reference Id',
  //   dataIndex: 'reference',
  //   key: 'reference',
  //   align: 'center',
  //   render: (reference) => (
  //     <span className="text-dark   text-xs font-medium md:text-sm">
  //       {reference}
  //     </span>
  //   ),
  // },
  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    align: 'center',
    render: (warehouse) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {warehouse ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    align: 'center',
    render: (category) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {category ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {amount}
      </span>
    ),
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
    render: (note) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {note ?? 'N/A'}
      </span>
    ),
  },
];
