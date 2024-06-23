import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import {
  useDeleteRolesMutation,
  useGetAllRolesQuery,
} from "../../redux/services/roles/rolesApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";

export const RolesTable = ({ newColumns, setSelectedRows }) => {
  const pagination = useSelector(selectPagination);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllRolesQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [deleteRoles, { isLoading: isDeleting }] = useDeleteRolesMutation();

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteRoles(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.role?.map((item) => {
      const { id, name, created_at } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name: name,

        created_at: date,

        handleDeleteModal,
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
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        isRowSelection={true}
        status={false}
      />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={"role"}
      />
    </GlobalUtilityStyle>
  );
};
