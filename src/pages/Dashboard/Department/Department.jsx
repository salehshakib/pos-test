import { useState } from 'react';

import DepartmentCreate from '../../../components/Department/DepartmentCreate';
import DepartmentTable from '../../../components/Department/DepartmentTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { DEPARTMENT } from '../../../utilities/apiEndpoints/hrm.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    render: (text) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{text}</span>
    ),
  },
];

const Department = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Department"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={DEPARTMENT}
    >
      <DepartmentCreate />

      <DepartmentTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default Department;
