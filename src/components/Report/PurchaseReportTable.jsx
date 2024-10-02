import { useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { useGetAllPurchaseQuery } from '../../redux/services/purchase/purchaseApi';
import { useFormatDate } from '../../utilities/hooks/useFormatDate';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { showCurrency } from '../../utilities/lib/currency';
import { formatDate } from '../../utilities/lib/dateFormat';
import CustomTable from '../Shared/Table/CustomTable';

export const PurchaseReportTable = ({
  newColumns,
  setSelectedRows,
  searchParams,
  keyword,
  showPaging,
  action = true,
}) => {
  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    params: {
      ...(showPaging ? pagination : {}),
      ...searchParams,
      child: 1,
      parent: 1,
    },
    keyword,
  });

  const { data, isFetching } = useGetAllPurchaseQuery({
    params,
  });

  const total = data?.meta?.total;

  const currency = useSelector(useCurrency);
  const format = useFormatDate();

  const dataSource =
    data?.results?.purchase?.flatMap((item, index) => {
      const {
        purchase_products,
        grand_total,
        purchase_at,
        total_qty,
        warehouses,
      } = item ?? {};

      const date = formatDate(purchase_at, format);

      return purchase_products?.map((item, i) => ({
        id: `${i}-${index + 1}`,
        product: item?.product_variants?.name,
        warehouse: warehouses?.name,
        purchasedQty: total_qty,
        purchasedAt: date,
        purchaseAmount: showCurrency(grand_total, currency),
      }));
    }) ?? [];

  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={newColumns}
        dataSource={dataSource}
        total={total}
        pagination={pagination}
        updatePage={updatePage}
        updatePageSize={updatePageSize}
        isLoading={isFetching}
        setSelectedRows={setSelectedRows}
        isRowSelection={false}
        status={false}
        created_at={false}
        action={action}
        showPaging={showPaging}
      />
    </GlobalUtilityStyle>
  );
};
