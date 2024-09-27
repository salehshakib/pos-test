import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCurrency } from '../../redux/services/pos/posSlice';
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductStatusMutation,
} from '../../redux/services/product/productApi';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { showCurrency } from '../../utilities/lib/currency';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import StatusModal from '../Shared/Modal/StatusModal';
import CustomTable from '../Shared/Table/CustomTable';
import { ProductDetails } from './ProductDetails';
import ProductEdit from './ProductEdit';
import { expandedRowRender } from './ProductVariantTable';

const ProductTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(undefined);

  const currency = useSelector(useCurrency);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: {
      ...pagination,
      ...searchParams,
    },
    keyword,
  });

  const { data, isLoading } = useGetAllProductsQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const [updateProductStatus, { isLoading: isStatusUpdating }] =
    useUpdateProductStatusMutation();

  const handleStatusModal = (id) => {
    setStatusId(id);
    setStatusModal(true);
  };

  const handleStatus = async () => {
    const { data } = await updateProductStatus(statusId);

    if (data?.success) {
      setStatusId(undefined);
      setStatusModal(false);
    }
  };

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // deleteVariant
  // const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const [deleteVariantId, setDeleteVariantId] = useState(undefined);

  const handleDeleteVariantModal = (id) => {
    setDeleteVariantId(id);
    setDeleteModal(true);
  };

  const handleDeleteVariant = async () => {
    const { data } = await deleteProduct(deleteVariantId);
    if (data?.success) {
      setDeleteModal(false);
      setDeleteVariantId(undefined);
      // removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const handleDelete = async () => {
    const { data } = await deleteProduct(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const [current, setCurrent] = useState(0);

  const handleEditStockAndPrice = (id) => {
    setCurrent(1);
    handleEdit(id);
  };

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
        attachments,
        has_variant,
      } = item ?? {};

      return {
        id,
        name: name,
        sku: sku,
        img: attachments?.[0]?.url,
        type,
        brand: brands?.name,
        category: categories?.name,
        quantity: qty,
        unit: units?.base_unit ?? 'N/A',
        cost: showCurrency(cost, currency),
        price: showCurrency(price, currency),
        hasVariant: has_variant.toString() === '1' ? 'Yes' : 'No',
        status: is_active,
        created_at,
        handleStatusModal,
        handleDetailsModal,
        handleEdit,
        handleEditStockAndPrice,
        handleDeleteModal,
        handleDeleteVariantModal,
      };
    }) ?? [];

  const hideModal = () => {
    setStatusModal(false);
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
        expandable={{
          expandedRowRender: (record) =>
            expandedRowRender(record, data, currency),
          rowExpandable: (record) => record.hasVariant === 'Yes',
        }}
      />

      <ProductEdit
        id={editId}
        setId={setEditId}
        current={current}
        setCurrent={setCurrent}
      />

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
        handleDelete={deleteVariantId ? handleDeleteVariant : handleDelete}
        isLoading={isDeleting}
      />
    </GlobalUtilityStyle>
  );
};

export default ProductTable;
