import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteWarehouseMutation,
  useGetWarehousesQuery,
} from "../../redux/services/warehouse/warehouseApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import WarehouseEdit from "./WarehouseEdit";

const WarehouseTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [id, setId] = useState(undefined);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  const { data, isLoading } = useGetWarehousesQuery({
    params: { pagination, allData: 1 },
  });

  const total = data?.meta?.total;

  const [deleteWarehouse, { isLoading: isDeleting }] =
    useDeleteWarehouseMutation();

  const getDetails = (id) => {
    setId(id);
    dispatch(openEditDrawer());
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
      const { id, name, phone, email, address, created_at } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        warehouse: name,
        phone: phone,
        email: email,
        address: address,
        // status: { status: is_active, handleStatusModal },
        created_at: date,
        action: { getDetails, handleDeleteModal },
      };
    }) ?? [];

  const hideModal = () => {
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
