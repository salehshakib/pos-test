import { useState } from "react";
import { LeaveTypeCreate } from "../../../../components/LeaveType/LeaveTypeCreate";
import { LeaveTypeTable } from "../../../../components/LeaveType/LeaveTypeTable";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },

  {
    title: "Attachmentable",
    dataIndex: "attachmentable",
    key: "attachmentable",
    align: "center",

    render: (attachmentable) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {attachmentable === 1 ? "Needed" : "Don't Needed"}
      </span>
    ),
  },
];

export const LeaveType = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  // const [exportBrand, { isLoading }] = useExportBrandMutation();

  // const handleExport = async (format) => {
  //   const { data, error } = await exportBrand({
  //     data: { format },
  //   });

  //   //console.log(data);
  // };

  return (
    <GlobalContainer
      pageTitle="Leave Type"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      // handleExport={handleExport}
    >
      <LeaveTypeCreate />

      <LeaveTypeTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
