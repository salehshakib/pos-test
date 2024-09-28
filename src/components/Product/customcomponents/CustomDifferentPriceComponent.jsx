import { Col } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fullColLayout } from '../../../layout/FormLayout';
import { WarehouseComponent } from '../../ReusableComponent/WarehouseComponent';
import { DifferentPriceComponent } from '../overview/DifferentPriceComponent';

const updateStateWithProductData = (productVariantPrices, setFormValues) => {
  const priceList = {};

  productVariantPrices.forEach((item) => {
    item.product_prices.map((product) => {
      priceList[`${item.id}-${product.warehouse_id}`] = product.price;
    });
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
    },
  });

  const [products, setProducts] = useState([]);

  const handleCustomSubmit = useCallback(() => {
    return formValues;
  }, [formValues]);

  onCustomSubmit(handleCustomSubmit);

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      updateStateWithProductData(data?.variants, setFormValues);

      const productVariants =
        data?.variants?.flatMap((item) => {
          return item.product_qties.map((product) => {
            return {
              id: item.id,
              warehouse_id: product.warehouse_id,
              name: item.name,
            };
          });
        }) || [];

      setProducts(productVariants);
    } else {
      setFormValues({
        price_list: {
          price: {},
        },
      });
      setProducts([]);
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
