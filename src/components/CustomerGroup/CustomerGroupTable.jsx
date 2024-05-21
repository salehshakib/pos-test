import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteCustomerGroupMutation,
  useGetAllCustomerGroupQuery,
} from "../../redux/services/customerGroup/customerGroupApi";
import {
  openEditDrawer,
  setEditId,
} from "../../redux/services/drawer/drawerSlice";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { CustomerGroupEdit } from "./CustomerGroupEdit";

const CustomerGroupTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  const { editId } = useSelector((state) => state.drawer);

  // const [statusId, setStatusId] = useState(undefined);
  // const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllCustomerGroupQuery({
    params: { ...pagination, allData: 1 },
  });

  const total = data?.meta?.total;

  // const [updateStatus, { isLoading: isStatusUpdating }] =
  //   useUpda();

  const [deleteCustomerGroup, { isLoading: isDeleting }] =
    useDeleteCustomerGroupMutation();

  const handleEdit = (id) => {
    dispatch(setEditId(id));
    dispatch(openEditDrawer());
  };

  // const handleStatusModal = (id) => {
  //   setStatusId(id);
  //   setStatusModal(true);
  // };

  // const handleStatus = async () => {
  //   const { data } = await updateStatus(statusId);

  //   if (data?.success) {
  //     setStatusId(undefined);
  //     setStatusModal(false);
  //   }
  // };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteCustomerGroup(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.customergroup?.map((item) => {
      const { id, name, created_at, percentage } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name: name,
        percentage: percentage + " percent",
        created_at: date,
        action: { handleEdit, handleDeleteModal },
      };
    }) ?? [];

  const hideModal = () => {
    //   setStatusModal(false);
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

      <CustomerGroupEdit id={editId} />

      {/* <StatusModal
          statusModal={statusModal}
          hideModal={hideModal}
          handleStatus={handleStatus}
          isLoading={isStatusUpdating}
        /> */}

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={"customer group"}
      />
    </GlobalUtilityStyle>
  );
};

export default CustomerGroupTable;
