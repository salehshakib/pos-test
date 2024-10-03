import { useSelector } from 'react-redux';

import CustomPrintTable from '../../../../components/Shared/Table/CustomPrintTable';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGetAllSaleReturnQuery } from '../../../../redux/services/return/saleReturnApi';
import { useFormatDate } from '../../../../utilities/hooks/useFormatDate';
import { useGlobalParams } from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';
import { formatDate } from '../../../../utilities/lib/dateFormat';
import { getDateRange } from '../../../../utilities/lib/getDateRange';
import { useUrlIndexPermission } from '../../../../utilities/lib/getPermission';

const SaleReturnPrintTable = ({
  summaryType,
  summary,
  searchParams,
  segment,
}) => {
  const currency = useSelector(useCurrency);
  const format = useFormatDate();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: {
      ...summaryType,
      summary,
      sale_return_daterange:
        searchParams?.created_daterange ?? getDateRange(segment),
    },
  });

  const { data } = useGetAllSaleReturnQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const dataSource =
    data?.results?.salereturn?.map((item) => {
      const {
        id,
        reference_id,
        warehouses,
        cashiers,
        sale_return_at,
        grand_total,
      } = item ?? {};

      return {
        id,
        referenceNo: reference_id,
        warehouse: warehouses?.name,
        cashier: cashiers?.name,
        date: formatDate(sale_return_at, format),
        grandTotal: showCurrency(grand_total ?? 0, currency),
      };
    }) ?? [];

  return (
    <div>
      <CustomPrintTable data={dataSource} />
    </div>
  );
};

export default SaleReturnPrintTable;
