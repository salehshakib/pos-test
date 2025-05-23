import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { SaleReturnDetails } from '../../../../components/SaleReturn/SaleReturnDetails';
import CustomTable from '../../../../components/Shared/Table/CustomTable';
import { GlobalUtilityStyle } from '../../../../container/Styled';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGetAllSaleReturnQuery } from '../../../../redux/services/return/saleReturnApi';
import { useFormatDate } from '../../../../utilities/hooks/useFormatDate';
import { usePagination } from '../../../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';
import { formatDate } from '../../../../utilities/lib/dateFormat';
import { getDateRange } from '../../../../utilities/lib/getDateRange';
import { useUrlIndexPermission } from '../../../../utilities/lib/getPermission';
import { columns } from '../data/SaleReturnColumns';

export const SaleReturnTable = ({
  keyword,
  summaryType,
  summary,
  setSummaryData,
  searchParams,
  segment,
  showPaging,
  action = true,
}) => {
  const currency = useSelector(useCurrency);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: {
      ...(showPaging ? pagination : {}),
      ...summaryType,
      summary,
      sale_return_daterange:
        searchParams?.created_daterange ?? getDateRange(segment),
    },
    keyword,
  });

  const { data, isLoading } = useGetAllSaleReturnQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  useEffect(() => {
    if (data?.results?.summary) {
      setSummaryData(data?.results?.summary?.[0]);
    } else {
      setSummaryData(null);
    }
  }, [data, setSummaryData]);

  const total = data?.meta?.total;

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const format = useFormatDate();

  const dataSource =
    data?.results?.salereturn?.map((item) => {
      const {
        id,
        reference_id,
        warehouses,
        cashiers,
        sale_return_at,
        grand_total,
      } = item ?? {};

      return {
        id,
        referenceNo: reference_id,
        warehouse: warehouses?.name,
        cashier: cashiers?.name,
        date: formatDate(sale_return_at, format),
        grandTotal: showCurrency(grand_total ?? 0, currency),
        handleDetailsModal,
      };
    }) ?? [];

  const hideModal = () => {
    setDetailsModal(false);
  };

  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={columns}
        dataSource={dataSource}
        total={total}
        pagination={pagination}
        updatePage={updatePage}
        updatePageSize={updatePageSize}
        // setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        // isRowSelection={true}
        status={false}
        created_at={false}
        action={action}
        showPaging={showPaging}
      />

      {detailsId && (
        <SaleReturnDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}
    </GlobalUtilityStyle>
  );
};
