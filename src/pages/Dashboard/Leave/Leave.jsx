import { useState } from "react";
import { LeaveCreate } from "../../../components/Leave/LeaveCreate";
import { LeaveTable } from "../../../components/Leave/LeaveTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { LEAVE } from "../../../utilities/apiEndpoints/hrm.api";

const columns = [
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

  return (
    <GlobalContainer
      pageTitle="Leave"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={LEAVE}
    >
      <LeaveCreate />

      <LeaveTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};
