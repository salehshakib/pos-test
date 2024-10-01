import { Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useGetBrandsQuery } from '../../../redux/services/brand/brandApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import BrandCreate from '../../Brand/BrandCreate';
import { CustomSelectButton } from '../../Shared/Select/CustomSelectButton';

export const BrandComponent = () => {
  const form = Form.useFormInstance();
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading, isFetching } = useGetBrandsQuery({
    params,
  });

  const options = useMemo(() => {
    if (data?.results?.brand) {
      return data.results.brand.map((item) => ({
        value: item.id?.toString(),
        label: item.name,
      }));
    }
    return [];
  }, [data]);

  const [fetchData, setFetchData] = useState(false);

  console.log(options?.[0]);

  console.log(fetchData);
  useEffect(() => {
    if (fetchData && !isFetching) {
      console.log(fetchData);
      form.setFieldValue('brand_id', options[0].value);
      setFetchData(false);
    }
  }, [form, fetchData, options]);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  return (
    <>
      <CustomSelectButton
        label="Brand"
        showSearch={true}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
        name={'brand_id'}
        isLoading={isLoading}
        required={'true'}
      />

      <BrandCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
        setFetchData={setFetchData}
      />
    </>
  );
};
