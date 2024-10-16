import { useState } from 'react';

import CustomerGroupCreate from '../../../components/CustomerGroup/CustomerGroupCreate';
import CustomerGroupTable from '../../../components/CustomerGroup/CustomerGroupTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { CUSTOMER_GROUP } from '../../../utilities/apiEndpoints/helper.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{name}</span>
    ),
  },
  {
    title: 'Customer Count',
    dataIndex: 'count',
    key: 'count',
    align: 'center',
    render: (count) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {count}
      </span>
    ),
  },
];

const CustomerGroup = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Customer Group"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      // searchFilterContent={<SearchComponent />}
      api={CUSTOMER_GROUP}
    >
      <CustomerGroupCreate />

      <CustomerGroupTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default CustomerGroup;
