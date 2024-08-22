import { Table, Typography } from "antd";
import { useSelector } from "react-redux";
import logo from "../../../../assets/data/defaultLogo";
import { tableProps } from "../../../../layout/TableLayout";
import { useCurrency } from "../../../../redux/services/pos/posSlice";
import { useFormatDate } from "../../../../utilities/hooks/useFormatDate";
import { showCurrency } from "../../../../utilities/lib/currency";
import { formatDate } from "../../../../utilities/lib/dateFormat";

const columns = [
  //slno
  {
    title: "Sl No",
    dataIndex: "sl_no",
    key: "sl_no",
    align: "center",
    render: (text) => (
      <span className="text-xs md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
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
    //   discount
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    align: "right",
    render: (text) => (
      <span className="text-xs md:text-sm text-dark dark:text-white87">
        {text}
      </span>
    ),
  },
  {
    //   tax
    title: "Vat",
    dataIndex: "tax",
    key: "tax",
    align: "right",
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

const Invoice = ({ data, type }) => {
  const currency = useSelector(useCurrency);

  const dataSource = data?.quotation_products?.map((item, index) => {
    return {
      id: item?.id,
      sl_no: index + 1,
      product_name:
        item?.products?.name ??
        "Unknown Product" +
          (item?.products?.sku ? ` (${item?.products?.sku})` : ""),
      qty: item.qty ?? "Unknown Quantity",
      discount: showCurrency(item?.discount, currency) ?? "Unknown Discount",
      tax: showCurrency(item?.tax, currency) ?? "Unknown VAT",
      price: showCurrency(item?.total, currency) ?? "Unknown Price",
    };
  });

  const { developedBy } = useSelector((state) => state.developer);

  const tableStyle = {
    summary: () => {
      return (
        <Table.Summary fixed="bottom">
          {/* <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={6}>
              <Typography.Text className="font-bold" type=""></Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row> */}
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={5}>
              <Typography.Text className="font-bold" type="">
                Order Discount
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={2} align="right">
              <Typography.Text type="" className="font-bold">
                {showCurrency(data?.discount, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={5}>
              <Typography.Text className="font-bold" type="">
                Order Vat
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={2} align="right">
              <Typography.Text type="" className="font-bold">
                {showCurrency(data?.tax, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={5}>
              <Typography.Text className="font-bold" type="">
                Shipping Cost
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={2} align="right">
              <Typography.Text type="" className="font-bold">
                {showCurrency(data?.shipping_cost, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={5}>
              <Typography.Text className="font-bold" type="">
                Grand Total
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={2} align="right">
              <Typography.Text type="" className="font-bold">
                {showCurrency(data?.grand_total, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      );
    },
  };

  const format = useFormatDate();

  return (
    <div
      className="p-5 min-h-[60vh] space-y-3 w-full relative"
      id="invoice-container"
    >
      <div className="flex items-center justify-between">
        <div className="font-extrabold text-5xl">{type}</div>
        <div>
          <img src={logo} alt="" className="w-32 h-20 object-cover" />
        </div>
      </div>

      <div className="p-5 grid grid-cols-4 gap-1">
        <div className="flex flex-col items-start gap-1">
          <span className="font-semibold text-lg">FROM</span>
          <span className="text-wrap w-full">{data?.warehouses?.name}</span>
          <span className="text-wrap w-full">{data?.warehouses?.address}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="font-semibold text-lg">TO</span>
          <span className="text-wrap w-full">{data?.customers?.name}</span>
          <span className="text-wrap w-full">{data?.customers?.address}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="font-semibold text-lg">{type} ID</span>
          <span className="text-wrap w-full">{data?.reference_id}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="font-semibold text-lg">DATE</span>
          <span className="text-wrap w-full">
            {formatDate(data?.created_at, format)}
          </span>
        </div>
      </div>

      <Table
        {...tableProps}
        bordered
        columns={columns}
        dataSource={dataSource}
        summary={tableStyle.summary}
      />

      <div className="flex flex-col items-end gap-1 pb-20 pt-10 text-end">
        <span className="font-semibold text-lg w-full">Terms & Conditions</span>
        <span className="">Payment is due within 15 days</span>
        <span className="">Contact number: XXXXXX123565</span>
      </div>
      <div className="w-full text-xs text-center absolute bottom-0 left-0 p-0">
        Developed By {developedBy}
      </div>
    </div>
  );
};

export default Invoice;
