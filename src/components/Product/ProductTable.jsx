import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  openEditDrawer,
  setEditId,
} from "../../redux/services/drawer/drawerSlice";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductStatusMutation,
} from "../../redux/services/product/productApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import StatusModal from "../Shared/Modal/StatusModal";
import CustomTable from "../Shared/Table/CustomTable";
import { ProductDetails } from "./ProductDetails";
import ProductEdit from "./ProductEdit";

const ProductTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const { editId } = useSelector((state) => state.drawer);
  const pagination = useSelector(selectPagination);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllProductsQuery({
    params: {
      ...pagination,
      parent: 1,
    },
  });

  const total = data?.meta?.total;

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateProductStatusMutation();

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

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

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
    const { data } = await deleteProduct(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  console.log(data);

  const dataSource =
    data?.results?.product?.map((item) => {
      const {
        id,
        name,
        created_at,
        is_active,
        sku,
        type,
        qty,
        buying_price: cost,
        selling_price: price,
        categories,
        brands,
        units,
      } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name: name,
        sku: sku,
        type,
        brand: brands?.name,
        category: categories?.name,
        quantity: qty,
        unit: units?.for ?? "N/A",
        cost: cost ?? "N/A",
        price: price,
        created_at: date,
        status: is_active,
        handleStatusModal,
        handleDetailsModal,
        handleEdit,
        handleDeleteModal,
      };
    }) ?? [];

  const hideModal = () => {
    // setStatusModal(false);
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
      />

      <ProductEdit id={editId} />

      {detailsId && (
        <ProductDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}

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

export default ProductTable;
