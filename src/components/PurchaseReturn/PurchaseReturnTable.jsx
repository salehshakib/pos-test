import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import CustomTable from "../Shared/Table/CustomTable";
import PurchaseReturnEdit from "./PurchaseReturnEdit";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";

const PurchaseReturnTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [editId, setEditId] = useState(undefined);

  const [statusId, setStatusId] = useState(undefined);
  const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  // const { data, isLoading } = useGetDepartmentsQuery({
  //   params: pagination,
  // });

  // const total = data?.meta?.total;

  // const [deleteDepartment, { isLoading: isDeleting }] =
  // useDeleteDepartmentMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleStatusModal = (id) => {
    setStatusId(id);
    setStatusModal(true);
  };

  const handleStatus = async () => {
    console.log(id);
    // const { data } = await updateStatus( id);

    // if (data?.success) {
    //   setId(undefined);
    //   setStatusModal(false);
    // }
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    // const { data } = await deleteDepartment( id);
    // if (data?.success) {
    //   setDeleteModal(false);
    // }
  };

  // const dataSource =
  //   data?.results?.department?.map((item) => {
  //     const { id, name, created_at, is_active } = item;
  //     const date = dayjs(created_at).format("DD-MM-YYYY");

  //     return {
  //       id,
  //       department: name,
  //       status: { status: is_active, handleStatusModal },
  //       created_at: date,
  //       action: { handleEdit, handleDeleteModal },
  //     };
  //   }) ?? [];

  const hideModal = () => {
    setStatusModal(false);
    setDeleteModal(false);
  };

  // console.log(data?.results?.department);
  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={newColumns}
        // dataSource={dataSource}
        // total={total}
        pagination={pagination}
        setPagination={setPagination}
        setSelectedRows={setSelectedRows}

        // isLoading={isLoading}
      />

      <PurchaseReturnEdit id={editId} setId={setEditId} />

      {/* <StatusModal
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
/> */}
    </GlobalUtilityStyle>
  );
};

export default PurchaseReturnTable;
