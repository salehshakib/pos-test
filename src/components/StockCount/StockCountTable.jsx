import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteStockCountMutation,
  useGetStockCountsQuery,
} from "../../redux/services/stockCount/stockCountApi";
import { usePagination } from "../../utilities/hooks/usePagination";
import { useGlobalParams } from "../../utilities/hooks/useParams";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { StockCountDetails } from "./StockCountDetails";
import StockCountEdit from "./StockCountEdit";
import { useUrlIndexPermission } from "../../utilities/lib/getPermission";

const StockCountTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    // isPagination: true,
    isDefaultParams: false,
    parms: pagination,
    isRelationalParams: true,
  });

  const { data, isLoading } = useGetStockCountsQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );
  const total = data?.meta?.total;

  const [deleteStockCount, { isLoading: isDeleting }] =
    useDeleteStockCountMutation();

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
    const { data } = await deleteStockCount(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.stockcount?.map((item) => {
      const {
        id,
        reference_id,
        created_at,
        type,
        stock_warehouses,
        stock_categories,
        stock_brands,
      } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        reference: reference_id,
        type: type,
        created_at: date,
        warehouse: stock_warehouses?.name,
        category: stock_categories?.name,
        brand: stock_brands?.name,
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
        pagination={pagination}
        updatePage={updatePage}
        updatePageSize={updatePageSize}
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        isRowSelection={true}
        status={false}
      />

      <StockCountEdit id={editId} setId={setEditId} />

      {detailsId && (
        <StockCountDetails
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
        item={"stock count"}
      />
    </GlobalUtilityStyle>
  );
};

export default StockCountTable;
