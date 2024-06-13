import { useState } from "react";
import { AnnoucementCreate } from "../../../components/Announcement/AnnouncementCreate";
import { AnnouncementTable } from "../../../components/Announcement/AnnouncementTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    title: "Title",
    dataIndex: "name",
    key: "name",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    title: "Departments",
    dataIndex: "departments",
    key: "departments",
    width: 300,
    render: (departments) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {departments?.mp((item) => item?.name)}
      </span>
    ),
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render: (startDate) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {startDate}
      </span>
    ),
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    render: (endDate) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {endDate}
      </span>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 300,
    render: (description) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {description ?? "N/A"}
      </span>
    ),
  },
];

export const Announcement = () => {
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
      pageTitle="Announcement"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      // handleExport={handleExport}
    >
      <AnnoucementCreate />

      <AnnouncementTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
