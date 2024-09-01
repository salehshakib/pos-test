import { useState } from 'react';

import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    render: (brand) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {brand}
      </span>
    ),
  },
];

const EmailTemplate = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Email Template"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      //   api={BRAND}
    >
      {/* <BrandCreate />

      <BrandTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      /> */}
    </GlobalContainer>
  );
};

export default EmailTemplate;
