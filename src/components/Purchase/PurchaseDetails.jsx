import { Spin, Table } from 'antd';
import { useSelector } from 'react-redux';

import { tableProps } from '../../layout/TableLayout';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { useGetPurchaseDetailsQuery } from '../../redux/services/purchase/purchaseApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { showCurrency } from '../../utilities/lib/currency';
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
    align: 'right',
    render: (text) => (
      <span className="text-dark   text-xs md:text-sm">{text}</span>
    ),
  },
];

export const PurchaseDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetPurchaseDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const basicInfo = useDetailsLayout({
    reference_id: data?.reference_id,
  });

  const warehouseInfo = useDetailsLayout({
    warehouse_name: data?.warehouses?.name,
    phone_number: data?.warehouses?.phone_number,
    warehouse_email: data?.warehouses?.email ?? 'N/A',
    address: data?.warehouses?.address,
  });

  const supplierInfo = useDetailsLayout({
    supplier_name: data?.suppliers?.name,
    phone_number: data?.suppliers?.phone_number,
    supplier_email: data?.suppliers?.email ?? 'N/A',
    address: data?.suppliers?.address,
  });

  const paymentInfo = useDetailsLayout({
    order_tax: data?.tax,
    order_discount: data?.discount,
    shipping_cost: data?.shipping_cost,
    grand_total: data?.grand_total,
    paid_amount: data?.paid_amount,
    due_amount: data?.due_amount,
    payment_type: data?.payment_type,
    payment_status: data?.purchase_status,
  });

  const purchaseStatus = useDetailsLayout({
    purchase_date: data?.purchase_at,
    purchase_status: data?.purchase_status,
    purchase_note: data?.purchase_note,
  });

  const attachments = useDetailsLayout({ attachments: data?.attachments });

  const title = () => (
    <span className="-ml-2 text-base font-semibold text-black">
      Purchase Products
    </span>
  );

  const currency = useSelector(useCurrency);

  const dataSource = data?.purchase_products?.map((item) => {
    return {
      id: item?.id,
      product_name: item?.product_variants?.name
        ? `${item.product_variants.name}${
            item?.product_variants?.sku ? ` (${item.product_variants.sku})` : ''
          }`
        : 'Unknown Product',
      qty: item.qty ?? 'Unknown Quantity',
      price: showCurrency(item?.net_unit_cost, currency) ?? 'Unknown Price',
    };
  });

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Basic Info" items={basicInfo} />
          <CustomDescription title="Warehouse Info" items={warehouseInfo} />
          <CustomDescription title="Supplier Info" items={supplierInfo} />
          <CustomDescription title="Purchase Info" items={purchaseStatus} />
          <Table
            {...tableProps}
            title={title}
            columns={columns}
            dataSource={dataSource}
          />
          <CustomDescription title="Payment Info" items={paymentInfo} />
          <CustomDescription title="Attachments" items={attachments} />
        </div>
      )}
    </CustomModal>
  );
};
