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
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import { LeaveDetails } from './LeaveDetails';
import { LeaveEdit } from './LeaveEdit';

function calculateLeaveDays(
  leaveStartDate,
  leaveEndDate,
  leaveDuration,
  leaveStartTime,
  leaveEndTime
) {
  const startDate = new Date(leaveStartDate);
  const endDate = new Date(leaveEndDate);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return 'Invalid date(s)';
  }

  // Calculate day difference between start and end dates
  const timeDifference = endDate.getTime() - startDate.getTime();
  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Handle leave in hours
  if (leaveDuration === 'hours') {
    const startTime = parseTime(leaveStartTime);
    const endTime = parseTime(leaveEndTime);

    if (!startTime || !endTime) {
      return 'Invalid time(s)';
    }

    const timeDiffInHours =
      (endTime.getTime() - startTime.getTime()) / (1000 * 3600);
    return timeDiffInHours + ' Hours';
  }

  // Handle half-day leave
  if (leaveDuration === 'half-day') {
    return 'Half Day';
  }

  // Handle full-day leave
  if (dayDifference < 2) {
    return 'One Day';
  }

  return dayDifference + ' Days';
}

// Helper function to parse time in 'HH:mm:ss' format
function parseTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return null; // Invalid time string
  }

  const time = new Date();
  time.setHours(hours, minutes, seconds, 0); // Set hours, minutes, and seconds to current day
  return time;
}

function formatTimeTo12Hour(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return 'Invalid time';
  }

  // Determine AM/PM and adjust hours for 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  let adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight and handle 12-hour format

  // Format minutes (don't need seconds for this display)
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${adjustedHours}:${formattedMinutes} ${period}`;
}

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
