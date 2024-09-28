import { Col } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fullColLayout } from '../../../layout/FormLayout';
import { WarehouseComponent } from '../../ReusableComponent/WarehouseComponent';
import { InitialStockComponent } from '../overview/InitialStockComponent';

const updateStateWithProductData = (productVariantQties, setFormValues) => {
  const stockList = {};

  productVariantQties.forEach((item) => {
    item.product_qties.map((product) => {
      stockList[`${item.id}-${product.warehouse_id}`] = product.qty;
    });
  });

  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    stock_list: {
      ...prevFormValues.stock_list,
      qty: stockList,
    },
  }));
};

export const CustomInititalStockComponent = ({
  onCustomSubmit,
  data,
  productId,
}) => {
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const [formValues, setFormValues] = useState({
    stock_list: {
      qty: {},
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
        stock_list: {
          qty: {},
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
      <InitialStockComponent
        productId={productId}
        products={products}
        setProducts={setProducts}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </>
  );
};
