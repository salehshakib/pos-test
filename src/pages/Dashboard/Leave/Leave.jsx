import { Row } from 'antd';
import { useState } from 'react';

import { LeaveCreate } from '../../../components/Leave/LeaveCreate';
import { LeaveTable } from '../../../components/Leave/LeaveTable';
import {
  DepartmentFilter,
  EmployeeFilter,
  LeaveTypeFilter,
} from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { LEAVE } from '../../../utilities/apiEndpoints/hrm.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Employee Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, record) => (
      <div className="flex cursor-pointer flex-col">
        <span className="text-dark   text-xs font-medium md:text-sm">
          {name}
        </span>
        <span className=" 60 primary-text text-xs">{record?.email}</span>
      </div>
    ),
  },
  {
    title: 'Leave Referrence',
    dataIndex: 'referrence',
    key: 'referrence',
    align: 'center',
    render: (referrence) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {referrence}
      </span>
    ),
  },
  {
    title: 'Leave Type',
    dataIndex: 'leaveType',
    key: 'leaveType',
    align: 'center',
    render: (leaveType) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {leaveType}
      </span>
    ),
  },
  {
    title: 'Leave Duration',
    dataIndex: 'leaveDuration',
    key: 'leaveDuration',
    align: 'center',
    render: (leaveDuration) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {leaveDuration}
      </span>
    ),
  },
  {
    title: 'Leave Start',
    dataIndex: 'leaveStartDate',
    key: 'leaveStartDate',
    align: 'center',
    render: (leaveStartDate) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {leaveStartDate}
      </span>
    ),
  },
  {
    title: 'Leave End',
    dataIndex: 'leaveEndDate',
    key: 'leaveEndDate',
    align: 'center',
    render: (leaveEndDate) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {leaveEndDate}
      </span>
    ),
  },

  {
    title: 'Days',
    dataIndex: 'days',
    key: 'days',
    align: 'center',
    render: (days) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{days}</span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <DepartmentFilter />
      <EmployeeFilter />
      <LeaveTypeFilter />
    </Row>
  );
};

export const Leave = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Leave"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={LEAVE}
    >
      <LeaveCreate />

      <LeaveTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};
