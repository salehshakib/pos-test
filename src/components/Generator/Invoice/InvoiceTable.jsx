import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../../container/Styled";
import {
  openEditDrawer,
  setEditId,
} from "../../../redux/services/drawer/drawerSlice";
import {
  useDeleteInvoiceMutation,
  useGetAllInvoiceQuery,
} from "../../../redux/services/invoice/invoiceApi";
import { selectPagination } from "../../../redux/services/pagination/paginationSlice";
import DeleteModal from "../../Shared/Modal/DeleteModal";
import CustomTable from "../../Shared/Table/CustomTable";
import InvoiceEdit from "./InvoiceEdit";

const InvoiceTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  const { editId } = useSelector((state) => state.drawer);

  // const [statusId, setStatusId] = useState(undefined);
  // const [statusModal, setStatusModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllInvoiceQuery({
    params: pagination,
  });

  const total = data?.meta?.total;

  // const [updateStatus, { isLoading: isStatusUpdating }] =
  //   useUpdateCustomerStatusMutation();

  const [deleteInvoice, { isLoading: isDeleting }] = useDeleteInvoiceMutation();

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
    const { data } = await deleteInvoice(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  console.log(data);

  const dataSource =
    data?.results?.invoice?.map((item) => {
      const {
        id,
        reference_id,
        warehouse_id,
        cashier_id,
        customer_id,
        supplier_id,
        grand_total,
        created_at,
        // is_active,
      } = item;
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        reference: reference_id,
        warehouse: warehouse_id,
        cashier: cashier_id,
        customer: customer_id,
        supplier: supplier_id,
        total: grand_total,
        date,
        actions: { handleEdit, handleDeleteModal },
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

      <InvoiceEdit id={editId} />

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
        item={"invoice"}
      />
    </GlobalUtilityStyle>
  );
};

export default InvoiceTable;
