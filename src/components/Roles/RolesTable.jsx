import dayjs from "dayjs";
import { useState } from "react";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteRolesMutation,
  useGetAllRolesQuery,
} from "../../redux/services/roles/rolesApi";
import { usePagination } from "../../utilities/hooks/usePagination";
import { useGlobalParams } from "../../utilities/hooks/useParams";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { RoleDetails } from "./RoleDetails";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import RolePermission from "./RolePermission";

export const RolesTable = ({ newColumns, setSelectedRows }) => {
  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    // isPagination: true,
    isDefaultParams: false,
    params: pagination,
  });

  const { data, isLoading } = useGetAllRolesQuery({ params });

  const total = data?.meta?.total;

  const [deleteRoles, { isLoading: isDeleting }] = useDeleteRolesMutation();

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteRoles(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const [changePermissionId, setChangePermissionId] = useState(undefined);
  const [changePermissionDrawer, setChangePermissionDrawer] = useState(false);

  const handleChangePermission = (id) => {
    setChangePermissionId(id);
    setChangePermissionDrawer(true);
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
        handleDetailsModal,
        handleChangePermission,
      };
    }) ?? [];

  const hideModal = () => {
    setDeleteModal(false);
    setDetailsModal(false);
  };

  const closeDrawer = () => {
    setChangePermissionId(undefined);
    setChangePermissionDrawer(false);
  };

  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={newColumns}
        dataSource={dataSource}
        total={total}
        pagination={pagination}
        updatePage={updatePage}
        updatePageSize={updatePageSize}
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        isRowSelection={true}
        status={false}
      />

      {changePermissionId && (
        <RolePermission
          changePermissionId={changePermissionId}
          open={changePermissionDrawer}
          closeDrawer={closeDrawer}
        />
      )}

      {detailsId && (
        <RoleDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}

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
