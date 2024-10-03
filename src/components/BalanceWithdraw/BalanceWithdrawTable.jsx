import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import {
  useDeleteBalanceWithdrawMutation,
  useGetAllBalanceWithdrawQuery,
} from '../../redux/services/balanceWithdraw/balanceWithdrawApi';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import BalanceWithdrawDetails from '../BalanceWithdraw/BalanceWithdrawDetails';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import BalanceWithdrawEdit from './BalanceWithdrawEdit';

export const BalanceWithdrawTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    params: { ...pagination, ...searchParams, parent: 1 },
    keyword,
  });

  const { data, isLoading } = useGetAllBalanceWithdrawQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const [deleteBalanceDeposit, { isLoading: isDeleting }] =
    useDeleteBalanceWithdrawMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
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
    data?.results?.balancewithdrawal?.map((item) => {
      const {
        id,
        withdrawal_by,
        amount,
        withdrawal_at,
        withdrawal_type,
        withdrawal_account,
      } = item ?? {};

      return {
        id,
        withdrawal_by,
        amount,
        withdrawal_at,
        account: withdrawal_account?.name,
        account_type: withdrawal_account?.type,
        withdrawal_type,
        handleEdit,
        handleDeleteModal,
        handleDetailsModal,
      };
    }) ?? [];

  const hideModal = () => {
    setDetailsModal(false);
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
        status={false}
        created_at={false}
      />

      <BalanceWithdrawEdit id={editId} setId={setEditId} />

      {detailsId && (
        <BalanceWithdrawDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={'balance withdraw'}
      />
    </GlobalUtilityStyle>
  );
};

export default BalanceWithdrawTable;
