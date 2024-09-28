import { useState } from 'react';

import WarehouseCreate from '../../../components/Warehouse/WarehouseCreate';
import WarehouseTable from '../../../components/Warehouse/WarehouseTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { WAREHOUSE } from '../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    //department
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    render: (warehouse) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {warehouse ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {'+880 ' + phone}
      </span>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {email ?? 'N/A'}
      </span>
    ),
  },
];

const Warehouse = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Warehouse"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={WAREHOUSE}
    >
      <WarehouseCreate />

      <WarehouseTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default Warehouse;
