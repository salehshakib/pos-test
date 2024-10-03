import { useState } from 'react';

import AttributeOptionCreate from '../../../components/AttributeOption/AttributeOptionCreate';
import AttributeOptionTable from '../../../components/AttributeOption/AttributeOptionTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { ATTRIBUTE_OPTION } from '../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Attribute Name',
    dataIndex: 'attribute',
    key: 'attribute',
    render: (attribute) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {attribute}
      </span>
    ),
  },
  {
    title: 'Attribute Option Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark text-xs font-medium md:text-sm">{name}</span>
    ),
  },
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
    render: (label) => (
      <span className="text-dark text-xs font-medium md:text-sm">
        {label ?? 'N/A'}
      </span>
    ),
  },
];

const AttributeOption = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Attribute Option"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={ATTRIBUTE_OPTION}
    >
      <AttributeOptionCreate />

      <AttributeOptionTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default AttributeOption;
