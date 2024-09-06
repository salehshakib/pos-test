import { Spin } from 'antd';
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
        </div>
      )}
    </CustomModal>
  );
};
