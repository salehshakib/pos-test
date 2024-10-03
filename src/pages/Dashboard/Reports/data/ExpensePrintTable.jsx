import { useSelector } from 'react-redux';

import CustomPrintTable from '../../../../components/Shared/Table/CustomPrintTable';
import { useGetAllExpenseQuery } from '../../../../redux/services/expense/expenseApi';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGlobalParams } from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';
import { getDateRange } from '../../../../utilities/lib/getDateRange';
import { useUrlIndexPermission } from '../../../../utilities/lib/getPermission';

const ExpensePrintTable = ({ summaryType, summary, searchParams, segment }) => {
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

  const { data } = useGetAllExpenseQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const dataSource =
    data?.results?.expense?.map((item) => {
      const {
        id,
        name,
        created_at,
        reference_id,
        warehouses,
        expense_categories,
        amount,
        reason,
      } = item ?? {};

      return {
        id,
        reference: reference_id,
        warehouse: warehouses?.name,
        category: expense_categories?.name,
        amount: showCurrency(amount, currency),
        note: reason,
        name: name,
        created_at,
      };
    }) ?? [];

  return (
    <div>
      <CustomPrintTable data={dataSource} />
    </div>
  );
};

export default ExpensePrintTable;
