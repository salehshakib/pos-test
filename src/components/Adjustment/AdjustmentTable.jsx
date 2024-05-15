import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteAdjustmentMutation,
  useGetAllAdjustmentQuery,
} from "../../redux/services/adjustment/adjustmentApi";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import AdjustmentEdit from "./AdjustmentEdit";
import AdjustmentDetails from "./AdjustmentDetails";

const AdjustmentTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const [id, setId] = useState(undefined);

  const [detailsModal, setDetailsModal] = useState(false);
  const [detailsId, setDetailsId] = useState(undefined);

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

  console.log(detailsId, id);

  const handleEditModal = () => {
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteAdjustment(id);
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
        action: { handleDetailsModal, handleEditModal, handleDeleteModal },
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
        pagination={pagination}
        setPagination={setPagination}
        setSelectedRows={setSelectedRows}
        isRowSelection={true}
        isLoading={isLoading}
        setId={setId}
      />

      <AdjustmentEdit id={id} setId={setId} />

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
      />
    </GlobalUtilityStyle>
  );
};

export default AdjustmentTable;
