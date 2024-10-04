import { Button, Modal } from 'antd';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import {
  useDeletePettyCashRequestMutation,
  useGetAllPettyCashRequestQuery,
  useUpdatePettyCashRequestStatusMutation,
} from '../../redux/services/pettyCashRequest/PettyCashRequestApi';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { showCurrency } from '../../utilities/lib/currency';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import { PettyCashRequestDetails } from './PettyCashRequestDetails';

const PettyCashRequestTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const currency = useSelector(useCurrency);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: { ...pagination, ...searchParams },
    keyword,
  });

  const { data, isLoading } = useGetAllPettyCashRequestQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const [deletePettyCashRequest, { isLoading: isDeleting }] =
    useDeletePettyCashRequestMutation();

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deletePettyCashRequest(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const [updatePettyCashRequestStatus, { isLoading: isStatusUpdating }] =
    useUpdatePettyCashRequestStatusMutation();

  const handleStatusModal = (id) => {
    setStatusId(id);
    setStatusModal(true);
  };

  const handleRejectStatus = async () => {
    const statusData = {
      id: statusId,
      status: 'Rejected',
    };

    const { data } = await updatePettyCashRequestStatus(statusData);

    if (data?.success) {
      setStatusId(undefined);
      setStatusModal(false);
    }
  };

  const handleAcceptedStatus = async () => {
    const statusData = {
      id: statusId,
      status: 'Accepted',
    };

    const { data } = await updatePettyCashRequestStatus(statusData);

    if (data?.success) {
      setStatusId(undefined);
      setStatusModal(false);
    }
  };

  const dataSource =
    data?.results?.cashrequest?.map((item) => {
      const { id, requested_by, created_at, amount, reason, status } =
        item ?? {};

      return {
        id,
        warehouse: item?.to_warehouses?.name,
        amount: showCurrency(amount, currency),
        reason,
        requested_by,
        created_at,
        status,
        handleStatusModal,
        handleDetailsModal,
        handleDeleteModal,
      };
    }) ?? [];

  const hideModal = () => {
    setDeleteModal(false);
    setStatusModal(false);
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
        isLoading={isLoading}
        isRowSelection={true}
        status={false}
      />

      {detailsId && (
        <PettyCashRequestDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}

      <Modal
        title={
          <div className="flex items-center gap-3">
            <FaInfoCircle
              style={{
                fontSize: '20px',
              }}
            />
            <span>Status Update</span>
          </div>
        }
        open={statusModal}
        onCancel={hideModal}
        footer={null}
        centered
      >
        <GlobalUtilityStyle>
          <span>
            Are you sure you want to update petty cash request status?
          </span>
          <div className="mt-5 flex items-center justify-end gap-3">
            <Button loading={isStatusUpdating} onClick={handleRejectStatus}>
              Reject
            </Button>
            <Button
              loading={isStatusUpdating}
              onClick={handleAcceptedStatus}
              type="primary"
            >
              Accept
            </Button>
          </div>
        </GlobalUtilityStyle>
      </Modal>

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={'petty cash request'}
      />
    </GlobalUtilityStyle>
  );
};

export default PettyCashRequestTable;
