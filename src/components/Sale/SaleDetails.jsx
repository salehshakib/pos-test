import { Button, Modal, Spin, Table } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { tableProps } from '../../layout/TableLayout';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { useGetSaleDetailsQuery } from '../../redux/services/sale/saleApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { showCurrency } from '../../utilities/lib/currency';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import SellInvoice from '../Shared/Invoice/SellInvoice';
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

export const SaleDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetSaleDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const [print, setPrint] = useState(false);

  const currency = useSelector(useCurrency);

  const basicInfo = useDetailsLayout({
    reference_id: data?.reference_id,
    cashier: data?.cashiers?.name,
    warehouse: data?.warehouses?.name,
  });

  const customerInfo = useDetailsLayout({
    customer_name: data?.customers?.name,
    phone_number: data?.customers?.phone_number,
    customer_email: data?.customers?.email ?? 'N/A',
    address: data?.customers?.address,
  });

  const paymentInfo = useDetailsLayout({
    order_tax: data?.tax,
    order_discount: showCurrency(data?.discount, currency),
    coupon_discount: data?.coupon_discount,
    shipping_cost: data?.shipping_cost,
    grand_total: data?.grand_total,
    paid_amount: data?.paid_amount,
    due_amount: data?.due_amount,
    payment_type: data?.payment_type,
    payment_status: data?.purchase_status,
  });

  const saleStatus = useDetailsLayout({
    sale_date: data?.sale_at,
    sale_status: data?.sale_status,
    sale_note: data?.sale_note,
  });

  const additionalInfo = useDetailsLayout({
    staff_note: data?.staff_note,
  });

  const attachments = useDetailsLayout({
    attachments: data?.attachments,
  });

  const title = () => (
    <span className="-ml-2 text-base font-semibold text-black">
      Purchase Products
    </span>
  );

  const dataSource = data?.sale_products?.map((item) => {
    return {
      id: item?.id,
      product_name: item?.product_variants?.name
        ? `${item.product_variants.name}${
            item?.product_variants?.sku ? ` (${item.product_variants.sku})` : ''
          }`
        : 'Unknown Product',

      qty: item.qty ?? 'Unknown Quantity',
      price: showCurrency(item?.net_unit_price, currency) ?? 'Unknown Price',
    };
  });

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <Button onClick={() => setPrint(true)}>Print</Button>
          <CustomDescription title="Basic Info" items={basicInfo} />
          <CustomDescription title="Customer Info" items={customerInfo} />
          <CustomDescription title="Sale Info" items={saleStatus} />
          <Table
            {...tableProps}
            title={title}
            columns={columns}
            dataSource={dataSource}
          />
          <CustomDescription title="Payment Info" items={paymentInfo} />
          <CustomDescription title="Attachments" items={attachments} />
          <CustomDescription title="Additional Info" items={additionalInfo} />
        </div>
      )}
      {print && (
        <Modal
          open={print}
          onCancel={() => setPrint(false)}
          footer={null}
          width={1000}
          destroyOnClose
        >
          <SellInvoice invoice={data} />
        </Modal>
      )}
    </CustomModal>
  );
};
