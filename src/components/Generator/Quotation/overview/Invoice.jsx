import { Table, Typography } from 'antd';
import { useSelector } from 'react-redux';

import logo from '../../../../assets/data/defaultLogo';
import { tableProps } from '../../../../layout/TableLayout';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useFormatDate } from '../../../../utilities/hooks/useFormatDate';
import { showCurrency } from '../../../../utilities/lib/currency';
import { formatDate } from '../../../../utilities/lib/dateFormat';

const columns = [
  //slno
  {
    title: 'Sl No',
    dataIndex: 'sl_no',
    key: 'sl_no',
    align: 'center',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {text}
      </span>
    ),
  },
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
    //   discount
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    align: 'right',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {text}
      </span>
    ),
  },
  {
    //   tax
    title: 'Vat',
    dataIndex: 'tax',
    key: 'tax',
    align: 'right',
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
    align: 'right',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {text}
      </span>
    ),
  },
];

const Invoice = ({ data, type }) => {
  const currency = useSelector(useCurrency);

  const dataSource = data?.invoice_products?.map((item, index) => {
    return {
      id: item?.id,
      sl_no: index + 1,
      product_name:
        item?.products?.name ??
        'Unknown Product' +
          (item?.products?.sku ? ` (${item?.products?.sku})` : ''),
      qty: item.qty ?? 'Unknown Quantity',
      discount: showCurrency(item?.discount, currency) ?? 'Unknown Discount',
      tax: showCurrency(item?.tax, currency) ?? 'Unknown VAT',
      price: showCurrency(item?.total, currency) ?? 'Unknown Price',
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
      className="relative min-h-[60vh] w-full space-y-3 p-5"
      id="invoice-container"
    >
      <div className="flex items-center justify-between">
        <div className="text-5xl font-extrabold">{type}</div>
        <div>
          <img src={logo} alt="" className="h-20 w-32 object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 p-5">
        <div className="flex flex-col items-start gap-1">
          <span className="text-lg font-semibold">FROM</span>
          <span className="w-full text-wrap">{data?.warehouses?.name}</span>
          <span className="w-full text-wrap">{data?.warehouses?.address}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="text-lg font-semibold">TO</span>
          <span className="w-full text-wrap">{data?.customers?.name}</span>
          <span className="w-full text-wrap">{data?.customers?.address}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="text-lg font-semibold">{type} ID</span>
          <span className="w-full text-wrap">{data?.reference_id}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="text-lg font-semibold">DATE</span>
          <span className="w-full text-wrap">
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
        <span className="w-full text-lg font-semibold">Terms & Conditions</span>
        <span className="">Payment is due within 15 days</span>
        <span className="">Contact number: XXXXXX123565</span>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-0 text-center text-xs">
        Developed By {developedBy}
      </div>
    </div>
  );
};

export default Invoice;
