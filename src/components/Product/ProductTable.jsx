import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { GlobalUtilityStyle } from "../../container/Styled";
import CustomTable from "../Shared/Table/CustomTable";
import ProductEdit from "./ProductEdit";
import StatusModal from "../Shared/Modal/StatusModal";
import DeleteModal from "../Shared/Modal/DeleteModal";

const ProductTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [id, setId] = useState(undefined);

  const [statusModal, setStatusModal] = useState(false);
  const [statusId, setStatusId] = useState(undefined);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  // const { data, isLoading } = useGetDepartmentsQuery({
  //   params: pagination,
  // });

  // const total = data?.meta?.total;

  // const [deleteDepartment, { isLoading: isDeleting }] =
  // useDeleteDepartmentMutation();

  const getDetails = (id) => {
    setId(id);
    dispatch(openEditDrawer());
  };

  const handleStatusModal = (id) => {
    setStatusModal(true);
    setStatusId(id);
  };

  const handleStatus = async () => {
    console.log(statusId);
    // const { data } = await updateStatus(statusId);

    // if (data?.success) {
    //   setId(undefined);
    //   setStatusModal(false);
    // }
  };

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    // const { data } = await deleteDepartment(deleteId);
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
  //       action: { getDetails, handleDeleteModal },
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

      <ProductEdit id={id} setId={setId} />

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

export default ProductTable;
