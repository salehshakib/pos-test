import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCurrency } from '../../redux/services/pos/posSlice';
import {
  useDeleteSaleReturnMutation,
  useGetAllSaleReturnQuery,
} from '../../redux/services/return/saleReturnApi';
import { useFormatDate } from '../../utilities/hooks/useFormatDate';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { showCurrency } from '../../utilities/lib/currency';
import { formatDate } from '../../utilities/lib/dateFormat';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import { SaleReturnDetails } from './SaleReturnDetails';
import SaleReturnEdit from './SaleReturnEdit';

const SaleReturnTable = ({
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
    params: { ...pagination, ...searchParams },
    keyword,
  });

  const { data, isLoading } = useGetAllSaleReturnQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

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
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const format = useFormatDate();

  const dataSource =
    data?.results?.salereturn?.map((item) => {
      const {
        id,
        reference_id,
        warehouses,
        cashiers,
        sale_return_at,
        grand_total,
        sale,
      } = item ?? {};

      return {
        id,
        referenceNo: reference_id,
        saleReference: sale?.reference_id,
        warehouse: warehouses?.name,
        cashier: cashiers?.name,
        date: formatDate(sale_return_at, format),
        grandTotal: showCurrency(grand_total ?? 0, currency),
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
