import { useState } from 'react';

import CashierCreate from '../../../components/Cashier/CashierCreate';
import CashierTable from '../../../components/Cashier/CashierTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { CASHIER } from '../../../utilities/apiEndpoints/people.api';
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
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {'+880 ' + phone}
      </span>
    ),
  },
  {
    title: 'Vat Number',
    dataIndex: 'vatNumber',
    key: 'vatNumber',
    render: (vatNumber) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {vatNumber ?? 'N/A'}
      </span>
    ),
  },
];

const Cashier = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Cashier"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      // searchFilterContent={<SearchComponent />}
      api={CASHIER}
    >
      <CashierCreate />

      <CashierTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default Cashier;
