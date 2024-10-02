import { Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useGetAllCategoryQuery } from '../../../redux/services/category/categoryApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import CategoryCreate from '../../Category/CategoryCreate';
import { CustomSelectButton } from '../../Shared/Select/CustomSelectButton';

export const CategoryComponent = () => {
  const form = Form.useFormInstance();
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading, isFetching } = useGetAllCategoryQuery({
    params,
  });

  const options = useMemo(() => {
    if (data?.results?.category) {
      return data.results.category.map((item) => ({
        value: item.id?.toString(),
        label: item.name,
      }));
    }
    return [];
  }, [data]);

  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    if (fetchData && !isFetching) {
      form.setFieldValue('category_id', options[0].value);
      setFetchData(false);
    }
  }, [form, fetchData, options, isFetching]);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  return (
    <>
      <CustomSelectButton
        label="Category"
        showSearch={true}
        required={true}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
        name={'category_id'}
        isLoading={isLoading}
      />

      <CategoryCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
        setFetchData={setFetchData}
      />
    </>
  );
};
