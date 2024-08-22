import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QuotationDetails } from '../../../../components/Generator/Quotation/overview/QuotationDetails';
import CustomTable from '../../../../components/Shared/Table/CustomTable';
import { GlobalUtilityStyle } from '../../../../container/Styled';
import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { useGetAllQuotationQuery } from '../../../../redux/services/quotation/quotationApi';
import { usePagination } from '../../../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../../../utilities/hooks/useParams';
import { showCurrency } from '../../../../utilities/lib/currency';
import { useUrlIndexPermission } from '../../../../utilities/lib/getPermission';
import { columns } from '../data/QuotationColumns';

export const QuotationTable = ({
  keyword,
  summaryType,
  summary,
  setSummaryData,
}) => {
  const currency = useSelector(useCurrency);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: {
      ...pagination,
      ...summaryType,
      summary,
    },
    keyword,
  });

  const { data, isLoading } = useGetAllQuotationQuery(
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

  const dataSource =
    data?.results?.quotation?.map((item) => {
      const {
        id,
        reference_id,
        cashiers,
        customers,
        suppliers,
        grand_total,
        created_at,
        warehouses,
      } = item ?? {};

      return {
        id,
        reference: reference_id,
        warehouse: warehouses?.name ?? 'N/A',
        cashier: cashiers?.name ?? 'N/A',
        customer: customers?.name ?? 'N/A',
        supplier: suppliers?.name ?? 'N/A',
        total: showCurrency(grand_total, currency),
        created_at,
        handleDetailsModal,
      };
    }) ?? [];

  const hideModal = () => {
    // setStatusModal(false);
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
        isLoading={isLoading}
        status={false}
      />

      {detailsId && (
        <QuotationDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}
    </GlobalUtilityStyle>
  );
};
