import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { openEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useDeleteSaleMutation,
  useGetAllSaleQuery,
} from "../../redux/services/sale/saleApi";
import { useGlobalParams } from "../../utilities/hooks/useParams";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";
import { SaleDetails } from "./SaleDetails";
import { SaleEdit } from "./SaleEdit";
import { usePagination } from "../../utilities/hooks/usePagination";
import { useUrlIndexPermission } from "../../utilities/lib/getPermission";

export const SaleTable = ({ newColumns, setSelectedRows }) => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(undefined);

  const [detailsId, setDetailsId] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    // isPagination: true,
    isDefaultParams: false,
    isRelationalParams: true,
    params: pagination,
  });

  const { data, isLoading } = useGetAllSaleQuery(
    { params },
    {
      skip: !useUrlIndexPermission(),
    }
  );

  const total = data?.meta?.total;

  const [deleteSale, { isLoading: isDeleting }] = useDeleteSaleMutation();

  const handleEdit = (id) => {
    setEditId(id);
    dispatch(openEditDrawer());
  };

  const handleDetailsModal = (id) => {
    setDetailsId(id);
    setDetailsModal(true);
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
        handleDetailsModal,
      };
    }) ?? [];

  const hideModal = () => {
    setDetailsModal(false);
    setDeleteModal(false);
  };

  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={newColumns}
        dataSource={dataSource}
        total={total}
        pagination={pagination}
        updatePage={updatePage}
        updatePageSize={updatePageSize}
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        isRowSelection={true}
        created_at={false}
        status={false}
      />

      <SaleEdit id={editId} setId={setEditId} />

      {detailsId && (
        <SaleDetails
          id={detailsId}
          openModal={detailsModal}
          hideModal={hideModal}
        />
      )}

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
