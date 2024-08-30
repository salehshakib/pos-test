import { Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PurchaseProductTable } from './PurchaseProductTable';
import { PurchaseSummary } from './PurchaseSummary';

const updateStateWithProductData = (purchaseProducts, setFormValues) => {
  const updatedQty = {};
  const updatedPurchaseUnitId = {};
  const updatedProductCost = {};
  const updatedDiscount = {};
  const updatedTaxRate = {};
  const updatedTax = {};
  const updatedTotal = {};
  const updatedRecieved = {};
  const updatedTaxId = {};

  const updatedOperator = {};
  const updatedOperationValue = {};

  purchaseProducts.forEach((item) => {
    updatedQty[item.product_id.toString()] = item.qty;
    updatedPurchaseUnitId[item.product_id.toString()] = item.purchase_unit_id;
    updatedProductCost[item.product_id.toString()] = item.net_unit_cost;
    updatedDiscount[item.product_id.toString()] = item.discount;
    updatedTaxRate[item.product_id.toString()] = item.tax_rate;
    updatedTax[item.product_id.toString()] = item.tax;
    updatedTotal[item.product_id.toString()] = item.total;
    updatedRecieved[item.product_id.toString()] = item.recieved;
    updatedTaxId[item.product_id.toString()] = item.products?.tax_id;

    updatedOperator[item.product_id.toString()] =
      item.products?.purchase_units?.operator;
    updatedOperationValue[item.product_id.toString()] =
      item.products?.purchase_units?.operation_value;
  });

  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    product_list: {
      ...prevFormValues.product_list,
      qty: {
        ...prevFormValues.product_list.qty,
        ...updatedQty,
      },
      purchase_unit_id: {
        ...prevFormValues.product_list.purchase_unit_id,
        ...updatedPurchaseUnitId,
      },
      net_unit_cost: {
        ...prevFormValues.product_list.net_unit_cost,
        ...updatedProductCost,
      },
      discount: {
        ...prevFormValues.product_list.discount,
        ...updatedDiscount,
      },
      tax_rate: {
        ...prevFormValues.product_list.tax_rate,
        ...updatedTaxRate,
      },
      tax: {
        ...prevFormValues.product_list.tax,
        ...updatedTax,
      },
      total: {
        ...prevFormValues.product_list.total,
        ...updatedTotal,
      },
      recieved: {
        ...prevFormValues.product_list.recieved,
        ...updatedRecieved,
      },
      tax_id: {
        ...prevFormValues.product_list.tax_id,
        ...updatedTaxId,
      },
    },
    units: {
      ...prevFormValues.units,
      operator: {
        ...prevFormValues.units.operator,
        ...updatedOperator,
      },
      operation_value: {
        ...prevFormValues.units.operation_value,
        ...updatedOperationValue,
      },
    },
  }));
};

export const CustomPurchaseProductComponent = ({
  children,
  onCustomSubmit,
  data,
}) => {
  const form = Form.useFormInstance();
  const warehouseId = Form.useWatch('warehouse_id', form);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

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

  //   console.log(products);

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      updateStateWithProductData(data?.purchase_products, setFormValues);

      const purchaseProducts = data?.purchase_products?.map((product) => ({
        id: product.product_id,
        name: product.products?.name,
        sku: product.products?.sku,
        buying_price: product.products?.buying_price,
        purchase_unit_id: product.purchase_unit_id,
        purchase_units: product.products?.purchase_units,
        tax_id: product.products?.tax_id,
        taxes: product.taxes,
      }));

      setProducts(purchaseProducts);
    } else {
      setProducts([]);
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
    }
  }, [data, isEditDrawerOpen]);

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
