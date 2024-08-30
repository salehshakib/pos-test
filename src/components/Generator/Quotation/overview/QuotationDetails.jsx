import { Spin } from 'antd';
// const columns = [
//   {
//     title: "Product Name",
//     dataIndex: "product_name",
//     key: "product_name",
//     render: (text) => (
//       <span className="text-xs md:text-sm text-dark dark:text-white87">
//         {text}
//       </span>
//     ),
//   },
//   {
//     title: "Quantity",
//     dataIndex: "qty",
//     key: "qty",
//     align: "center",
//     render: (text) => (
//       <span className="text-xs md:text-sm text-dark dark:text-white87">
//         {text}
//       </span>
//     ),
//   },
//   {
//     //   discount
//     title: "Discount",
//     dataIndex: "discount",
//     key: "discount",
//     align: "right",
//     render: (text) => (
//       <span className="text-xs md:text-sm text-dark dark:text-white87">
//         {text}
//       </span>
//     ),
//   },
//   {
//     //   tax
//     title: "Vat",
//     dataIndex: "tax",
//     key: "tax",
//     align: "right",
//     render: (text) => (
//       <span className="text-xs md:text-sm text-dark dark:text-white87">
//         {text}
//       </span>
//     ),
//   },
//   {
//     // price
//     title: "Price",
//     dataIndex: "price",
//     key: "price",
//     align: "right",
//     render: (text) => (
//       <span className="text-xs md:text-sm text-dark dark:text-white87">
//         {text}
//       </span>
//     ),
//   },
// ];

import generatePDF from 'react-to-pdf';

import { useGetQuotationDetailsQuery } from '../../../../redux/services/quotation/quotationApi';
import { generatePdfOptions } from '../../../../utilities/lib/generatePdfOptions';
import CustomModal from '../../../Shared/Modal/CustomModal';
import Invoice from './Invoice';

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

  // const { a4_invoice, thermal_invoice } = useInvoice();
  // const referenceId = createDetailsLayout({ reference_id: data?.reference_id });

  // const benDetails = createDetailsLayout({
  //   warehouse: data?.warehouses,
  //   cashier: data?.cashiers,
  //   customer: data?.customers,
  //   supplier: data?.suppliers,
  // });

  // const quotationDetails = createDetailsLayout({
  //   item: data?.item,
  //   total_qty: data?.total_qty,
  //   total_discount: data?.total_discount,
  //   total_tax: data?.total_tax,
  //   total_price: data?.total_price,
  //   discount: data?.discount,
  //   shipping_cost: data?.shipping_cost,
  //   grand_total: data?.grand_total,
  //   quotation_status: data?.quotation_status,
  // });

  // const attachment = createDetailsLayout({
  //   attachments: data?.attachments,
  // });

  // const additionalInfo = createDetailsLayout({ note: data?.note });

  // const title = () => (
  //   <span className="text-black font-semibold text-base -ml-2">
  //     Quotation Products
  //   </span>
  // );

  // const currency = useSelector(useCurrency);

  // const dataSource = data?.quotation_products?.map((item) => {
  //   return {
  //     id: item?.id,
  //     product_name:
  //       item?.products?.name ??
  //       "Unknown Product" +
  //         (item?.products?.sku ? ` (${item?.products?.sku})` : ""),
  //     qty: item.qty ?? "Unknown Quantity",
  //     discount: showCurrency(item.discount, currency) ?? "Unknown Discount",
  //     tax: showCurrency(item.tax, currency) ?? "Unknown VAT",
  //     price: showCurrency(item.total, currency) ?? "Unknown Price",
  //   };
  // });

  const getTargetElement = () => document.getElementById('invoice-container');

  const handlePrintPdf = () => {
    generatePDF(getTargetElement, {
      ...generatePdfOptions,
      filename: `${data?.reference_id}.pdf`,
    });
  };

  const handleDownload = () => {
    generatePDF(getTargetElement, {
      ...generatePdfOptions,
      method: 'save',
      filename: `${data?.reference_id}.pdf`,
    });
  };

  return (
    <CustomModal
      {...props}
      handlePrint={handlePrintPdf}
      handleDownload={handleDownload}
    >
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <Invoice data={data} type="QUOTATION" />
          {/* <CustomDescription title="Reference" items={referenceId} />
          <CustomDescription title="Beneficiary" items={benDetails} />

          <CustomDescription title="Quotation" items={quotationDetails} />
          <Table
            {...tableProps}
            title={title}
            columns={columns}
            dataSource={dataSource}
          />
          <CustomDescription title="Attachemnt" items={attachment} />
          <CustomDescription title="Additional" items={additionalInfo} />

          <div className="w-full flex flex-col gap-5 justify-center items-center ">
            <span className="text-4xl font-bold">Invoice</span>
            <div
              className=" w-3/4 border"
              dangerouslySetInnerHTML={{ __html: a4_invoice }}
            />
          </div> */}
        </div>
      )}
    </CustomModal>
  );
};
