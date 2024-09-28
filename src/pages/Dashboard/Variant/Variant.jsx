import { useState } from 'react';

import { VariantCreate } from '../../../components/Variant/VariantCreate';
import { VariantTable } from '../../../components/Variant/VariantTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { VARIANT } from '../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Attibute',
    dataIndex: 'variant',
    key: 'variant',
    render: (variant) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {variant}
      </span>
    ),
  },
  {
    title: 'Attribute Options',
    dataIndex: 'variantOptions',
    key: 'variantOptions',
    render: (variantOptions) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {variantOptions}
      </span>
    ),
  },
];

export const Variant = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Attribute"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={VARIANT}
    >
      <VariantCreate />

      <VariantTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};
