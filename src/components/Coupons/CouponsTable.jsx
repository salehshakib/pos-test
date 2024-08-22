import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalUtilityStyle } from '../../container/Styled';
import {
  useDeleteCouponMutation,
  useGetAllCouponQuery,
  useUpdateCouponStatusMutation,
} from '../../redux/services/coupon/couponApi';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import StatusModal from '../Shared/Modal/StatusModal';
import CustomTable from '../Shared/Table/CustomTable';

import { useCurrency } from '../../redux/services/pos/posSlice';
import { useFormatDate } from '../../utilities/hooks/useFormatDate';
import { showCurrency } from '../../utilities/lib/currency';
import { formatDate } from '../../utilities/lib/dateFormat';
import { CouponsDetails } from './CouponsDetails';
import CouponsEdit from './CouponsEdit';

const CouponsTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(undefined);
  const currency = useSelector(useCurrency);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: {
      ...pagination,
      ...searchParams,
    },
    keyword,
  });

  const { data, isLoading } = useGetAllCouponQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateCouponStatusMutation();

  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

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
    const { data } = await updateStatus(statusId);

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
    const { data } = await deleteCoupon(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const format = useFormatDate();

  const dataSource =
    data?.results?.coupon?.map((item) => {
      const {
        id,
        code,
        created_at,
        is_active,
        type,
        amount,
        minimum_amount,
        qty,
        user,
        expired_date,
      } = item ?? {};

      const date = formatDate(created_at, format);
      const expiredDate = formatDate(expired_date, format);

      return {
        id,
        couponCode: code,
        type,
        quantity: qty,
        createdBy: user?.name ?? user ?? 'N/A',
        amount:
          type === 'Fixed'
            ? showCurrency(amount ?? 0, currency)
            : amount + ' %',
        minimumAmount: showCurrency(minimum_amount ?? 0, currency),
        createdAt: date,
        expiredAt: expiredDate,
        // available: available ?? "N/A",
        status: is_active,
        created_at: date,
        handleStatusModal,
        handleEdit,
        handleDeleteModal,
        handleDetailsModal,
      };
    }) ?? [];

  const hideModal = () => {
    setStatusModal(false);
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
        created_at={false}
      />

      <CouponsEdit id={editId} setId={setEditId} />

      {detailsId && (
        <CouponsDetails
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
      />
    </GlobalUtilityStyle>
  );
};

export default CouponsTable;
