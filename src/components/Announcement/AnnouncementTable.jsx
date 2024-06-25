import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteAnnouncementMutation,
  useGetAllAnnouncementQuery,
} from "../../redux/services/hrm/announcement/announcementApi";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { AnnouncementEdit } from "./AnnouncementEdit";

export const AnnouncementTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  const [editId, setEditId] = useState(undefined);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllAnnouncementQuery({
    params: { ...pagination, child: 1 },
  });

  const total = data?.meta?.total;

  const [deleteAnnouncement, { isLoading: isDeleting }] =
    useDeleteAnnouncementMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteAnnouncement(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.announcement?.map((item) => {
      //console.log(item);
      const { id, start_date, end_date, description, title } = item ?? {};
      const startDate = dayjs(start_date).format("DD-MM-YYYY");
      const endDate = dayjs(end_date).format("DD-MM-YYYY");

      return {
        id,
        name: title,
        startDate,
        endDate,
        description,
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
        created_at={false}
      />

      <AnnouncementEdit id={editId} setId={setEditId} />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={"announcement"}
      />
    </GlobalUtilityStyle>
  );
};
