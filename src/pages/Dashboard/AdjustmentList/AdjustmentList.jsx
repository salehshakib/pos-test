import { useState } from "react";
import AdjustmentCreate from "../../../components/Adjustment/AdjustmentCreate";
import AdjustmentTable from "../../../components/Adjustment/AdjustmentTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { ADJUSTMENT } from "../../../utilities/apiEndpoints/inventory.api";

const columns = [
  {
    title: "Reference ID",
    dataIndex: "reference",
    key: "reference",
    align: "center",
    render: (reference) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {reference}
      </span>
    ),
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    align: "center",
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
      </span>
    ),
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    align: "center",
    render: (note) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {note}
      </span>
    ),
  },
];

const AdjustmentList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Adjustment"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={ADJUSTMENT}
    >
      <AdjustmentCreate />

      <AdjustmentTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default AdjustmentList;
