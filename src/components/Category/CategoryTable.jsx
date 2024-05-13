import { useDispatch } from "react-redux";
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

const CategoryTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [id, setId] = useState(undefined);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  const { data, isLoading } = useGetCategoriesQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const getDetails = (id) => {
    setId(id);
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    const { data } = await deleteCategory(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.category?.map((item) => {
      const { id, name, created_at, parent_id } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        category: name,
        parentCategory: parent_id ?? "N/A",
        created_at: date,
        action: { getDetails, handleDeleteModal },
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
      <Categoryedit id={id} setId={setId} />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </GlobalUtilityStyle>
  );
};

export default CategoryTable;
