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
import { useGlobalParams } from "../../utilities/hooks/useParams";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import AdjustmentDetails from "./AdjustmentDetails";
import AdjustmentEdit from "./AdjustmentEdit";
const AdjustmentTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const editId = useSelector(selectEditId);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const params = useGlobalParams({
    isPagination: true,
    isDefaultParams: false,
    params: {
      parent: 1,
    },
    // isRelationalParams: true,
  });

  const { data, isLoading } = useGetAllAdjustmentQuery({ params });

  //console.log(data);

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
      const { id, note, created_at, warehouses, reference_id } = item ?? {};

      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        warehouse: warehouses?.name,
        reference: reference_id,
        created_at: date,
        note: note ?? "N/A",
        handleDetailsModal,
        handleEdit,
        handleDeleteModal,
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
        status={false}
      />

      <AdjustmentEdit id={editId} />

      {detailsId && (
        <AdjustmentDetails
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
        item={"adjustment"}
      />
    </GlobalUtilityStyle>
  );
};

export default AdjustmentTable;
