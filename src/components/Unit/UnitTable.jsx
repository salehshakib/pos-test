import dayjs from "dayjs";
import { useState } from "react";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteUnitMutation,
  useGetAllUnitQuery,
  useUpdateUnitStatusMutation,
} from "../../redux/services/unit/unitApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { useSelector } from "react-redux";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import StatusModal from "../Shared/Modal/StatusModal";

const UnitTable = ({ newColumns, setSelectedRows }) => {
  const pagination = useSelector(selectPagination);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllUnitQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateUnitStatusMutation();

  const handleStatusModal = (id) => {
    setStatusId(id);
    setStatusModal(true);
  };

  const handleStatus = async () => {
    const { data } = await updateStatus(statusId);

    if (data?.success) {
      setStatusId(undefined);
      setStatusModal(false);
    }
  };

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

  const dataSource =
    data?.results?.unit?.map((item) => {
      const {
        id,
        name,
        code,
        base_unit,
        created_at,
        operator,
        operation_value,
        is_active,
        for: type,
      } = item ?? {};

      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name: name,
        code: code,
        type,
        operator,
        operatorValue: operation_value,
        status: is_active,
        baseUnit: base_unit,
        created_at: date,
        handleStatusModal,
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
      />

      <StatusModal
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

export default UnitTable;
