import { useState } from 'react';

import SupplierCreate from '../../../components/Supplier/SupplierCreate';
import SupplierTable from '../../../components/Supplier/SupplierTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { SUPPLIER } from '../../../utilities/apiEndpoints/people.api';
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
        <span className="text-dark   text-xs font-medium md:text-sm">
          {name}
        </span>
        <span className=" 60 primary-text text-xs">{email}</span>
      </div>
    ),
  },
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
    render: (companyName) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {companyName}
      </span>
    ),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {'+880 ' + phone}
      </span>
    ),
  },
  {
    title: 'Vat Number',
    dataIndex: 'vatNumber',
    key: 'vatNumber',
    render: (vatNumber) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {vatNumber ?? 'N/A'}
      </span>
    ),
  },
];

// const SearchComponent = () => {
//   return (
//     <Row {...rowLayout}>
//       <CustomerGroupFilter />
//     </Row>
//   );
// };

export const Supplier = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Supplier"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      // searchFilterContent={<SearchComponent />}
      api={SUPPLIER}
    >
      <SupplierCreate />

      <SupplierTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};
