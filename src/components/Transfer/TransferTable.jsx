import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import {
  useDeleteTransferMutation,
  useGetAllTransferQuery,
} from "../../redux/services/transfer/transferApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import TransferEdit from "./TransferEdit";

const TransferTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const pagination = useSelector(selectPagination);
  const [editId, setEditId] = useState(undefined);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllTransferQuery({
    params: { ...pagination, parent: 1 },
  });

  const total = data?.meta?.total;

  const [deleteTransfer, { isLoading: isDeleting }] =
    useDeleteTransferMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteTransfer(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource = data?.results?.transfer?.map((transfer) => {
    const {
      id,
      reference_id,
      from_warehouses,
      to_warehouses,
      date,
      total_cost,
      total_tax,
      grand_total,
      status,
    } = transfer;

    return {
      key: id,
      id,
      reference: reference_id,
      warehouse_from: from_warehouses?.name,
      warehouse_to: to_warehouses?.name,
      date: dayjs(date).format("DD-MM-YYYY"),
      product_cost: total_cost,
      product_tax: total_tax,
      grand_total: grand_total,
      status,
      handleEdit,
      handleDeleteModal,
    };
  });

  const hideModal = () => {
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
        status={false}
        created_at={false}
      />

      <TransferEdit id={editId} setId={setEditId} />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </GlobalUtilityStyle>
  );
};

export default TransferTable;
