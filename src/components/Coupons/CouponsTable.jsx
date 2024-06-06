import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import CustomTable from "../Shared/Table/CustomTable";
import CouponsEdit from "./CouponsEdit";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import StatusModal from "../Shared/Modal/StatusModal";
import DeleteModal from "../Shared/Modal/DeleteModal";
import {
  useDeleteCouponMutation,
  useGetAllCouponQuery,
  useUpdateCouponStatusMutation,
} from "../../redux/services/coupon/couponApi";
import dayjs from "dayjs";

const CouponsTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [editId, setEditId] = useState(undefined);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllCouponQuery({
    params: { ...pagination, parent: 1, child: 1 },
  });

  const total = data?.meta?.total;

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateCouponStatusMutation();

  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
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

  console.log(data);

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
      };
    }) ?? [];

  const hideModal = () => {
    setStatusModal(false);
    setDeleteModal(false);
  };

  // console.log(data?.results?.department);
  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={newColumns}
        dataSource={dataSource}
        total={total}
        pagination={pagination}
        setPagination={setPagination}
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        isRowSelection={true}
      />

      <CouponsEdit id={editId} setId={setEditId} />

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
