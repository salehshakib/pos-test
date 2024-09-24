import { Col } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fullColLayout } from '../../../layout/FormLayout';
import { WarehouseComponent } from '../../ReusableComponent/WarehouseComponent';
import { InitialStockComponent } from '../overview/InitialStockComponent';

const updateStateWithProductData = (setFormValues) => {
  const stock_list = {};

  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    qty_list: {
      ...prevFormValues.qty_list,
      qty: stock_list,
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
      updateStateWithProductData(data?.product_qties, setFormValues);
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
