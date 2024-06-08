import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import {
  useDeletePettyCashMutation,
  useGetAllPettyCashQuery,
} from "../../redux/services/pettycash/pettyCashApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";

export const PettyCashTable = ({ newColumns, setSelectedRows }) => {
  const pagination = useSelector(selectPagination);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllPettyCashQuery({
    params: { ...pagination, parent: 1 },
  });

  const total = data?.meta?.total;

  const [deletePettyCash, { isLoading: isDeleting }] =
    useDeletePettyCashMutation();

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deletePettyCash(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  console.log(data);

  const dataSource =
    data?.results?.pettycash?.map((item) => {
      const {
        id,
        created_at,
        reference_id,
        warehouses,
        opening_balance,
        status,
      } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        reference_id,
        open_at: date,
        closes_at: status === "Open" ? "N/A" : date,
        warehouse: warehouses?.name,
        cash_in_hand: opening_balance,
        status: status === "Open" ? 1 : 0,
        handleDeleteModal,
      };
    }) ?? [];

  const hideModal = () => {
    // setStatusModal(false);
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

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </GlobalUtilityStyle>
  );
};
