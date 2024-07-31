import { useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import CustomTable from "../Shared/Table/CustomTable";

import { useCurrency } from "../../redux/services/pos/posSlice";
import { useGetAllSaleQuery } from "../../redux/services/sale/saleApi";
import { usePagination } from "../../utilities/hooks/usePagination";
import { showCurrency } from "../../utilities/lib/currency";
import dayjs from "dayjs";
import { useGlobalParams } from "../../utilities/hooks/useParams";

export const SaleReportTable = ({
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
      parent: 1,
    },
    keyword,
  });

  const { data, isFetching } = useGetAllSaleQuery({
    params,
  });

  const total = data?.meta?.total;

  const currency = useSelector(useCurrency);

  const dataSource =
    data?.results?.sale?.map((item, index) => {
      const { sale_products, grand_total, sale_at, total_qty, warehouses } =
        item ?? {};

      const date = dayjs(sale_at).format("DD-MM-YYYY");

      return sale_products?.map(({ products }, i) => ({
        id: `${index}-${i}`, // Ensure unique IDs for each entry
        product: products?.name,
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
        action={false}
      />
    </GlobalUtilityStyle>
  );
};
