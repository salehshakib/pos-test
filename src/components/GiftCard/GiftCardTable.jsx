import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteGiftCardMutation,
  useGetAllGiftCardQuery,
  useUpdateGiftCardStatusMutation,
} from "../../redux/services/giftcard/giftcard/giftCardApi";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import DeleteModal from "../Shared/Modal/DeleteModal";
import StatusModal from "../Shared/Modal/StatusModal";
import CustomTable from "../Shared/Table/CustomTable";
import GiftCardEdit from "./GiftCardEdit";
import dayjs from "dayjs";
import { GiftCardDetails } from "./GiftCardDetails";

const GiftCardTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const pagination = useSelector(selectPagination);

  const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllGiftCardQuery({
    params: { ...pagination, parent: 1 },
  });

  const total = data?.meta?.total;

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateGiftCardStatusMutation();

  const [deleteGiftCard, { isLoading: isDeleting }] =
    useDeleteGiftCardMutation();

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
    const { data } = await deleteGiftCard(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.giftcard?.map((item) => {
      const {
        id,
        card_no,
        amount,
        expense,
        expired_date,
        is_active,
        created_at,
        created_by,
        customers,
      } = item ?? {};

      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        cardNo: card_no,
        amount,
        expense: expense ?? "N/A",
        expiredDate: dayjs(expired_date).format("DD-MM-YYYY"),
        status: is_active,
        customer: customers?.name ?? "N/A",
        balance: amount - expense,
        createdBy: created_by ?? "N/A",
        created_at: date,
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

  // //console.log(data?.results?.department);
  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={newColumns}
        dataSource={dataSource}
        total={total}
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        isRowSelection={true}
      />

      <GiftCardEdit id={editId} setId={setEditId} />

      {detailsId && (
        <GiftCardDetails
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
export default GiftCardTable;
