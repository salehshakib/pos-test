import { useState } from 'react';

import ProductTableComponent from '../PosProductTableComponent';

export const CustomPosProductComponent = ({ children }) => {
  const [formValues, setFormValues] = useState({
    product_list: {
      qty: {},
      sale_unit_id: {},
      net_unit_price: {},
      discount: {},
      tax_rate: {},
      tax: {},
      total: {},

      tax_id: {},
    },
    units: {
      operator: {},
      operation_value: {},
    },
    coupon: {
      rate: {},
      min_amount: {},
    },
  });

  const [products, setProducts] = useState([]);
  return (
    <>
      <ProductTableComponent
        products={products}
        setProducts={setProducts}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      {children}
    </>
  );
};
