import { Row } from 'antd';
import { useState } from 'react';

import defaultUser from '../../../assets/data/defaultUserImage';
import AttendanceCreate from '../../../components/Attendance/AttendanceCreate';
import { AttendanceTable } from '../../../components/Attendance/AttendanceTable';
import {
  DepartmentFilter,
  EmployeeFilter,
} from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { ATTENDANCE } from '../../../utilities/apiEndpoints/hrm.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Img',
    dataIndex: 'image',
    key: 'image',
    fixed: 'left',
    align: 'center',
    width: 70,
    render: (img) => (
      <div className="mx-auto h-8 w-8 overflow-hidden rounded-full">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: 'Name',
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
    //phone
    title: 'Check In',
    dataIndex: 'checkIn',
    key: 'checkIn',
    align: 'center',
    render: (checkIn) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {checkIn}
      </span>
    ),
  },
  {
    //phone
    title: 'Check Out',
    dataIndex: 'checkOut',
    key: 'checkOut',
    align: 'center',
    render: (checkOut) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {checkOut}
      </span>
    ),
  },
  {
    //phone
    title: 'Attendance Date',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    render: (date) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{date}</span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <DepartmentFilter />
      <EmployeeFilter />
    </Row>
  );
};

export const Attendance = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Attendance"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={ATTENDANCE}
    >
      <AttendanceCreate />

      <AttendanceTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};
