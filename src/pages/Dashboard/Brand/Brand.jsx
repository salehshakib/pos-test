import { useState } from 'react';

import defaultUser from '../../../assets/data/defaultUserImage';
import BrandCreate from '../../../components/Brand/BrandCreate';
import { BrandTable } from '../../../components/Brand/BrandTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { BRAND } from '../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Img',
    dataIndex: 'image',
    key: 'image',
    // fixed: 'left',
    align: 'center',
    width: 70,
    render: (img) => (
      <div className="mx-auto h-8 w-8 overflow-hidden rounded-md">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    render: (brand) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {brand}
      </span>
    ),
  },
];

const Brand = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Brand"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={BRAND}
    >
      <BrandCreate />

      <BrandTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default Brand;
