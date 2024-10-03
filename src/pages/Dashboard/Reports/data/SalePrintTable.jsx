import { useSelector } from 'react-redux';

import CustomPrintTable from '../../../../components/Shared/Table/CustomPrintTable';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGetAllSaleQuery } from '../../../../redux/services/sale/saleApi';
import { useFormatDate } from '../../../../utilities/hooks/useFormatDate';
import { useGlobalParams } from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';
import { formatDate } from '../../../../utilities/lib/dateFormat';
import { getDateRange } from '../../../../utilities/lib/getDateRange';
import { useUrlIndexPermission } from '../../../../utilities/lib/getPermission';

const SalePrintTable = ({ summaryType, summary, searchParams, segment }) => {
  const currency = useSelector(useCurrency);
  const format = useFormatDate();
  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: {
      ...summaryType,
      summary,
      sale_daterange: searchParams?.created_daterange ?? getDateRange(segment),
    },
  });

  const { data } = useGetAllSaleQuery(
    { params },
    {
      skip: !useUrlIndexPermission('sale'),
    }
  );

  const dataSource =
    data?.results?.sale?.map((item) => {
      const {
        id,
        sale_at,
        reference_id,
        customers,
        cashiers,
        sale_status,
        payment_status,
        grand_total,
        paid_amount,
        due_amount,
      } = item ?? {};

      return {
        key: id,
        id,
        date: formatDate(sale_at, format),
        reference: reference_id,
        customer: customers?.name,
        cashier: cashiers?.name,
        saleStatus: sale_status,
        paymentStatus: payment_status,
        grandTotal: showCurrency(grand_total ?? '0', currency),
        paid: showCurrency(paid_amount ?? '0', currency),
        due: showCurrency(due_amount ?? '0', currency),
      };
    }) ?? [];

  return (
    <div>
      <CustomPrintTable data={dataSource} />
    </div>
  );
};

export default SalePrintTable;
