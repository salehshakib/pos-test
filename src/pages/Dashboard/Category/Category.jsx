import { Row } from 'antd';
import { useState } from 'react';

import defaultUser from '../../../assets/data/defaultUserImage';
import CategoryCreate from '../../../components/Category/CategoryCreate';
import CategoryTable from '../../../components/Category/CategoryTable';
import { CategoryFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { CATEGORY } from '../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Img',
    dataIndex: 'img',
    key: 'img',
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
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (category) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {category}
      </span>
    ),
  },
  {
    title: 'Parent Category',
    dataIndex: 'parentCategory',
    key: 'parentCategory',
    render: (parentCategory) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {parentCategory}
      </span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <CategoryFilter label={'Parent Category'} name={'parent_category_ids'} />
    </Row>
  );
};

const Category = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Category"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={CATEGORY}
    >
      <CategoryCreate />

      <CategoryTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default Category;
