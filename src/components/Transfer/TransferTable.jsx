import { Modal } from 'antd';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { useCurrency } from '../../redux/services/pos/posSlice';
import {
  useDeleteTransferMutation,
  useGetAllTransferQuery,
  useUpdateTransferStatusMutation,
} from '../../redux/services/transfer/transferApi';
import { useFormatDate } from '../../utilities/hooks/useFormatDate';
import { usePagination } from '../../utilities/hooks/usePagination';
// import { usePagination } from "../../utilities/hooks/usePagination";
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { showCurrency } from '../../utilities/lib/currency';
import { formatDate } from '../../utilities/lib/dateFormat';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import CustomForm from '../Shared/Form/CustomForm';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomTable from '../Shared/Table/CustomTable';
import { StockTransfer } from './StockTransfer';
import { TransferDetails } from './TransferDetails';

const options = [
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Send',
    label: 'Send',
  },
  {
    value: 'Transferred',
    label: 'Transferred',
  },
];

const FileStatusComponent = () => {
  return (
    <CustomSelect
      label="Status"
      placeholder={'Status'}
      options={options}
      name={'status'}
    />
  );
};

const TransferTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  // const dispatch = useDispatch();

  // const [editId, setEditId] = useState(undefined);
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
    params: {
      ...pagination,
      ...searchParams,
      parent: 1,
    },
    keyword,
  });

  const { data, isLoading } = useGetAllTransferQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const [updateTransferStatus, { isLoading: isStatusUpdating }] =
    useUpdateTransferStatusMutation();

  const [deleteTransfer, { isLoading: isDeleting }] =
    useDeleteTransferMutation();

  // const handleEdit = (id) => {
  //   setEditId(id);
  //   dispatch(openEditDrawer());
  // };

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const handleStatusModal = (id) => {
    setStatusId(id);
    setStatusModal(true);
  };

  const handleStatus = async (values) => {
    const statusData = {
      action_id: statusId,
      transfer_status: values.status,
      for: 'Transfer',
    };

    const { data } = await updateTransferStatus(statusData);

    if (data?.success) {
      setStatusId(undefined);
      setStatusModal(false);
    }
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteTransfer(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };
  const format = useFormatDate();

  const dataSource = data?.results?.transfer?.map((transfer) => {
    const {
      id,
      reference_id,
      from_warehouses,
      to_warehouses,
      date,
      total_cost,
      total_tax,
      grand_total,
      total_qty,
      status,
    } = transfer ?? {};

    return {
      key: id,
      id,
      qty: total_qty,
      reference: reference_id,
      warehouse_from: from_warehouses?.name,
      warehouse_to: to_warehouses?.name,
      date: formatDate(date, format),
      product_cost: showCurrency(total_cost, currency),
      product_tax: showCurrency(total_tax, currency),
      grand_total: showCurrency(grand_total, currency),
      status,
      // handleEdit,
      handleStatusModal,
      handleDeleteModal,
      handleDetailsModal,
    };
  });

  const hideModal = () => {
    setDetailsModal(false);
    setStatusModal(false);
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

      {/* <TransferEdit id={editId} setId={setEditId} /> */}

      {detailsId && (
        <TransferDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}

      <Modal
        title={
          <div className="flex items-center gap-3">
            <FaInfoCircle
              style={{
                fontSize: '20px',
              }}
            />
            <span>Status Update</span>
          </div>
        }
        open={statusModal}
        onCancel={hideModal}
        footer={null}
        centered
      >
        <GlobalUtilityStyle>
          <div className="my-10 -mb-11">
            <CustomForm
              handleSubmit={handleStatus}
              isLoading={isStatusUpdating}
            >
              <FileStatusComponent />
            </CustomForm>
          </div>
        </GlobalUtilityStyle>
      </Modal>

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />

      <StockTransfer />
    </GlobalUtilityStyle>
  );
};

export default TransferTable;
