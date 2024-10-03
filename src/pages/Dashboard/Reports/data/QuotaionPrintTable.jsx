import { useSelector } from 'react-redux';

import CustomPrintTable from '../../../../components/Shared/Table/CustomPrintTable';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGetAllQuotationQuery } from '../../../../redux/services/quotation/quotationApi';
import { useGlobalParams } from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';
import { getDateRange } from '../../../../utilities/lib/getDateRange';
import { useUrlIndexPermission } from '../../../../utilities/lib/getPermission';

const QuotaionPrintTable = ({
  summaryType,
  summary,
  searchParams,
  segment,
}) => {
  const currency = useSelector(useCurrency);
  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: {
      ...summaryType,
      summary,
      created_daterange:
        searchParams?.created_daterange ?? getDateRange(segment),
    },
  });

  const { data } = useGetAllQuotationQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const dataSource =
    data?.results?.quotation?.map((item) => {
      const {
        id,
        reference_id,
        cashiers,
        customers,
        suppliers,
        grand_total,
        warehouses,
      } = item ?? {};

      return {
        id,
        reference: reference_id,
        warehouse: warehouses?.name ?? 'N/A',
        cashier: cashiers?.name ?? 'N/A',
        customer: customers?.name ?? 'N/A',
        supplier: suppliers?.name ?? 'N/A',
        total: showCurrency(grand_total, currency),
      };
    }) ?? [];

  return (
    <div>
      <CustomPrintTable data={dataSource} />
    </div>
  );
};

export default QuotaionPrintTable;
