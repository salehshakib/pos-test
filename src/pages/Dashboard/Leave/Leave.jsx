import { useState } from "react";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { LeaveCreate } from "../../../components/Leave/LeaveCreate";
import { LeaveTable } from "../../../components/Leave/LeaveTable";
import defaultUser from "../../../assets/data/defaultUserImage";

const columns = [
  {
    title: "Img",
    dataIndex: "image",
    key: "image",
    fixed: "left",
    align: "center",
    width: 70,
    render: (img) => (
      <div className="w-8 h-8 rounded-full overflow-hidden mx-auto">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name, record) => (
      <div className="flex flex-col cursor-pointer ">
        <span className="text-xs md:text-sm text-dark dark:text-white87 font-medium">
          {name}
        </span>
        <span className="text-xs dark:text-white60 primary-text">
          {record?.email}
        </span>
      </div>
    ),
  },
  {
    title: "Leave Type",
    dataIndex: "leaveType",
    key: "leaveType",
    render: (leaveType) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {leaveType}
      </span>
    ),
  },
  {
    title: "Leave Duration",
    dataIndex: "leaveDuration",
    key: "leaveDuration",
    align: "center",
    render: (leaveDuration) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {leaveDuration}
      </span>
    ),
  },
  {
    title: "Days",
    dataIndex: "days",
    key: "days",
    align: "center",
    render: (days) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {days}
      </span>
    ),
  },
];

export const Leave = () => {
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
      pageTitle="Leave"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      // handleExport={handleExport}
    >
      <LeaveCreate />

      <LeaveTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};
