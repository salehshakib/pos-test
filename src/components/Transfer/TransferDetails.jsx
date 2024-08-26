import { Spin, Table } from 'antd';
import { tableProps } from '../../layout/TableLayout';
import { useGetTransferDetailsQuery } from '../../redux/services/transfer/transferApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {text}
      </span>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    align: 'center',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {text}
      </span>
    ),
  },
  {
    // price
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {text}
      </span>
    ),
  },
];

export const TransferDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetTransferDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const referenceId = useDetailsLayout({ reference_id: data?.reference_id });

  const warehouseDetails = useDetailsLayout({
    'warehouse_(from)': data?.from_warehouses,
    'warehouse_(to)': data?.to_warehouses,
  });

  const transferDetails = useDetailsLayout({
    item: data?.item,
    total_qty: data?.total_qty,
    total_tax: data?.total_tax,
    total_cost: data?.total_cost,
    shipping_cost: data?.shipping_cost,
    grand_total: data?.grand_total,
    status: data?.status,
  });

  const attachment = useDetailsLayout({
    attachments: data?.attachments,
  });

  const additionalInfo = useDetailsLayout({ note: data?.note });

  const title = () => (
    <span className="-ml-2 text-base font-semibold text-black">
      Transfer Products
    </span>
  );

  const dataSource = data?.transfer_products?.map((item) => {
    return {
      id: item?.id,
      product_name:
        item?.products?.name ??
        'Unknown Product' +
          (item?.products?.sku ? ` (${item?.products?.sku})` : ''),
      qty: item.qty ?? 'Unknown Quantity',
      price: item.net_unit_cost ?? 'Unknown Price',
    };
  });

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="max-h-[75vh] space-y-5 overflow-y-auto pb-5 pt-3">
          <CustomDescription title="Reference" items={referenceId} />
          <CustomDescription title="Warehouse" items={warehouseDetails} />
          <CustomDescription title="Transfer " items={transferDetails} />

          <Table
            {...tableProps}
            title={title}
            columns={columns}
            dataSource={dataSource}
          />
          <CustomDescription title="Attachemnt " items={attachment} />
          <CustomDescription title="Additional" items={additionalInfo} />
        </div>
      )}
    </CustomModal>
  );
};
