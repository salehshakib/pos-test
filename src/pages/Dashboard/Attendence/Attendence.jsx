import { useState } from "react";
import AttendenceCreate from "../../../components/Attendence/AttendenceCreate";
import { AttendenceTable } from "../../../components/Attendence/AttendenceTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    render: (brand) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {brand}
      </span>
    ),
  },
];

export const Attendence = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  // const [exportBrand, { isLoading }] = useExportBrandMutation();

  // const handleExport = async (format) => {
  //   const { data, error } = await exportBrand({
  //     data: { format },
  //   });

  //   console.log(data);
  // };

  return (
    <GlobalContainer
      pageTitle="Attendence"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      // handleExport={handleExport}
    >
      <AttendenceCreate />

      <AttendenceTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
