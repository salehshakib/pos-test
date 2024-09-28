import { Row } from 'antd';
import { useState } from 'react';

import { PayrollCreate } from '../../../components/Payroll/PayrollCreate';
import { PayrollTable } from '../../../components/Payroll/PayrollTable';
import {
  DepartmentFilter,
  EmployeeFilter,
  PaymentTypeFilter,
} from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { PAYROLL } from '../../../utilities/apiEndpoints/hrm.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
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
    //department
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
  {
    title: 'Payment Type',
    dataIndex: 'paymentType',
    key: 'paymentType',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    align: 'right',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
  {
    title: 'Bonus',
    dataIndex: 'bonus',
    key: 'bonus',
    align: 'right',

    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
  {
    title: 'Loan',
    dataIndex: 'loan',
    key: 'loan',
    align: 'right',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <DepartmentFilter />
      <EmployeeFilter />
      <PaymentTypeFilter />
    </Row>
  );
};

export const Payroll = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Payroll"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={PAYROLL}
    >
      <PayrollCreate />

      <PayrollTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};
