import { Spin, Table } from "antd";
import { useGetInvoiceDetailsQuery } from "../../../../redux/services/invoice/invoiceApi";
import createDetailsLayout from "../../../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../../../Shared/Description/CustomDescription";
import CustomModal from "../../../Shared/Modal/CustomModal";
import { tableProps } from "../../../../layout/TableLayout";

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
    align: "center",
    render: (text) => (
      <span className="text-xs md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
];

export const InvoiceDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetInvoiceDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const referenceId = createDetailsLayout({ reference_id: data?.reference_id });

  const benDetails = createDetailsLayout({
    warehouse: data?.warehouses,
    cashier: data?.cashiers,
    customer: data?.customers,
    supplier: data?.suppliers,
  });

  const invoiceDetails = createDetailsLayout({
    item: data?.item,
    total_qty: data?.total_qty,
    total_discount: data?.total_discount,
    total_tax: data?.total_tax,
    total_price: data?.total_price,
    discount: data?.discount,
    shipping_cost: data?.shipping_cost,
    grand_total: data?.grand_total,
    invoice_status: data?.invoice_status,
  });

  const attachment = createDetailsLayout({
    attachments: data?.attachments,
  });

  const additionalInfo = createDetailsLayout({ note: data?.note });

  const title = () => (
    <span className="text-black font-semibold text-base -ml-2">
      Invoice Products
    </span>
  );

  const dataSource = data?.invoice_products?.map((item) => {
    return {
      id: item?.id,
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
          <CustomDescription title="Reference" items={referenceId} />
          <CustomDescription title="Beneficiary Details" items={benDetails} />

          <CustomDescription title="Invoice Details" items={invoiceDetails} />
          <Table
            {...tableProps}
            title={title}
            columns={columns}
            dataSource={dataSource}
          />
          <CustomDescription title="Attachemnt Details" items={attachment} />
          <CustomDescription
            title="Additional Details"
            items={additionalInfo}
          />
        </div>
      )}
    </CustomModal>
  );
};
