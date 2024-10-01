import { useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { useGetAllSaleQuery } from '../../redux/services/sale/saleApi';
import { useFormatDate } from '../../utilities/hooks/useFormatDate';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { showCurrency } from '../../utilities/lib/currency';
import { formatDate } from '../../utilities/lib/dateFormat';
import CustomTable from '../Shared/Table/CustomTable';

export const SaleReportTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
  action = true,
  showPaging,
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

  const { data, isFetching } = useGetAllSaleQuery({
    params,
  });

  const total = data?.meta?.total;

  const currency = useSelector(useCurrency);
  const format = useFormatDate();

  const dataSource =
    data?.results?.sale?.flatMap((item, index) => {
      const { sale_products, grand_total, sale_at, total_qty, warehouses } =
        item ?? {};
      const date = formatDate(sale_at, format);

      return sale_products?.map((item) => ({
        id: `${item?.id}-${index + 1}`,
        product: item?.product_variants?.name,
        warehouse: warehouses?.name,
        soldQty: total_qty,
        saleAt: date,
        soldAmount: showCurrency(grand_total, currency),
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
        showPaging={showPaging}
        action={action}
      />
    </GlobalUtilityStyle>
  );
};
