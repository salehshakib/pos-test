import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import {
  useDeleteLeaveTypeMutation,
  useGetAllLeaveTypeQuery,
} from "../../redux/services/settings/leaveType/leaveType";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { LeaveTypeEdit } from "./LeaveTypeEdit";

export const LeaveTypeTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  const [editId, setEditId] = useState(undefined);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllLeaveTypeQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [deleteBrand, { isLoading: isDeleting }] = useDeleteLeaveTypeMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteBrand(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.leavetype?.map((item) => {
      const { id, name, created_at, need_attachment } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name,
        attachmentable: need_attachment,
        created_at: date,
        handleEdit,
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

      <LeaveTypeEdit id={editId} setId={setEditId} />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={"leave-type"}
      />
    </GlobalUtilityStyle>
  );
};
