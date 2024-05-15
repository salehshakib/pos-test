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

  const [id, setId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllCurrencyQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [updateCurrencyDefault, { isLoading: isStatusUpdating }] =
    useUpdateCurrencyDefaultMutation();

  const [deleteCurrency, { isLoading: isDeleting }] =
    useDeleteCurrencyMutation();

  const handleStatusModal = () => {
    setStatusModal(true);
  };

  const handleStatus = async () => {
    const { data } = await updateCurrencyDefault(id);
    if (data?.success) {
      setId(undefined);
      setStatusModal(false);
    }
  };

  const handleDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteCurrency(id);
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
        setId={setId}
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
