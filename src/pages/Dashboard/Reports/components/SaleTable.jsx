import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { SaleDetails } from '../../../../components/Sale/SaleDetails';
import CustomTable from '../../../../components/Shared/Table/CustomTable';
import { GlobalUtilityStyle } from '../../../../container/Styled';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGetAllSaleQuery } from '../../../../redux/services/sale/saleApi';
import { useFormatDate } from '../../../../utilities/hooks/useFormatDate';
import { usePagination } from '../../../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';
import { formatDate } from '../../../../utilities/lib/dateFormat';
import { getDateRange } from '../../../../utilities/lib/getDateRange';
import { useUrlIndexPermission } from '../../../../utilities/lib/getPermission';
import { saleColumns } from '../data/saleColumn';

export const SaleTable = ({
  keyword,
  summaryType,
  summary,
  setSummaryData,
  searchParams,
  segment,
  showPaging,
  action = true,
}) => {
  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);
  const currency = useSelector(useCurrency);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: {
      ...(showPaging ? pagination : {}),
      ...summaryType,
      summary,
      sale_daterange: searchParams?.created_daterange ?? getDateRange(segment),
    },
    keyword,
  });

  const { data, isLoading } = useGetAllSaleQuery(
    { params },
    {
      skip: !useUrlIndexPermission('sale'),
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

      return {
        key: id, // Unique key for each row
        id,
        date: formatDate(sale_at, format),
        reference: reference_id,
        customer: customers?.name,
        cashier: cashiers?.name,
        saleStatus: sale_status,
        paymentStatus: payment_status,
        grandTotal: showCurrency(grand_total ?? '0', currency),
        paid: showCurrency(paid_amount ?? '0', currency),
        due: showCurrency(due_amount ?? '0', currency),

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
        showPaging={showPaging}
        isLoading={isLoading}
        created_at={false}
        status={false}
        action={action}
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
