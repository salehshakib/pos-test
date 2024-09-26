import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { useCurrentToken } from '../../redux/services/auth/authSlice';
import { useGetStockCountsQuery } from '../../redux/services/stockCount/stockCountApi';
import { STOCK_COUNT } from '../../utilities/apiEndpoints/inventory.api';
import { base_url } from '../../utilities/configs/base_url';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { downloadFile } from '../../utilities/lib/downloadFile';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import CustomTable from '../Shared/Table/CustomTable';
import { StockCountDetails } from './StockCountDetails';

const pageTitle = 'Stock Count';
const api = STOCK_COUNT;

const StockCountTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const token = useSelector(useCurrentToken);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: { ...pagination, ...searchParams },
    keyword,
  });

  const { data, isLoading } = useGetStockCountsQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );
  const total = data?.meta?.total;

  const handleFileDownload = (id, format) => {
    handleDownload(id, format);
  };

  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(
    async (id, format) => {
      setLoading(true);
      const fileUrl = new URL(`${base_url}/${api}/print/${id}`);
      const supportedFormats = {
        xlsx: 'xlsx',
        pdf: 'pdf',
        csv: 'csv',
      };

      if (!supportedFormats[format]) {
        console.error('Unsupported file format');
        return;
      }

      fileUrl.searchParams.append('format', format);

      try {
        const response = await fetch(fileUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to download file');
        }

        await downloadFile(response, supportedFormats[format], pageTitle);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api, token]
  );

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const dataSource =
    data?.results?.stockcount?.map((item) => {
      const {
        id,
        reference_id,
        created_at,
        type,
        warehouses,
        categories,
        brands,
      } = item ?? {};

      return {
        id,
        reference: reference_id,
        type: type,
        created_at,
        warehouse: warehouses?.map((item) => item?.name).join(' '),
        category: categories?.map((item) => item?.name).join(' '),
        brand: brands?.map((item) => item?.name).join(' '),
        handleDetailsModal,
        handleFileDownload,
      };
    }) ?? [];

  const hideModal = () => {
    setDetailsModal(false);
  };

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
        isLoading={isLoading || loading}
        isRowSelection={true}
        status={false}
        created_at={false}
      />

      {detailsId && (
        <StockCountDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}
    </GlobalUtilityStyle>
  );
};

export default StockCountTable;
