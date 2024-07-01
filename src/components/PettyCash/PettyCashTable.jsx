import dayjs from "dayjs";
import { useState } from "react";
import { GlobalUtilityStyle } from "../../container/Styled";
import {
  useDeletePettyCashMutation,
  useGetAllPettyCashQuery,
} from "../../redux/services/pettycash/pettyCashApi";
import { usePagination } from "../../utilities/hooks/usePagination";
import { useGlobalParams } from "../../utilities/hooks/useParams";
import DeleteModal from "../Shared/Modal/DeleteModal";
import CustomTable from "../Shared/Table/CustomTable";

export const PettyCashTable = ({ newColumns, setSelectedRows }) => {
  // const pagination = useSelector(selectPagination);

  const [deleteId, setDeleteId] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    // isPagination: true,
    isDefaultParams: false,
    params: { ...pagination, parent: 1 },
    // isRelationalParams: true,
  });

  const { data, isLoading } = useGetAllPettyCashQuery({
    params,
  });

  const total = data?.meta?.total;

  const [deletePettyCash, { isLoading: isDeleting }] =
    useDeletePettyCashMutation();

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    const { data } = await deletePettyCash(deleteId);
    if (data?.success) {
      setDeleteModal(false);
    }
  };

  //console.log(data);

  const dataSource =
    data?.results?.pettycash?.map((item) => {
      const {
        id,
        created_at,
        reference_id,
        warehouses,
        opening_balance,
        status,
      } = item ?? {};
      const date = dayjs(created_at).format("DD-MM-YYYY");

      return {
        id,
        reference_id,
        open_at: date,
        closes_at: status === "Open" ? "N/A" : date,
        warehouse: warehouses?.name,
        cash_in_hand: opening_balance,
        status: status === "Open" ? 1 : 0,
        handleDeleteModal,
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
        pagination={pagination}
        updatePage={updatePage}
        updatePageSize={updatePageSize}
        setSelectedRows={setSelectedRows}
        isLoading={isLoading}
        isRowSelection={true}
        created_at={false}
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
