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

const ProductTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
  expandColumns,
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

  const handleDelete = async () => {
    const { data } = await deleteProduct(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
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
        handleDeleteModal,
      };
    }) ?? [];

  const hideModal = () => {
    setStatusModal(false);
    setDetailsModal(false);
    setDeleteModal(false);
  };

  const expandedRowRender = (record) => {
    if (record.hasVariant !== 'Yes') return null;

    // Handle variant data source here if needed
    const expandedData =
      data?.results?.product
        ?.find((product) => product.id === record.id)
        ?.variants?.map((variant) => ({
          id: variant.id,
          name: variant.name,
          sku: variant.sku,
          cost: showCurrency(variant.buying_price, currency),
          price: showCurrency(variant.selling_price, currency),
          created_at: variant.created_at,
          status: record.status,
          handleDetailsModal: record.handleDetailsModal,
          handleDeleteModal: record.handleDeleteModal,
        })) ?? [];

    return (
      <CustomTable
        columns={expandColumns}
        dataSource={expandedData}
        showPaging={false}
        status={false}
        tableStyleProps={{
          bordered: true,
          // backgroundColor: 'red',
          // scroll: {
          //   x: '1000',
          //   y: '300',
          // },
          scroll: {
            x: 'min-content',
          },
        }}
      />
    );
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
        // expendedRowRender={expandedRowRender}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.hasVariant === 'Yes',
          // fixed: 'left', // Show expandable icon only for rows with variants
        }}
      />

      <ProductEdit id={editId} setId={setEditId} />

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
