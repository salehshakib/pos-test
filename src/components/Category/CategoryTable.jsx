import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import CustomTable from "../Shared/Table/CustomTable";
import { useState } from "react";
import DeleteModal from "../Shared/Modal/DeleteModal";
import dayjs from "dayjs";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import Categoryedit from "./Categoryedit";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../redux/services/category/categoryApi";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";

const CategoryTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  const [editId, setEditId] = useState(undefined);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetCategoriesQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteCategory(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.category?.map((item) => {
      const { id, name, created_at, parent_id, is_active } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        category: name,
        parentCategory: parent_id ?? "N/A",
        created_at: date,
        status: { status: is_active },
        action: { handleEdit, handleDeleteModal },
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
      />
      <Categoryedit id={editId} setId={setEditId} />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={"category"}
      />
    </GlobalUtilityStyle>
  );
};

export default CategoryTable;
