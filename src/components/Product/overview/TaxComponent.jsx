import { Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useGetAllTaxQuery } from '../../../redux/services/tax/taxApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { CustomSelectButton } from '../../Shared/Select/CustomSelectButton';
import TaxCreate from '../../Tax/TaxCreate';

export const TaxComponent = () => {
  const form = Form.useFormInstance();
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const params = useGlobalParams({
    selectValue: [...DEFAULT_SELECT_VALUES, 'rate'],
  });

  const { data, isFetching } = useGetAllTaxQuery({ params });

  const taxMethod = Form.useWatch('tax_method', form);
  const buyingPrice = Form.useWatch('buying_price', form);

  const [rate, setRate] = useState(0);

  useEffect(() => {
    if (taxMethod && buyingPrice) {
      if (taxMethod === 'Inclusive') {
        form.setFieldValue('purchase_amount', buyingPrice);
      } else {
        const purchaseAmount =
          parseFloat(buyingPrice) +
          parseFloat(buyingPrice) * (parseFloat(rate) / 100);
        form.setFieldValue('purchase_amount', purchaseAmount);
      }
    }
  }, [buyingPrice, form, rate, taxMethod]);

  const options = useMemo(() => {
    if (data?.results?.tax) {
      return data.results.tax.map((item) => ({
        value: item.id?.toString(),
        label: item.name,
        rate: item.rate,
      }));
    }
    return [];
  }, [data]);

  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    if (fetchData && !isFetching) {
      form.setFieldValue('tax_id', options[0].value);
      setFetchData(false);
    }
  }, [form, fetchData, options, isFetching]);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  const onSelect = (value, option) => {
    setRate(option.rate);
  };

  return (
    <>
      <CustomSelectButton
        label="Product VAT"
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
        name={'tax_id'}
        isLoading={isFetching}
        showSearch={true}
        onChange={(value, option) => onSelect(value, option)}
      />

      <TaxCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
        setFetchData={setFetchData}
      />
    </>
  );
};
