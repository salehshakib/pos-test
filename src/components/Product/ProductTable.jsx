import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  openEditDrawer,
  setEditId,
} from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/services/product/productApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { ProductDetails } from "./ProductDetails";
import ProductEdit from "./ProductEdit";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";

const ProductTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const { editId } = useSelector((state) => state.drawer);
  const pagination = useSelector(selectPagination);

  // const [statusId, setStatusId] = useState(undefined);
  // const [statusModal, setStatusModal] = useState(false);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetProductsQuery({
    params: { ...pagination, allData: 1 },
  });

  const total = data?.meta?.total;

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const handleEdit = (id) => {
    dispatch(setEditId(id));
    dispatch(openEditDrawer());
  };

  // const handleStatusModal = (id) => {
  //   setStatusId(id);
  //   setStatusModal(true);
  // };

  // const handleStatus = async () => {
  //   console.log(id);
  //   // const { data } = await updateStatus( id);

  //   // if (data?.success) {
  //   //   setId(undefined);
  //   //   setStatusModal(false);
  //   // }
  // };

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

  const dataSource =
    data?.results?.product?.map((item) => {
      const {
        id,
        name,
        created_at,
        // is_active,
        sku,
        type,
        brand_id,
        category_id,
        qty,
        unit_id,
        buying_price: cost,
        selling_price: price,
      } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name: name,
        sku: sku,
        type,
        brand: brand_id,
        category: category_id,
        quantity: qty,
        unit: unit_id,
        cost: cost,
        price: price,
        // status: { status: is_active, handleStatusModal },
        created_at: date,
        action: { handleDetailsModal, handleEdit, handleDeleteModal },
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

      <ProductDetails
        id={detailsId}
        openModal={detailsModal}
        hideModal={hideModal}
      />

      {/* <StatusModal
    statusModal={statusModal}
    hideModal={hideModal}
    handleStatus={handleStatus}
    isLoading={isStatusUpdating}
  />

   */}

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
