import { Spin, Table } from "antd";
import { tableProps } from "../../layout/TableLayout";
import { useGetSaleDetailsQuery } from "../../redux/services/sale/saleApi";
import createDetailsLayout from "../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../Shared/Description/CustomDescription";
import CustomModal from "../Shared/Modal/CustomModal";

const columns = [
  {
    title: "Product Name",
    dataIndex: "product_name",
    key: "product_name",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "qty",
    key: "qty",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    // price
    title: "Price",
    dataIndex: "price",
    key: "price",
    align: "center",
    render: (text) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text}
      </span>
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

  console.log(data);

  //   const details = createDetailsLayout(data);

  const basicInfo = createDetailsLayout({
    reference_id: data?.reference_id,
    cashier: data?.cashiers?.name,
    warehouse: data?.warehouses?.name,
    supplier: data?.suppliers?.name,
  });

  const paymentInfo = createDetailsLayout({
    order_tax: data?.tax,
    order_discount: data?.discount,
    coupon_discount: data?.coupon_discount,
    shipping_cost: data?.shipping_cost,
    grand_total: data?.grand_total,
    paid_amount: data?.paid_amount,
    due_amount: data?.due_amount,
    payment_type: data?.payment_type,
    payment_status: data?.purchase_status,
  });

  const saleStatus = createDetailsLayout({
    sale_date: data?.sale_at,
    sale_note: data?.sale_note,
    staff_note: data?.staff_note,
    sale_status: data?.sale_status,
  });

  const attachments = createDetailsLayout({ attachments: data?.attachments });

  const title = () => (
    <span className="text-black font-semibold">Purchase Products</span>
  );

  const dataSource = data?.sale_products?.map((item) => {
    return {
      product_name:
        item?.products?.name +
          (item?.products?.sku ? ` (${item?.products?.sku})` : "") ??
        "Unknown Product",
      qty: item.qty ?? "Unknown Quantity",
      price: item.net_unit_price ?? "Unknown Price",
    };
  });

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center mt-10" />
      ) : (
        <div className="space-y-5">
          {/* <CustomDescription title="Sale Details" items={details} /> */}
          <CustomDescription title="Basic Info" items={basicInfo} />
          <CustomDescription title="Payment Info" items={paymentInfo} />
          <CustomDescription title="Sale Info" items={saleStatus} />
          <CustomDescription title="Attachments" items={attachments} />

          <Table
            {...tableProps}
            title={title}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      )}
    </CustomModal>
  );
};
