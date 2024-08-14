import { Spin, Table } from "antd";
import { useSelector } from "react-redux";
import { tableProps } from "../../layout/TableLayout";
import { useCurrency } from "../../redux/services/pos/posSlice";
import { useGetPurchaseDetailsQuery } from "../../redux/services/purchase/purchaseApi";
import createDetailsLayout from "../../utilities/lib/createDetailsLayout";
import { showCurrency } from "../../utilities/lib/currency";
import { CustomDescription } from "../Shared/Description/CustomDescription";
import CustomModal from "../Shared/Modal/CustomModal";

const columns = [
  {
    title: "Product Name",
    dataIndex: "product_name",
    key: "product_name",
    render: (text) => (
      <span className="text-xs md:text-sm text-dark dark:text-white87">
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
      <span className="text-xs md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    // price
    title: "Price",
    dataIndex: "price",
    key: "price",
    align: "right",
    render: (text) => (
      <span className="text-xs md:text-sm text-dark dark:text-white87">
        {text}
      </span>
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

  //console.log(data);

  //   const details = createDetailsLayout(data);

  const basicInfo = createDetailsLayout({
    reference_id: data?.reference_id,
    warehouse: data?.warehouses?.name,
    supplier: data?.suppliers?.name,
  });

  const paymentInfo = createDetailsLayout({
    order_tax: data?.tax,
    order_discount: data?.discount,
    shipping_cost: data?.shipping_cost,
    grand_total: data?.grand_total,
    paid_amount: data?.paid_amount,
    due_amount: data?.due_amount,
    payment_type: data?.payment_type,
    payment_status: data?.purchase_status,
  });

  const purchaseStatus = createDetailsLayout({
    purchase_date: data?.purchase_at,
    purchase_note: data?.purchase_note,
    purchase_status: data?.purchase_status,
  });

  const attachments = createDetailsLayout({ attachments: data?.attachments });

  const title = () => (
    <span className="text-black font-semibold text-base -ml-2">
      Purchase Products
    </span>
  );

  const currency = useSelector(useCurrency);

  const dataSource = data?.purchase_products?.map((item) => {
    return {
      id: item?.id,
      product_name:
        item?.products?.name ??
        "Unknown Product" +
          (item?.products?.sku ? ` (${item?.products?.sku})` : ""),
      qty: item.qty ?? "Unknown Quantity",
      price: showCurrency(item?.net_unit_cost, currency) ?? "Unknown Price",
    };
  });

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center my-10" />
      ) : (
        <div className="space-y-5 max-h-[75vh] overflow-y-auto pt-3 pb-5">
          {/* <CustomDescription title="Purchase " items={details} /> */}
          <CustomDescription title="Basic Info" items={basicInfo} />
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
