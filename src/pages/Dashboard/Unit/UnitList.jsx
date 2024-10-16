import { Row } from 'antd';
import { useState } from 'react';

import {
  BaseUnitFilter,
  UnitForFilter,
} from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import UnitCreate from '../../../components/Unit/UnitCreate';
import UnitTable from '../../../components/Unit/UnitTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { UNIT } from '../../../utilities/apiEndpoints/helper.api';
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
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    render: (code) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{code}</span>
    ),
  },

  {
    title: 'Base Unit',
    dataIndex: 'baseUnit',
    key: 'baseUnit',
    align: 'center',
    render: (baseUnit) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {baseUnit ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Operator',
    dataIndex: 'operator',
    key: 'operator',
    align: 'center',
    render: (operator) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {operator ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Operator Value',
    dataIndex: 'operatorValue',
    key: 'operatorValue',
    align: 'center',
    render: (operatorValue) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {operatorValue ?? 'N/A'}
      </span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <BaseUnitFilter />
      <UnitForFilter />
    </Row>
  );
};

const UnitList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Unit"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={UNIT}
    >
      <UnitCreate />

      <UnitTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default UnitList;
