import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import {
  useDeleteSaleMutation,
  useGetAllSaleQuery,
  useUpdateSaleStatusMutation,
} from "../../redux/services/sale/saleApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import StatusModal from "../Shared/Modal/StatusModal";
import CustomTable from "../Shared/Table/CustomTable";
import { SaleEdit } from "./SaleEdit";

export const SaleTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  const [editId, setEditId] = useState(undefined);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllSaleQuery({
    params: { ...pagination, parent: 1, child: 1 },
  });

  const total = data?.meta?.total;

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateSaleStatusMutation();

  const [deleteSale, { isLoading: isDeleting }] = useDeleteSaleMutation();

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
    const { data } = await deleteSale(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.sale?.map((item) => {
      const { id, sale_at, is_active, reference_id } = item ?? {};
      const date = dayjs(sale_at).format("DD-MM-YYYY");

      return {
        id,

        date: date,
        reference: reference_id,
        status: is_active,
        handleStatusModal,
        handleEdit,
        handleDeleteModal,
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
        created_at={false}
      />

      <SaleEdit id={editId} setId={setEditId} />

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
        item={"sale"}
      />
    </GlobalUtilityStyle>
  );
};
