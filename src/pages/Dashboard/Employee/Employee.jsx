import { Row } from 'antd';
import { useState } from 'react';

import defaultUser from '../../../assets/data/defaultUserImage';
import EmployeeCreate from '../../../components/Employee/EmployeeCreate';
import EmployeeTable from '../../../components/Employee/EmployeeTable';
import {
  DepartmentFilter,
  DesignationFilter,
  EmployeeStatusFilter,
} from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { EMPLOYEE } from '../../../utilities/apiEndpoints/hrm.api';
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
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
          {name}
        </span>
        <span className="dark:text-white60 primary-text text-xs">
          {record?.email}
        </span>
      </div>
    ),
  },
  {
    //adress
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 300,
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {text}
      </span>
    ),
  },
  {
    //phone
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {'0' + phone}
      </span>
    ),
  },
  {
    //phone
    title: 'Join Date',
    dataIndex: 'join_date',
    key: 'join_date',
    align: 'center',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {text}
      </span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <DesignationFilter />
      <DepartmentFilter />
      <EmployeeStatusFilter />
    </Row>
  );
};

const Employee = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Employee"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={EMPLOYEE}
    >
      <EmployeeCreate />

      <EmployeeTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default Employee;
