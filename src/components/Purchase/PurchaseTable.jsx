import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCurrency } from '../../redux/services/pos/posSlice';
import {
  useDeletePurchaseMutation,
  useGetAllPurchaseQuery,
} from '../../redux/services/purchase/purchaseApi';
import { useFormatDate } from '../../utilities/hooks/useFormatDate';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { showCurrency } from '../../utilities/lib/currency';
import { formatDate } from '../../utilities/lib/dateFormat';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import { PurchaseDetails } from './PurchaseDetails';
import { PurchaseEdit } from './PurchaseEdit';

export const PurchaseTable = ({
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

  const { data, isLoading } = useGetAllPurchaseQuery(
    { params },
    {
      skip: !useUrlIndexPermission('purchase'),
    }
  );

  const total = data?.meta?.total;

  const [deletePurchase, { isLoading: isDeleting }] =
    useDeletePurchaseMutation();

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
    const { data } = await deletePurchase(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const format = useFormatDate();

  const dataSource =
    data?.results?.purchase?.map((item) => {
      const {
        id,
        created_at,
        reference_id,
        suppliers,
        warehouses,
        purchase_status,
        payment_status,
        grand_total,
        paid_amount,
        due_amount,
        is_active,
      } = item ?? {};

      const date = formatDate(created_at, format);

      return {
        id,
        date,
        reference: reference_id,
        warehouse: warehouses?.name,
        supplier: suppliers?.name,
        purchaseStatus: purchase_status,
        paymentStatus: payment_status,
        grandTotal: showCurrency(grand_total, currency),
        paid: showCurrency(paid_amount, currency),
        due: showCurrency(due_amount, currency),
        status: is_active,
        // handleStatusModal,
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
        created_at={false}
      />

      <PurchaseEdit id={editId} setId={setEditId} />

      {detailsId && (
        <PurchaseDetails
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
        item={'purchase'}
      />
    </GlobalUtilityStyle>
  );
};
