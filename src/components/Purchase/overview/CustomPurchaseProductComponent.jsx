import { Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { PurchaseProductTable } from './PurchaseProductTable';
import { PurchaseSummary } from './PurchaseSummary';

export const CustomPurchaseProductComponent = ({
  children,
  onCustomSubmit,
  data,
}) => {
  const form = Form.useFormInstance();
  const warehouseId = Form.useWatch('warehouse_id', form);

  const [formValues, setFormValues] = useState({
    product_list: {
      qty: {},
      purchase_unit_id: {},
      net_unit_cost: {},
      discount: {},
      tax_rate: {}, // product  tax rate
      tax: {}, // product tax
      total: {},

      recieved: {},

      tax_id: {}, //product tax id for update form
    },
    units: {
      operator: {},
      operation_value: {},
    },
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setFormValues({
      product_list: {
        qty: {},
        purchase_unit_id: {},
        net_unit_cost: {},
        discount: {},
        tax_rate: {},
        tax: {},
        total: {},

        recieved: {},

        tax_id: {}, // product tax id for update form
      },
      units: {
        operator: {},
        operation_value: {},
      },
    });

    setProducts([]);
  }, [warehouseId]);

  const handleCustomSubmit = useCallback(() => {
    return formValues;
  }, [formValues]);

  onCustomSubmit(handleCustomSubmit);

  return (
    <>
      <PurchaseProductTable
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
      />
      {children}
      <PurchaseSummary formValues={formValues} />
    </>
  );
};
