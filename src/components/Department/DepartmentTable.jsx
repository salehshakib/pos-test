import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
  useUpdateDepartmentStatusMutation,
} from "../../redux/services/hrm/department/departmentApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import StatusModal from "../Shared/Modal/StatusModal";
import CustomTable from "../Shared/Table/CustomTable";
import DepartmentEdit from "./DepartmentEdit";

const DepartmentTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [id, setId] = useState(undefined);

  const [statusModal, setStatusModal] = useState(false);
  const [statusId, setStatusId] = useState(undefined);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  const { data, isLoading } = useGetDepartmentsQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateDepartmentStatusMutation();

  const [deleteDepartment, { isLoading: isDeleting }] =
    useDeleteDepartmentMutation();

  const handleStatus = (id) => {
    setStatusModal(true);
    setStatusId(id);
  };

  const handleStatusUpdate = async () => {
    console.log(statusId);
    const { data } = await updateStatus(statusId);

    if (data?.success) {
      setId(undefined);
      setStatusModal(false);
    }
  };

  const getDetails = (id) => {
    setId(id);
    dispatch(openEditDrawer());
  };

  const handleDelete = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleDeleteDepartment = async () => {
    const { data } = await deleteDepartment(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.department?.map((item) => {
      const { id, name, created_at, is_active } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        department: name,
        status: { status: is_active, handleStatus },
        created_at: date,
        action: { getDetails, handleDelete },
      };
    }) ?? [];

  const hideModal = () => {
    setStatusModal(false);
    setDeleteModal(false);
  };

  console.log(data?.results?.department);

  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={newColumns}
        dataSource={dataSource}
        total={total}
        pagination={pagination}
        setPagination={setPagination}
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
      />

      <DepartmentEdit id={id} setId={setId} />

      <StatusModal
        statusModal={statusModal}
        hideModal={hideModal}
        handleStatusUpdate={handleStatusUpdate}
        isLoading={isStatusUpdating}
      />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDeleteDepartment={handleDeleteDepartment}
        isLoading={isDeleting}
      />
    </GlobalUtilityStyle>
  );
};

export default DepartmentTable;
