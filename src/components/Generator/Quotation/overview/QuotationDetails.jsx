import { Spin, Table } from "antd";
import { useGetQuotationDetailsQuery } from "../../../../redux/services/quotation/quotationApi";
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

  // console.log(data?.quotation_products);

  const details = createDetailsLayout(data);

  const title = () => (
    <span className="text-black font-semibold">Quotation Products</span>
  );

  const dataSource = data?.quotation_products?.map((item) => {
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
          <CustomDescription title="Quotation Details" items={details} />
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
