import { useSelector } from 'react-redux';

import CustomPrintTable from '../../../../components/Shared/Table/CustomPrintTable';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGetAllPurchaseReturnQuery } from '../../../../redux/services/return/purchaseReturnApi';
import { useFormatDate } from '../../../../utilities/hooks/useFormatDate';
import { useGlobalParams } from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';
import { formatDate } from '../../../../utilities/lib/dateFormat';
import { getDateRange } from '../../../../utilities/lib/getDateRange';
import { useUrlIndexPermission } from '../../../../utilities/lib/getPermission';

const PurchaseReturnPrintTable = ({
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
      purchase_return_daterange:
        searchParams?.created_daterange ?? getDateRange(segment),
    },
  });

  const { data } = useGetAllPurchaseReturnQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const dataSource =
    data?.results?.purchasereturn?.map((item) => {
      const {
        id,
        reference_id,
        warehouses,
        suppliers,
        purchase_return_at,
        grand_total,
      } = item ?? {};

      return {
        id,
        reference_no: reference_id,
        warehouse: warehouses?.name,
        supplier: suppliers?.name,
        date: formatDate(purchase_return_at, format),
        grand_total: showCurrency(grand_total ?? 0, currency),
      };
    }) ?? [];

  return (
    <div>
      <CustomPrintTable data={dataSource} />
    </div>
  );
};

export default PurchaseReturnPrintTable;
