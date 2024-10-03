import { useSelector } from 'react-redux';

import CustomPrintTable from '../../../../components/Shared/Table/CustomPrintTable';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGetAllPurchaseQuery } from '../../../../redux/services/purchase/purchaseApi';
import { useFormatDate } from '../../../../utilities/hooks/useFormatDate';
import { useGlobalParams } from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';
import { formatDate } from '../../../../utilities/lib/dateFormat';
import { getDateRange } from '../../../../utilities/lib/getDateRange';
import { useUrlIndexPermission } from '../../../../utilities/lib/getPermission';

const PurchasePrintTable = ({
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
      purchase_daterange:
        searchParams?.created_daterange ?? getDateRange(segment),
    },
  });

  const { data } = useGetAllPurchaseQuery(
    { params },
    {
      skip: !useUrlIndexPermission('purchase'),
    }
  );

  const dataSource =
    data?.results?.purchase?.map((item) => {
      const {
        id,
        created_at,
        reference_id,
        suppliers,
        warehouses,
        purchase_status,
        payment_status,
        grand_total,
        paid_amount,
        due_amount,
        is_active,
      } = item ?? {};

      return {
        id,
        date: formatDate(created_at, format),
        reference: reference_id,
        warehouse: warehouses?.name,
        supplier: suppliers?.name,
        purchase_status: purchase_status,
        payment_status: payment_status,
        grand_total: showCurrency(grand_total, currency),
        paid: showCurrency(paid_amount, currency),
        due: showCurrency(due_amount, currency),
        status: is_active,
      };
    }) ?? [];

  return (
    <div>
      <CustomPrintTable data={dataSource} />
    </div>
  );
};

export default PurchasePrintTable;
