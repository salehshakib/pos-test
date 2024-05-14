import dayjs from "dayjs";
import { useState } from "react";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteCurrencyMutation,
  useGetAllCurrencyQuery,
  useUpdateCurrencyDefaultMutation,
} from "../../redux/services/currency/currencyApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import StatusModal from "../Shared/Modal/StatusModal";
import CustomTable from "../Shared/Table/CustomTable";

const CurrencyTable = ({ newColumns, setSelectedRows }) => {
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const [statusModal, setStatusModal] = useState(false);
  const [statusId, setStatusId] = useState(undefined);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  const { data, isLoading } = useGetAllCurrencyQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [updateCurrencyDefault, { isLoading: isStatusUpdating }] =
    useUpdateCurrencyDefaultMutation();

  const [deleteCurrency, { isLoading: isDeleting }] =
    useDeleteCurrencyMutation();

  const handleStatusModal = (id) => {
    setStatusModal(true);
    setStatusId(id);
  };

  const handleStatus = async () => {
    console.log(statusId);
    const { data } = await updateCurrencyDefault(statusId);

    if (data?.success) {
      // setId(undefined);
      setStatusModal(false);
    }
  };

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
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
        status: { status: is_default, handleStatusModal },
        created_at: date,
        action: { handleDeleteModal },
      };
    }) ?? [];

  const hideModal = () => {
    setStatusModal(false);
    setDeleteModal(false);
  };

  console.log(data?.results?.currency);

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
