import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import {
  useDeleteStockCountMutation,
  useGetStockCountsQuery,
  useUpdateStockCountStatusMutation,
} from "../../redux/services/stockCount/stockCountApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import StockCountEdit from "./StockCountEdit";
import StatusModal from "../Shared/Modal/StatusModal";

const StockCountTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const pagination = useSelector(selectPagination);

  const [editId, setEditId] = useState(undefined);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetStockCountsQuery({
    params: { ...pagination, parent: 1 },
  });
  const total = data?.meta?.total;

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateStockCountStatusMutation();

  const [deleteStockCount, { isLoading: isDeleting }] =
    useDeleteStockCountMutation();

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
    const { data } = await deleteStockCount(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.stockcount?.map((item) => {
      const { id, reference_id, created_at, is_active, type } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        reference: reference_id,
        type: type,
        status: { status: is_active, handleStatusModal },
        created_at: date,
        action: { handleEdit, handleDeleteModal },
      };
    }) ?? [];

  const hideModal = () => {
    setStatusModal(false);
    setDeleteModal(false);
  };

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

      <StockCountEdit id={editId} setId={setEditId} />

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
        item={"stock count"}
      />
    </GlobalUtilityStyle>
  );
};

export default StockCountTable;
