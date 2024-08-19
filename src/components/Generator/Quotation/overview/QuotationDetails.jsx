import { Spin, Table } from "antd";
import { tableProps } from "../../../../layout/TableLayout";
import { useGetQuotationDetailsQuery } from "../../../../redux/services/quotation/quotationApi";
import { useInvoice } from "../../../../utilities/hooks/useInvoice";
import createDetailsLayout from "../../../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../../../Shared/Description/CustomDescription";
import CustomModal from "../../../Shared/Modal/CustomModal";

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

export const QuotationDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetQuotationDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  // const {settingData}

  const { a4_invoice, thermal_invoice } = useInvoice();

  console.log(a4_invoice);

  const referenceId = createDetailsLayout({ reference_id: data?.reference_id });

  const benDetails = createDetailsLayout({
    warehouse: data?.warehouses,
    cashier: data?.cashiers,
    customer: data?.customers,
    supplier: data?.suppliers,
  });

  const quotationDetails = createDetailsLayout({
    item: data?.item,
    total_qty: data?.total_qty,
    total_discount: data?.total_discount,
    total_tax: data?.total_tax,
    total_price: data?.total_price,
    discount: data?.discount,
    shipping_cost: data?.shipping_cost,
    grand_total: data?.grand_total,
    quotation_status: data?.quotation_status,
  });

  const attachment = createDetailsLayout({
    attachments: data?.attachments,
  });

  const additionalInfo = createDetailsLayout({ note: data?.note });

  const title = () => (
    <span className="text-black font-semibold text-base -ml-2">
      Quotation Products
    </span>
  );

  const dataSource = data?.quotation_products?.map((item) => {
    return {
      id: item?.id,
      product_name:
        item?.products?.name ??
        "Unknown Product" +
          (item?.products?.sku ? ` (${item?.products?.sku})` : ""),
      qty: item.qty ?? "Unknown Quantity",
      price: item.net_unit_price ?? "Unknown Price",
    };
  });

  console.log(a4_invoice);
  console.log(thermal_invoice);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center my-10" />
      ) : (
        <div className="space-y-5 max-h-[75vh] overflow-y-auto pt-3 pb-5">
          <CustomDescription title="Reference" items={referenceId} />
          <CustomDescription title="Beneficiary " items={benDetails} />

          <CustomDescription title="Quotation" items={quotationDetails} />
          <Table
            {...tableProps}
            title={title}
            columns={columns}
            dataSource={dataSource}
          />
          <CustomDescription title="Attachemnt " items={attachment} />
          <CustomDescription title="Additional" items={additionalInfo} />

          <div className="w-full flex flex-col gap-5 justify-center items-center ">
            <span className="text-4xl font-bold">Invoice</span>
            <div
              className=" w-3/4 border"
              dangerouslySetInnerHTML={{ __html: thermal_invoice }}
            />
          </div>
        </div>
      )}
    </CustomModal>
  );
};
