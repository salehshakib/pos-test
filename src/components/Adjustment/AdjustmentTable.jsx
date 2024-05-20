import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteAdjustmentMutation,
  useGetAllAdjustmentQuery,
} from "../../redux/services/adjustment/adjustmentApi";
import {
  openEditDrawer,
  selectEditId,
  setEditId,
} from "../../redux/services/drawer/drawerSlice";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import AdjustmentDetails from "./AdjustmentDetails";
import AdjustmentEdit from "./AdjustmentEdit";

const AdjustmentTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);
  const editId = useSelector(selectEditId);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllAdjustmentQuery({
    params: { ...pagination, allData: 1 },
  });

  const total = data?.meta?.total;

  const [deleteAdjustment, { isLoading: isDeleting }] =
    useDeleteAdjustmentMutation();

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const handleEdit = (id) => {
    dispatch(setEditId(id));
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteAdjustment(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.adjustment?.map((item) => {
      const { id, note, created_at, warehouse_id, reference_id } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        warehouse: warehouse_id,
        reference: reference_id,
        date: date,
        note: note ?? "N/A",
        action: { handleDetailsModal, handleEdit, handleDeleteModal },
      };
    }) ?? [];

  const hideModal = () => {
    setDeleteModal(false);
    setDetailsModal(false);
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

      <AdjustmentEdit id={editId} />

      <AdjustmentDetails
        id={detailsId}
        openModal={detailsModal}
        hideModal={hideModal}
      />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={"adjustment"}
      />
    </GlobalUtilityStyle>
  );
};

export default AdjustmentTable;
