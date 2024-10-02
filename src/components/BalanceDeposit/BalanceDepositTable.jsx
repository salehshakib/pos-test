import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import {
  useDeleteBalanceDepositMutation,
  useGetAllBalanceDepositQuery,
  useUpdateBalanceDepositStatusMutation,
} from '../../redux/services/accountDeposit/accountDepositApi';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import StatusModal from '../Shared/Modal/StatusModal';
import CustomTable from '../Shared/Table/CustomTable';
import BalandeDepositDetails from './BalanceDepositDetails';
import BalanceDepositEdit from './BalanceDepositEdit';

export const BalanceDepositTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    params: { ...pagination, ...searchParams },
    keyword,
  });

  const { data, isLoading } = useGetAllBalanceDepositQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const [updateBalanceDepositStatus, { isLoading: isStatusUpdating }] =
    useUpdateBalanceDepositStatusMutation();

  const [deleteBalanceDeposit, { isLoading: isDeleting }] =
    useDeleteBalanceDepositMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const handleStatusModal = (id) => {
    setStatusId(id);
    setStatusModal(true);
  };

  const handleStatus = async () => {
    const { data } = await updateBalanceDepositStatus(statusId);

    if (data?.success) {
      setStatusId(undefined);
      setStatusModal(false);
    }
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteBalanceDeposit(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const dataSource =
    data?.results?.balancedeposit?.map((item) => {
      const {
        id,
        deposited_by,
        amount,
        deposited_at,
        deposited_type,
        is_active,
      } = item ?? {};

      return {
        id,
        deposited_by,
        amount,
        deposited_at,
        deposited_type,
        status: is_active,
        handleStatusModal,
        handleEdit,
        handleDeleteModal,
        handleDetailsModal,
      };
    }) ?? [];

  const hideModal = () => {
    setDetailsModal(false);
    setStatusModal(false);
    setDeleteModal(false);
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
      />

      <BalanceDepositEdit id={editId} setId={setEditId} />

      {detailsId && (
        <BalandeDepositDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}

      <StatusModal
        statusModal={statusModal}
        hideModal={hideModal}
        handleStatus={handleStatus}
        isLoading={isStatusUpdating}
      />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={'balance deposit'}
      />
    </GlobalUtilityStyle>
  );
};

export default BalanceDepositTable;
