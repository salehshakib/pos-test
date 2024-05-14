import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "../../redux/services/brand/brandApi";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { BrandEdit } from "./BrandEdit";

export const BrandTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [id, setId] = useState(undefined);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  const { data, isLoading } = useGetBrandsQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();

  const getDetails = (id) => {
    setId(id);
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    const { data } = await deleteBrand(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };
  console.log(data?.results?.brand);

  const dataSource =
    data?.results?.brand?.map((item) => {
      const { id, name, created_at, attachments } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        brand: name,
        image: attachments?.[0]?.url,
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
        isRowSelection={true}
      />

      <BrandEdit id={id} setId={setId} />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </GlobalUtilityStyle>
  );
};
