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

export const CustomDifferentPriceComponent = ({
  onCustomSubmit,
  data,
  productId,
}) => {
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const [formValues, setFormValues] = useState({
    price_list: {
      price: {},
      product_variant_id: {},
      warehouse_id: {},
    },
  });

  const [products, setProducts] = useState([]);

  const handleCustomSubmit = useCallback(() => {
    return formValues;
  }, [formValues]);

  onCustomSubmit(handleCustomSubmit);

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      updateStateWithProductData(data?.product_prices, setFormValues);
    } else {
      setFormValues({
        price_list: {
          price: {},
          product_variant_id: {},
          warehouse_id: {},
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
        productId={productId}
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
};
