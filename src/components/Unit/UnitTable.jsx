import dayjs from "dayjs";
import { useState } from "react";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteUnitMutation,
  useGetAllUnitQuery,
} from "../../redux/services/unit/unitApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { useSelector } from "react-redux";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";

const UnitTable = ({ newColumns, setSelectedRows }) => {
  const pagination = useSelector(selectPagination);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllUnitQuery({
    params: { ...pagination, allData: 1 },
  });

  const total = data?.meta?.total;

  const [deleteUnit, { isLoading: isDeleting }] = useDeleteUnitMutation();

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteUnit(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  console.log(data);

  const dataSource =
    data?.results?.unit?.map((item) => {
      console.log(item);

      const { id, name, code, base_unit, created_at } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name: name,
        code: code,
        baseUnit: base_unit,
        created_at: date,
        action: { handleDeleteModal },
      };
    }) ?? [];

  const hideModal = () => {
    setDeleteModal(false);
  };

  // console.log(data?.results?.department);
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

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </GlobalUtilityStyle>
  );
};

export default UnitTable;
