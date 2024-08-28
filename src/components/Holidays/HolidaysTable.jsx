import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useDeleteHolidayMutation,
  useGetAllHolidayQuery,
} from '../../redux/services/hrm/holiday/holidayApi';
import { useFormatDate } from '../../utilities/hooks/useFormatDate';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { formatDate } from '../../utilities/lib/dateFormat';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import { HolidayDetails } from './HolidayDetails';
import { HolidaysEdit } from './HolidaysEdit';

export const HolidaysTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  // const [statusId, setStatusId] = useState(undefined);
  // const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    params: { ...pagination, ...searchParams },
    keyword,
  });

  const { data, isLoading } = useGetAllHolidayQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  // const [updateStatus, { isLoading: isStatusUpdating }] =
  //   useUpdateHolidayStatusMutation();

  const [deleteHoliday, { isLoading: isDeleting }] = useDeleteHolidayMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  // const handleStatusModal = (id) => {
  //   setStatusId(id);
  //   setStatusModal(true);
  // };

  // const handleStatus = async () => {
  //   const { data } = await updateStatus(statusId);

  //   if (data?.success) {
  //     setStatusId(undefined);
  //     setStatusModal(false);
  //   }
  // };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteHoliday(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const format = useFormatDate();

  const dataSource =
    data?.results?.holiday?.map((item) => {
      const { id, title, description } = item ?? {};

      return {
        id,
        title,
        startDate: formatDate(item?.start_date, format),
        endDate: formatDate(item?.end_date, format),
        description,
        handleEdit,
        handleDetailsModal,
        handleDeleteModal,
      };
    }) ?? [];

  const hideModal = () => {
    setDetailsModal(false);
    // setStatusModal(false);
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

      <HolidaysEdit id={editId} setId={setEditId} />

      {detailsId && (
        <HolidayDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}

      {/* <StatusModal
        statusModal={statusModal}
        hideModal={hideModal}
        handleStatus={handleStatus}
        isLoading={isStatusUpdating}
      /> */}

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={'holiday'}
      />
    </GlobalUtilityStyle>
  );
};
