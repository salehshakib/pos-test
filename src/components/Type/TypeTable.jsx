import { useState } from "react";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteTypeMutation,
  useGetTypesQuery,
} from "../../redux/services/types/typesApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import dayjs from "dayjs";

const TypeTable = ({ newColumns, setSelectedRows }) => {
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  const { data, isLoading } = useGetTypesQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [deleteType, { isLoading: isDeleting }] = useDeleteTypeMutation();

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    const { data } = await deleteType(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.type?.map((item) => {
      const { id, name, created_at } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name: name,
        time: date,
        action: { handleDeleteModal },
      };
    }) ?? [];

  const hideModal = () => {
    setDeleteModal(false);
  };

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

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </GlobalUtilityStyle>
  );
};

export default TypeTable;
