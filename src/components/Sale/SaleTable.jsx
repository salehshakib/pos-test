import { Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GlobalUtilityStyle } from '../../container/Styled';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCurrency } from '../../redux/services/pos/posSlice';
import {
  useDeleteSaleMutation,
  useGetAllSaleQuery,
  useGetSaleDetailsQuery,
} from '../../redux/services/sale/saleApi';
import { useFormatDate } from '../../utilities/hooks/useFormatDate';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { showCurrency } from '../../utilities/lib/currency';
import { formatDate } from '../../utilities/lib/dateFormat';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import SellInvoice from '../Shared/Invoice/SellInvoice';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import { SaleDetails } from './SaleDetails';
import { SaleEdit } from './SaleEdit';

export const SaleTable = ({
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

  const [print, setPrint] = useState(false);
  const [printId, setPrintId] = useState(undefined);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: { ...pagination, ...searchParams },
    keyword,
  });

  const { data, isLoading } = useGetAllSaleQuery(
    { params },
    {
      skip: !useUrlIndexPermission('sale'),
    }
  );

  const handlePrintModal = (id) => {
    setPrintId(id);
    setPrint(true);
  };

  const { data: saleData, isFetching } = useGetSaleDetailsQuery(
    {
      id: printId,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !printId }
  );

  const total = data?.meta?.total;

  const [deleteSale, { isLoading: isDeleting }] = useDeleteSaleMutation();

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
    const { data } = await deleteSale(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };
  const format = useFormatDate();

  const navigate = useNavigate();

  const handleSaleReturn = (refId) => {
    navigate(`/return/sale-return?ref_id=${refId}`, {
      replace: true,
    });
  };

  const dataSource =
    data?.results?.sale?.map((item) => {
      const {
        id,
        sale_at,
        reference_id,
        customers,
        cashiers,
        sale_status,
        payment_status,
        grand_total,
        paid_amount,
        due_amount,
      } = item ?? {};

      return {
        key: id, // Unique key for each row
        id,
        date: formatDate(sale_at, format),
        reference: reference_id,
        customer: customers?.name,
        cashier: cashiers?.name,
        saleStatus: sale_status,
        paymentStatus: payment_status,
        grandTotal: showCurrency(grand_total, currency),
        paid: showCurrency(paid_amount ?? '0', currency),
        due: showCurrency(due_amount ?? '0', currency),
        handleEdit,
        handleDeleteModal,
        handleDetailsModal,
        handlePrintModal,
        handleSaleReturn,
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
        created_at={false}
        status={false}
      />

      <SaleEdit id={editId} setId={setEditId} />

      {detailsId && (
        <SaleDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}

      {print && printId && (
        <Modal
          open={print}
          onCancel={() => setPrint(false)}
          footer={null}
          width={1000}
          loading={isFetching}
          destroyOnClose
        >
          <SellInvoice invoice={saleData} />
        </Modal>
      )}

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={'sale'}
      />
    </GlobalUtilityStyle>
  );
};
