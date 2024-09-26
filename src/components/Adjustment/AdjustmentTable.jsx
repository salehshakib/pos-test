import { useState } from 'react';

import { GlobalUtilityStyle } from '../../container/Styled';
import {
  useDeleteAdjustmentMutation,
  useGetAllAdjustmentQuery,
} from '../../redux/services/adjustment/adjustmentApi';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { useUrlIndexPermission } from '../../utilities/lib/getPermission';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import AdjustmentDetails from './AdjustmentDetails';

const AdjustmentTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  // const dispatch = useDispatch();

  // const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    params: {
      ...pagination,
      ...searchParams,
    },
    isRelationalParams: true,
    keyword,
  });

  const { data, isLoading } = useGetAllAdjustmentQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const [deleteAdjustment, { isLoading: isDeleting }] =
    useDeleteAdjustmentMutation();

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteAdjustment(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const dataSource =
    data?.results?.adjustment?.map((item) => {
      const { id, note, created_at, warehouses, reference_id } = item ?? {};

      return {
        id,
        warehouse: warehouses?.name,
        reference: reference_id,
        created_at,
        note: note ?? 'N/A',
        handleDetailsModal,
        handleDeleteModal,
      };
    }) ?? [];

  const hideModal = () => {
    setDeleteModal(false);
    setDetailsModal(false);
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

      {/* <AdjustmentEdit id={editId} setId={setEditId} /> */}

      {detailsId && (
        <AdjustmentDetails
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
        item={'adjustment'}
      />
    </GlobalUtilityStyle>
  );
};

export default AdjustmentTable;
