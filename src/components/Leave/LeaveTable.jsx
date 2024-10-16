import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useDeleteLeaveMutation,
  useGetAllLeaveQuery,
} from '../../redux/services/hrm/leave/leaveApi';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import {
  calculateLeaveDays,
  formatTimeTo12Hour,
} from '../../utilities/lib/leave/leaveCalculation';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import { LeaveDetails } from './LeaveDetails';
import { LeaveEdit } from './LeaveEdit';

export const LeaveTable = ({
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
    params: {
      ...pagination,
      ...searchParams,
      parent: 1,
      child: 1,
    },
    keyword,
  });

  const { data, isLoading } = useGetAllLeaveQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const [deleteLeave, { isLoading: isDeleting }] = useDeleteLeaveMutation();

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
    const { data } = await deleteLeave(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const dataSource =
    data?.results?.leave?.map((item) => {
      const {
        id,
        employees,
        leave_types,
        leave_start_date,
        leave_end_date,
        leave_start_time,
        leave_end_time,
        leave_duration,
        reference_id,
      } = item ?? {};

      return {
        id,
        name: employees?.name,
        referrence: reference_id,
        leaveDuration: leave_duration,
        leaveType: leave_types?.name,
        leaveStartDate:
          leave_duration === 'hours'
            ? formatTimeTo12Hour(leave_start_time)
            : leave_start_date,
        leaveEndDate:
          leave_duration === 'hours'
            ? formatTimeTo12Hour(leave_end_time)
            : leave_end_date,
        days: calculateLeaveDays(
          leave_start_date,
          leave_end_date,
          leave_duration,
          leave_start_time,
          leave_end_time
        ),
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

      <LeaveEdit id={editId} setId={setEditId} />

      {detailsId && (
        <LeaveDetails
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
        item={'brand'}
      />
    </GlobalUtilityStyle>
  );
};
