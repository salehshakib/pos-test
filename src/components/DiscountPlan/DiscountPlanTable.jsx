import { GlobalUtilityStyle } from "../../container/Styled";
import DeleteModal from "../Shared/Modal/DeleteModal";
import StatusModal from "../Shared/Modal/StatusModal";
import CustomTable from "../Shared/Table/CustomTable";
import DiscountPlanEdit from "./DiscountPlanEdit";

const DiscountPlanTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={newColumns}
        // dataSource={dataSource}
        // total={total}
        // pagination={pagination}
        // setPagination={setPagination}
        setSelectedRows={setSelectedRows}
        // isLoading={isLoading}
        isRowSelection={true}
      />

      <DiscountPlanEdit
      // id={editId} setId={setEditId}
      />

      <StatusModal
      // statusModal={statusModal}
      // hideModal={hideModal}
      // handleStatus={handleStatus}
      // isLoading={isStatusUpdating}
      />

      <DeleteModal
      // deleteModal={deleteModal}
      // hideModal={hideModal}
      // handleDelete={handleDelete}
      // isLoading={isDeleting}
      />
    </GlobalUtilityStyle>
  );
};

export default DiscountPlanTable;
