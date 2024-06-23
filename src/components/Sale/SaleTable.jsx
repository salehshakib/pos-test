import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import {
  useDeleteSaleMutation,
  useGetAllSaleQuery,
} from "../../redux/services/sale/saleApi";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { SaleEdit } from "./SaleEdit";

export const SaleTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  const [editId, setEditId] = useState(undefined);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllSaleQuery({
    params: { ...pagination, parent: 1, child: 1 },
  });

  const total = data?.meta?.total;

  const [deleteSale, { isLoading: isDeleting }] = useDeleteSaleMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteSale(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  // const dataSource =
  //   data?.results?.sale?.map((item) => {
  //     const { id, sale_at, reference_id } = item ?? {};
  //     const date = dayjs(sale_at).format("DD-MM-YYYY");

  //     return {
  //       id,

  //       date: date,
  //       reference: reference_id,

  //       handleEdit,
  //       handleDeleteModal,
  //     };
  //   }) ?? [];

  const dataSource =
    data?.results?.sale?.map((item) => {
      const {
        id,
        sale_at,
        reference_id,
        customers,
        cashiers,
        sale_status,
        payment_status,
        grand_total,
        paid_amount,
        due_amount,
      } = item ?? {};

      const date = dayjs(sale_at).format("DD-MM-YYYY");

      console.log(due_amount, paid_amount, payment_status);

      return {
        key: id, // Unique key for each row
        id,
        date,
        reference: reference_id,
        customer: customers?.name,
        cashier: cashiers?.name,
        saleStatus: sale_status,
        paymentStatus: payment_status,
        grandTotal: grand_total,
        paid: paid_amount,
        due: due_amount,
        handleEdit,
        handleDeleteModal,
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
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        isRowSelection={true}
        created_at={false}
        status={false}
      />

      <SaleEdit id={editId} setId={setEditId} />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={"sale"}
      />
    </GlobalUtilityStyle>
  );
};
