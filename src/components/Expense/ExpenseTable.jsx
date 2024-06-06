import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  openEditDrawer,
  setEditId,
} from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteExpenseMutation,
  useGetAllExpenseQuery,
} from "../../redux/services/expense/expenseApi";
import { selectPagination } from "../../redux/services/pagination/paginationSlice";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { ExpenseEdit } from "./ExpenseEdit";

const ExpenseTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);

  const { editId } = useSelector((state) => state.drawer);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllExpenseQuery({
    params: { ...pagination, parent: 1, child: 1 },
  });

  const total = data?.meta?.total;

  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();

  const handleEdit = (id) => {
    dispatch(setEditId(id));
    dispatch(openEditDrawer());
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteExpense(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  const dataSource =
    data?.results?.expense?.map((item) => {
      const {
        id,
        name,
        created_at,

        reference_id,
        warehouses,
        expense_categories,
        amount,
        reason,
      } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        reference: reference_id,
        warehouse: warehouses?.name,
        category: expense_categories?.name,
        amount,
        note: reason,
        name: name,
        // status: is_active,
        created_at: date,
        // handleStatusModal,
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
        status={false}
      />

      <ExpenseEdit id={editId} />

      <DeleteModal
        deleteModal={deleteModal}
        hideModal={hideModal}
        handleDelete={handleDelete}
        isLoading={isDeleting}
        item={"expense"}
      />
    </GlobalUtilityStyle>
  );
};

export default ExpenseTable;
