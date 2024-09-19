import { Row } from 'antd';
import { useState } from 'react';

import CustomerCreate from '../../../components/Customer/CustomerCreate';
import CustomerTable from '../../../components/Customer/CustomerTable';
import { CustomerGroupFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { CUSTOMER } from '../../../utilities/apiEndpoints/people.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    render: ({ name, email }) => (
      <div className="flex cursor-pointer flex-col">
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
          {name}
        </span>
        <span className="dark:text-white60 primary-text text-xs">{email}</span>
      </div>
    ),
  },
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
    render: (companyName) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {companyName}
      </span>
    ),
  },

  {
    title: 'Customer Group',
    dataIndex: 'customerGroup',
    key: 'customerGroup',
    align: 'center',
    render: (customerGroup) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {customerGroup}
      </span>
    ),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {'+880 ' + phone}
      </span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <CustomerGroupFilter />
    </Row>
  );
};

const Customer = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Customer"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={CUSTOMER}
    >
      <CustomerCreate />

      <CustomerTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default Customer;
