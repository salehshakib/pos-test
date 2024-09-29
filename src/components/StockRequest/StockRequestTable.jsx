import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { GlobalUtilityStyle } from '../../container/Styled';
import {
  useGetAllStockRequestQuery,
  useUpdateStockRequestStatusMutation,
} from '../../redux/services/stockRequest/stockRequestApi';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import CustomTable from '../Shared/Table/CustomTable';
import { StockRequestDetails } from './StockRequestDetails';

const StockRequestTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: { ...pagination, ...searchParams },
    keyword,
  });

  const { data, isLoading } = useGetAllStockRequestQuery(
    { params },
    {
      // skip: !useUrlIndexPermission(),
    }
  );
  const total = data?.meta?.total;

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const dataSource =
    data?.results?.stockrequest?.map((item) => {
      const {
        id,
        reference_id,
        created_at,
        status,
        transfer_status,
        from_warehouses,
        to_warehouses,
        stock_request_products,
      } = item ?? {};

      const sumNeedQty = (arr) => {
        return arr.reduce((sum, item) => sum + parseFloat(item.need_qty), 0);
      };

      return {
        id,
        reference: reference_id,
        status,
        transfer_status,
        fromWarehouse: from_warehouses?.name,
        toWarehouse: to_warehouses?.name,
        created_at,
        reqQty: sumNeedQty(stock_request_products),

        handleDetailsModal,
      };
    }) ?? [];

  const { state } = useLocation();
  const { id } = state ?? {};

  const navigate = useNavigate();

  const hideModal = () => {
    setDetailsModal(false);

    if (id) {
      navigate('/inventory/stock-request', { replace: true });
    }
  };

  const [updateStockRequestStatus] = useUpdateStockRequestStatusMutation();

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [acceptAndTransferLoading, setAcceptAndTransferLoading] =
    useState(false);

  const handleAccept = async () => {
    setAcceptLoading(true);

    const statusData = {
      action_id: detailsId,
      status: 'Accepted',
      transfer_status: 'Pending',
      for: 'StockRequest',
    };

    const { data } = await updateStockRequestStatus(statusData);

    if (data?.success) {
      hideModal();
    }

    setAcceptLoading(false);
  };

  const handleAcceptAndTransfer = async () => {
    setAcceptAndTransferLoading(true);

    const statusData = {
      action_id: detailsId,
      status: 'Accepted',
      transfer_status: 'Transferred',
      for: 'StockRequest',
    };

    const { data } = await updateStockRequestStatus(statusData);

    setAcceptAndTransferLoading(false);

    if (data?.success) {
      hideModal();

      navigate('/inventory/transfer', {
        state: {
          id: detailsId,
        },
      });
    }
  };

  const handleTransfer = async () => {
    setTransferLoading(true);
    const statusData = {
      action_id: detailsId,
      status: 'Accepted',
      transfer_status: 'Transferred',
      for: 'StockRequest',
    };

    const { data } = await updateStockRequestStatus(statusData);

    setTransferLoading(false);
    if (data?.success) {
      hideModal();
      navigate('/inventory/transfer', {
        state: {
          id: detailsId,
        },
      });
    }
  };

  const handleReject = async () => {
    setRejectLoading(true);

    const statusData = {
      action_id: detailsId,
      status: 'Rejected',
      transfer_status: 'Pending',
      for: 'StockRequest',
    };

    const { data } = await updateStockRequestStatus(statusData);

    if (data?.success) {
      hideModal();
    }

    setRejectLoading(false);
  };

  useEffect(() => {
    if (id) {
      setDetailsId(id);
      setDetailsModal(true);
    } else {
      setDetailsId(undefined);
      setDetailsModal(false);
    }
  }, [id]);

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
        isLoading={isLoading}
        isRowSelection={true}
        status={false}
      />

      {detailsId && (
        <StockRequestDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
          notification={true}
          showCloseButton={false}
          onAccept={handleAccept}
          onAcceptAndTransfer={handleAcceptAndTransfer}
          onTransfer={handleTransfer}
          onReject={handleReject}
          acceptLoading={acceptLoading}
          rejectLoading={rejectLoading}
          acceptAndTransferLoading={acceptAndTransferLoading}
          transferLoading={transferLoading}
        />
      )}
    </GlobalUtilityStyle>
  );
};

export default StockRequestTable;
