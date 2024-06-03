import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import { useGetAllPettyCashQuery } from "../../redux/services/pettycash/pettyCashApi";
import CustomTable from "../Shared/Table/CustomTable";

export const PettyCashTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  //   const [editId, setEditId] = useState(undefined);

  // const [statusId, setStatusId] = useState(undefined);
  // const [statusModal, setStatusModal] = useState(false);

  // const [deleteId, setDeleteId] = useState(undefined);
  // const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllPettyCashQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  // const [updateStatus, { isLoading: isStatusUpdating }] =
  //   useUpdateGiftCardStatusMutation();

  // const [deleteGiftCard, { isLoading: isDeleting }] =
  //   useDeleteGiftCardMutation();

  // const handleEdit = (id) => {
  //   setEditId(id);
  //   dispatch(openEditDrawer());
  // };

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

  // const handleDeleteModal = (id) => {
  //   setDeleteId(id);
  //   setDeleteModal(true);
  // };

  // const handleDelete = async () => {
  //   const { data } = await deleteGiftCard(deleteId);
  //   if (data?.success) {
  //     setDeleteModal(false);
  //   }
  // };

  console.log(data);

  const dataSource =
    data?.results?.pettycash?.map((item) => {
      const { id } = item;
      //   const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
      };
    }) ?? [];

  const hideModal = () => {
    // setStatusModal(false);
    // setDeleteModal(false);
  };

  // console.log(data?.results?.department);
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

      {/* <GiftCardEdit id={editId} setId={setEditId} /> */}

      {/* <StatusModal
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
      /> */}
    </GlobalUtilityStyle>
  );
};
