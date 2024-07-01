import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteCouponMutation,
  useGetAllCouponQuery,
  useUpdateCouponStatusMutation,
} from "../../redux/services/coupon/couponApi";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { usePagination } from "../../utilities/hooks/usePagination";
import { useGlobalParams } from "../../utilities/hooks/useParams";
import DeleteModal from "../Shared/Modal/DeleteModal";
import StatusModal from "../Shared/Modal/StatusModal";
import CustomTable from "../Shared/Table/CustomTable";
import { CouponsDetails } from "./CouponsDetails";
import CouponsEdit from "./CouponsEdit";
import { useUrlIndexPermission } from "../../utilities/lib/getPermission";

const CouponsTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  // const pagination = useSelector(selectPagination);

  const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    // isPagination: true,
    isDefaultParams: false,
    isRelationalParams: true,
    params: pagination,
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
    }
  };

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
        available,
      } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      const expiredDate = dayjs(expired_date).format("DD-MM-YYYY");

      return {
        id,
        couponCode: code,
        type,
        amount,
        quantity: qty,
        createdBy: user?.name ?? user ?? "N/A",
        minimumAmount: minimum_amount ?? 0,
        createdAt: date,
        expiredAt: expiredDate,
        available: available ?? "N/A",
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
