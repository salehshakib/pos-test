import { Col } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fullColLayout } from '../../../layout/FormLayout';
import { WarehouseComponent } from '../../ReusableComponent/WarehouseComponent';
import { InitialStockComponent } from '../overview/InitialStockComponent';

const updateStateWithProductData = (productVariantQties, setFormValues) => {
  const stockList = {};

  console.log(productVariantQties);
  productVariantQties.forEach((item) => {
    item.product_qties.map((product) => {
      stockList[`${item.id}-${product.warehouse_id}`] = product.qty;
    });
  });

  // console.log(stockList);
  // setFormValues((prevFormValues) => ({
  //   ...prevFormValues,
  //   stock_list: stock,
  // }));

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
      updateStateWithProductData(data?.variants, setFormValues);

      const productVariants =
        data?.variants?.flatMap((item) => {
          return item.product_qties.map((product) => {
            const uid = `${item.id}-${product.warehouse_id}`; // Assuming you meant warehouse_id instead of warehouse
            return {
              id: uid,
              warehouse_id: product.warehouse_id, // Correcting to use warehouse_id
              name: item.name,
            };
          });
        }) || []; // Ensures that if data or variants are undefined, it returns an empty array

      // Example usage
      console.log(productVariants);

      setProducts(productVariants);
    } else {
      setFormValues({
        stock_list: {
          qty: {},
          product_variant_id: {},
          warehouse_id: {},
        },
      });
    }
  }, [data, isEditDrawerOpen]);

  console.log(products);

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
