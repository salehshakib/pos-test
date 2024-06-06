import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteCurrencyMutation,
  useGetAllCurrencyQuery,
  useUpdateCurrencyDefaultMutation,
} from "../../redux/services/currency/currencyApi";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import DeleteModal from "../Shared/Modal/DeleteModal";
import StatusModal from "../Shared/Modal/StatusModal";
import CustomTable from "../Shared/Table/CustomTable";

const CurrencyTable = ({ newColumns, setSelectedRows }) => {
  const pagination = useSelector(selectPagination);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllCurrencyQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [updateCurrencyDefault, { isLoading: isStatusUpdating }] =
    useUpdateCurrencyDefaultMutation();

  const [deleteCurrency, { isLoading: isDeleting }] =
    useDeleteCurrencyMutation();

  const handleStatusModal = (id) => {
    setStatusId(id);
    setStatusModal(true);
  };

  const handleStatus = async () => {
    const { data } = await updateCurrencyDefault(statusId);
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
    const { data } = await deleteCurrency(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.currency?.map((item) => {
      const { id, name, created_at, is_default, code, exchange_rate } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name: name,
        code: code,
        exchangeRate: exchange_rate,
        status: is_default,
        handleStatusModal,
        created_at: date,
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
      />

      <StatusModal
        text="Do you want to change this currency default?"
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

export default CurrencyTable;
