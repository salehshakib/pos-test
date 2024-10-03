import { Divider, Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ComboProductsComponent from '../overview/ComboProductsComponent';

const updateStateWithProductData = (comboProducts, setFormValues) => {
  const updatedQty = {};
  const updatedAmount = {};

  if (comboProducts.length) {
    comboProducts.forEach((item) => {
      updatedQty[item.combo_product_id.toString()] = item.qty;
      updatedAmount[item.combo_product_id.toString()] = item.price;
    });
  }

  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    product_list: {
      ...prevFormValues.product_list,
      qty: {
        ...prevFormValues.product_list.qty,
        ...updatedQty,
      },
      amount: {
        ...prevFormValues.product_list.amount,
        ...updatedAmount,
      },
    },
  }));
};

export const CustomProductComponent = ({ onCustomSubmit, data }) => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const [formValues, setFormValues] = useState({
    product_list: {
      qty: {},
      amount: {},
    },
  });

  const [products, setProducts] = useState([]);

  const handleCustomSubmit = useCallback(() => {
    return formValues;
  }, [formValues]);

  onCustomSubmit(handleCustomSubmit);

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      if (data?.type === 'Combo') {
        updateStateWithProductData(data?.product_combos, setFormValues);

        const productCombos = data?.product_combos?.map((item) => ({
          id: item?.combo_product_id,
          name: item?.products?.name ?? 'Not Specified',
          sku: item?.products?.sku ?? 'Not Specified',
        }));

        setProducts(productCombos);
      }
    } else {
      setProducts([]);
      setFormValues({
        product_list: {
          qty: {},
          amount: {},
        },
      });
    }
  }, [data, isEditDrawerOpen]);

  if (productType === 'Combo')
    return (
      <>
        <Divider orientation="left" orientationMargin={10}>
          Combo Products
        </Divider>
        <ComboProductsComponent
          formValues={formValues}
          setFormValues={setFormValues}
          products={products}
          setProducts={setProducts}
        />
      </>
    );

  return null;
};
