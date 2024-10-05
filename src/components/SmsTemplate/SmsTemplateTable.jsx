import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { openEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useDeleteSmsTemplateMutation,
  useGetAllSmsTemplateQuery,
} from '../../redux/services/smsTemplate/smsTemplateApi';
import { usePagination } from '../../utilities/hooks/usePagination';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { removeDeleteId } from '../../utilities/lib/signleDeleteRow';
import DeleteModal from '../Shared/Modal/DeleteModal';
import CustomTable from '../Shared/Table/CustomTable';
import SmsTemplateDetails from './SmsTemplateDetails';
import SmsTemplateEdit from './SmsTemplateEdit';

const SmsTemplateTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    params: { ...pagination, ...searchParams },
    keyword,
  });
  const { data, isLoading } = useGetAllSmsTemplateQuery({ params });

  const total = data?.meta?.total;

  const [deleteSmsTemplate, { isLoading: isDeleting }] =
    useDeleteSmsTemplateMutation();

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
    const { data } = await deleteSmsTemplate(deleteId);
    if (data?.success) {
      setDeleteModal(false);
      removeDeleteId(setSelectedRows, deleteId);
    }
  };

  const dataSource =
    data?.results?.messagetemplate?.map((item) => {
      const { id, created_at, is_active, act, name, subject } = item;

      return {
        id,
        act,
        name,
        subject,
        status: is_active,
        created_at,
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

      <SmsTemplateEdit id={editId} setId={setEditId} />

      {detailsId && (
        <SmsTemplateDetails
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
        item={'sms template'}
      />
    </GlobalUtilityStyle>
  );
};

export default SmsTemplateTable;
