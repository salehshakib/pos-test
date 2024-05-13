import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteWarehouseMutation,
  useGetWarehousesQuery,
  useUpdateWarehouseStatusMutation,
} from "../../redux/services/warehouse/warehouseApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import StatusModal from "../Shared/Modal/StatusModal";
import CustomTable from "../Shared/Table/CustomTable";
import WarehouseEdit from "./WarehouseEdit";

const WarehouseTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [id, setId] = useState(undefined);

  const [statusModal, setStatusModal] = useState(false);
  const [statusId, setStatusId] = useState(undefined);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  const { data, isLoading } = useGetWarehousesQuery({
    params: pagination,
  });

  console.log(data);

  const total = data?.meta?.total;

  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateWarehouseStatusMutation();

  const [deleteWarehouse, { isLoading: isDeleting }] =
    useDeleteWarehouseMutation();

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
    const { data } = await updateStatus(statusId);

    if (data?.success) {
      setId(undefined);
      setStatusModal(false);
    }
  };

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    const { data } = await deleteWarehouse(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.warehouse?.map((item) => {
      const { id, name, phone, email, address, created_at, is_active } =
        item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        warehouse: name,
        phone: phone,
        email: email,
        address: address,
        status: { status: is_active, handleStatusModal },
        created_at: date,
        action: { getDetails, handleDeleteModal },
      };
    }) ?? [];

  const hideModal = () => {
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
        setPagination={setPagination}
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        isRowSelection={true}
      />

      <WarehouseEdit id={id} setId={setId} />
      <StatusModal
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
      />
    </GlobalUtilityStyle>
  );
};

export default WarehouseTable;
