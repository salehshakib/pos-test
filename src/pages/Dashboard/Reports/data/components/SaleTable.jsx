import dayjs from "dayjs";
import { useState } from "react";
import { SaleDetails } from "../../../../../components/Sale/SaleDetails";
import CustomTable from "../../../../../components/Shared/Table/CustomTable";
import { GlobalUtilityStyle } from "../../../../../container/Styled";
import { useGetAllSaleQuery } from "../../../../../redux/services/sale/saleApi";
import { usePagination } from "../../../../../utilities/hooks/usePagination";
import { useGlobalParams } from "../../../../../utilities/hooks/useParams";
import { useUrlIndexPermission } from "../../../../../utilities/lib/getPermission";
import { saleColumns } from "../saleColumn";

export const SaleTable = ({ keyword, warehouse_ids }) => {
  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: { ...pagination, warehouse_ids: warehouse_ids, summary: "sale" },
    keyword,
  });

  const { data, isLoading } = useGetAllSaleQuery(
    { params },
    {
      skip: !useUrlIndexPermission("sale") && !warehouse_ids?.length,
    }
  );

  const total = data?.meta?.total;

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const dataSource =
    data?.results?.sale?.map((item) => {
      const {
        id,
        sale_at,
        reference_id,
        customers,
        cashiers,
        sale_status,
        payment_status,
        grand_total,
        paid_amount,
        due_amount,
      } = item ?? {};

      const date = dayjs(sale_at).format("DD-MM-YYYY");

      return {
        key: id, // Unique key for each row
        id,
        date,
        reference: reference_id,
        customer: customers?.name,
        cashier: cashiers?.name,
        saleStatus: sale_status,
        paymentStatus: payment_status,
        grandTotal: grand_total,
        paid: paid_amount,
        due: due_amount,

        handleDetailsModal,
      };
    }) ?? [];

  const hideModal = () => {
    setDetailsModal(false);
  };

  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={saleColumns}
        dataSource={dataSource}
        total={total}
        pagination={pagination}
        updatePage={updatePage}
        updatePageSize={updatePageSize}
        // setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        // isRowSelection={true}
        created_at={false}
        status={false}
      />
      {detailsId && (
        <SaleDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}
    </GlobalUtilityStyle>
  );
};
