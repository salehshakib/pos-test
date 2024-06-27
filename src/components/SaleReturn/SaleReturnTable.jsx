import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteSaleReturnMutation,
  useGetAllSaleReturnQuery,
} from "../../redux/services/return/saleReturnApi";
import { useGlobalParams } from "../../utilities/hooks/useParams";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { SaleReturnDetails } from "./SaleReturnDetails";
import SaleReturnEdit from "./SaleReturnEdit";

const SaleReturnTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const params = useGlobalParams({
    isPagination: true,
    isDefaultParams: false,
    isRelationalParams: true,
  });

  const { data, isLoading } = useGetAllSaleReturnQuery({ params });

  const total = data?.meta?.total;

  const [deleteSaleReturn, { isLoading: isDeleting }] =
    useDeleteSaleReturnMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteSaleReturn(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.salereturn?.map((item) => {
      const { id, created_at, reference_id } = item;

      console.log(item);
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,

        // referenceNo: reference_id,
        created_at: date,
        handleEdit,
        handleDeleteModal,
        handleDetailsModal,
      };
    }) ?? [];

  const hideModal = () => {
    setDetailsModal(false);
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

      <SaleReturnEdit id={editId} setId={setEditId} />

      {detailsId && (
        <SaleReturnDetails
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
      />
    </GlobalUtilityStyle>
  );
};

export default SaleReturnTable;
