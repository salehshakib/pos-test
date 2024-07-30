import { useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import CustomTable from "../Shared/Table/CustomTable";

import { useCurrency } from "../../redux/services/pos/posSlice";
import { useGetAllSaleQuery } from "../../redux/services/sale/saleApi";
import { usePagination } from "../../utilities/hooks/usePagination";
import { showCurrency } from "../../utilities/lib/currency";

export const SaleReportTable = ({
  newColumns,
  setSelectedRows,
  // keyword,
  searchParams,
}) => {
  const { pagination, updatePage, updatePageSize } = usePagination();

  const { data, isFetching } = useGetAllSaleQuery({
    params: { ...pagination, ...searchParams, child: 1 },
  });

  const total = data?.meta?.total;

  const currency = useSelector(useCurrency);

  const dataSource =
    data?.results?.purchase?.map((item) => {
      const {
        id,
        purchase_products,
        grand_total,

        total_qty,
      } = item ?? {};

      return {
        id,
        product: purchase_products?.map(({ products }) => products?.name),
        purchasedQty: total_qty,
        purchaseAmount: showCurrency(grand_total, currency),
        // inStock: "2",
      };
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
