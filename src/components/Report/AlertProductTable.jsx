import { useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { useGetAlertReportQuery } from '../../redux/services/reports/summaryApi';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { showCurrency } from '../../utilities/lib/currency';
import CustomTable from '../Shared/Table/CustomTable';

export const AlertProductTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    params: {
      ...pagination,
      ...searchParams,
      child: 1,
      need_alert_qty: 1,
      // need_price: 1,
    },
    keyword,
  });

  const { data, isFetching } = useGetAlertReportQuery(
    { params },
    {
      //   skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const currency = useSelector(useCurrency);

  const dataSource =
    data?.results?.product?.flatMap((item, index) => {
      const {
        name,
        alert_qty,
        sku,
        product_qties,
        product_prices,
        selling_price: unit_cost,
      } = item ?? {};

      return product_qties.map((qty, i) => ({
        id: `${index}-${i}`, // Ensure unique IDs for each entry
        name,
        sku,
        minQty: alert_qty,
        warehouse: qty.warehouses?.name ?? '',
        stock: qty.qty ?? 0,
        unitCost: product_prices?.length
          ? showCurrency(product_prices?.[i].selling_price, currency)
          : showCurrency(unit_cost, currency),
      }));
      // }
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
        setSelectedRows={setSelectedRows}
        isLoading={isFetching}
        status={false}
        action={false}
        created_at={false}
      />
    </GlobalUtilityStyle>
  );
};
