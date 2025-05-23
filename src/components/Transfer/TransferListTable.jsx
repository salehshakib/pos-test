import { Row } from 'antd';
import { MdDelete } from 'react-icons/md';

import { rowLayout } from '../../layout/FormLayout';
import CustomTable from '../Shared/Table/CustomTable';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: (name) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{name}</span>
    ),
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    render: (code) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{code}</span>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    render: (quantity) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {quantity}
      </span>
    ),
  },
  {
    title: 'Batch No',
    dataIndex: 'batch_no',
    key: 'batch_no',
    align: 'center',
    render: (batch_no) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {batch_no}
      </span>
    ),
  },
  {
    title: 'Expired Date',
    dataIndex: 'expireddate',
    key: 'expireddate',
    align: 'center',
    render: (expireddate) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {expireddate}
      </span>
    ),
  },
  {
    title: 'Net Unit Code',
    dataIndex: 'net_unit_code',
    key: 'net_unit_code',
    align: 'center',
    render: (net_unit_code) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {net_unit_code}
      </span>
    ),
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    align: 'center',
    render: (discount) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {discount}
      </span>
    ),
  },
  {
    title: 'Vat',
    dataIndex: 'tax',
    key: 'tax',
    align: 'center',
    render: (tax) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{tax}</span>
    ),
  },
  {
    title: 'Sub Total',
    dataIndex: 'sub_total',
    key: 'sub_total',
    align: 'center',
    render: (sub_total) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {sub_total}
      </span>
    ),
  },
  {
    title: <MdDelete className="text-lg md:text-xl" />,
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 40,
    fixed: 'right',
    //   render: ({ handleDeleteModal }, record) => {
    //     return (
    //       <div className="flex justify-center items-center gap-3">
    //         <button
    //           onClick={()=>handleDeleteModal(record?.id)}
    //           className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
    //         >
    //           <MdDelete className="text-lg md:text-xl" />
    //         </button>
    //       </div>
    //     );
    //   },
  },
];
const TransferListTable = () => {
  const dataSource = [];

  const subTotalRow = {
    key: 'subtotal',
    name: 'Subtotal',
    // totalOnz: { subtotal },
    // PNLAED: { pnlAEDTotal },
  };

  dataSource.push(subTotalRow);
  return (
    <Row {...rowLayout} className="my-5">
      <CustomTable columns={columns} dataSource={dataSource} />
    </Row>
  );
};

export default TransferListTable;
