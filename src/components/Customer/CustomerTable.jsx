import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeleteCustomerMutation,
  useGetAllCustomerQuery,
} from "../../redux/services/customer/customerApi";
import {
  openEditDrawer,
  setEditId,
} from "../../redux/services/drawer/drawerSlice";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import CustomerEdit from "./CustomerEdit";

const CustomerTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  const { editId } = useSelector((state) => state.drawer);

  // const [statusId, setStatusId] = useState(undefined);
  // const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllCustomerQuery({
    params: { ...pagination, allData: 1 },
  });

  const total = data?.meta?.total;

  // const [updateStatus, { isLoading: isStatusUpdating }] =
  //   useUpdateCustomerStatusMutation();

  const [deleteCustomer, { isLoading: isDeleting }] =
    useDeleteCustomerMutation();

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
    const { data } = await deleteCustomer(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.customer?.map((item) => {
      const {
        id,
        name,
        email,
        company_name: companyName,
        phone_number: phone,
        address,
        created_at,
        is_active,
      } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        name: { name, email },
        companyName,
        phone,
        address,
        created_at: date,
        status: { status: is_active },
        action: { handleEdit, handleDeleteModal },
      };
    }) ?? [];

  const hideModal = () => {
    // setStatusModal(false);
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

      <CustomerEdit id={editId} />

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
        item={"customer"}
      />
    </GlobalUtilityStyle>
  );
};

export default CustomerTable;
