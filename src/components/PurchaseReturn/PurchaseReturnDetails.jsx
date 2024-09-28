import { Spin, Table } from 'antd';

import { tableProps } from '../../layout/TableLayout';
import { useGetPurchaseReturnDetailsQuery } from '../../redux/services/return/purchaseReturnApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
    render: (text) => (
      <span className="text-dark   text-xs md:text-sm">{text}</span>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    align: 'center',
    render: (text) => (
      <span className="text-dark   text-xs md:text-sm">{text}</span>
    ),
  },
  {
    // price
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    render: (text) => (
      <span className="text-dark   text-xs md:text-sm">{text}</span>
    ),
  },
];

export const PurchaseReturnDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetPurchaseReturnDetailsQuery(
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

  const benDetails = useDetailsLayout({
    warehouse: data?.warehouses,
    cashier: data?.cashiers,
    customer: data?.customers,
  });

  const purchaseReturnDetails = useDetailsLayout({
    item: data?.item,
    total_qty: data?.total_qty,
    total_tax: data?.total_tax,
    total_price: data?.total_price,
    tax: data?.tax,
    grand_total: data?.grand_total,

    return_amount: data?.return_amount,
    due_amount: data?.due_amount,
    return_payment_type: data?.return_payment_type,
  });

  const attachment = useDetailsLayout({
    attachments: data?.attachments,
  });

  const additionalInfo = useDetailsLayout({
    return_note: data?.return_note,
    staff_note: data?.staff_note,
  });

  const title = () => (
    <span className="-ml-2 text-base font-semibold text-black">
      Purchase Return Products
    </span>
  );

  const dataSource = data?.purchase_return_products?.map((item) => {
    return {
      id: item?.id,
      product_name: item?.product_variants?.name
        ? `${item.product_variants.name}${
            item?.product_variants?.sku ? ` (${item.product_variants.sku})` : ''
          }`
        : 'Unknown Product',
      qty: item.qty ?? 'Unknown Quantity',
      price: item.net_unit_price ?? 'Unknown Price',
    };
  });

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Reference" items={referenceId} />
          <CustomDescription title="Beneficiary" items={benDetails} />

          <CustomDescription
            title="Sale Return"
            items={purchaseReturnDetails}
          />
          <Table
            {...tableProps}
            title={title}
            columns={columns}
            dataSource={dataSource}
          />
          <CustomDescription title="Attachemnt" items={attachment} />
          <CustomDescription title="Additional" items={additionalInfo} />
        </div>
      )}
    </CustomModal>
  );
};
