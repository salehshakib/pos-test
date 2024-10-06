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
  const productPrice = Form.useWatch('product_price', form);

  console.log(taxMethod);

  const [rate, setRate] = useState(0);

  useEffect(() => {
    if (productPrice) {
      if (taxMethod === 'Exclusive') {
        const purchaseAmount =
          parseFloat(productPrice) +
          parseFloat(productPrice) * (parseFloat(rate) / 100);

        console.log(purchaseAmount);
        form.setFieldValue('buying_price', purchaseAmount);
      } else {
        form.setFieldValue('buying_price', productPrice);
      }
    }
  }, [productPrice, form, rate, taxMethod]);

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

  const sale_amount = Form.useWatch('sale_amount', form);

  useEffect(() => {
    if (sale_amount) {
      const finalPrice =
        parseFloat(sale_amount) +
        parseFloat(sale_amount) * (parseFloat(rate) / 100);
      form.setFieldValue('selling_price', finalPrice);
    }
  }, [sale_amount, form, rate]);

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
