import { Col } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fullColLayout } from '../../../layout/FormLayout';
import { WarehouseComponent } from '../../ReusableComponent/WarehouseComponent';
import { DifferentPriceComponent } from '../overview/DifferentPriceComponent';

const updateStateWithProductData = (productPrices, setFormValues) => {
  const priceList = {};

  productPrices.forEach((item) => {
    priceList[item.warehouse_id.toString()] = item.price;
  });

  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    price_list: {
      ...prevFormValues.price_list,
      price: priceList,
    },
  }));
};

export const CustomDifferentPriceComponent = ({ onCustomSubmit, data }) => {
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const [formValues, setFormValues] = useState({
    price_list: {
      price: {},
    },
  });

  const [priceWarehouses, setPriceWarehouses] = useState([]);

  const handleCustomSubmit = useCallback(() => {
    return formValues;
  }, [formValues]);

  onCustomSubmit(handleCustomSubmit);

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      updateStateWithProductData(data?.product_prices, setFormValues);

      const priceWarehouseList = data?.product_prices?.map((item) => ({
        id: item.warehouse_id,
        name: item?.warehouses?.name ?? 'Not Specified',
      }));

      setPriceWarehouses(priceWarehouseList);
    } else {
      setPriceWarehouses([]);
      setFormValues({
        price_list: {
          price: {},
        },
      });
    }
  }, [data, isEditDrawerOpen]);

  return (
    <>
      <Col {...fullColLayout} className="pt-3">
        <WarehouseComponent />
      </Col>
      <DifferentPriceComponent
        formValues={formValues}
        setFormValues={setFormValues}
        priceWarehouses={priceWarehouses}
        setPriceWarehouses={setPriceWarehouses}
      />
    </>
  );
};
