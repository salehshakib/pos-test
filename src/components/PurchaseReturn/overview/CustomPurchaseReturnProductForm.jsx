import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TransactionSummary } from '../../ReusableComponent/TransactionSummary';
import { ReturnProductTable } from './ReturnProductTable';

const updateStateWithProductData = (
  purchaseProducts,
  setFormValues,
  purchase
) => {
  const updatedQty = {};
  const updatedMaxQty = {};
  const updatedPurchaseUnitId = {};
  const updatedProductCost = {};
  const updatedDiscount = {};
  const updatedTaxRate = {};
  const updatedTax = {};
  const updatedTotal = {};

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

    updatedTaxId[item.product_id.toString()] = item.products?.tax_id;

    updatedOperator[item.product_id.toString()] =
      item.products?.purchase_units?.operator;
    updatedOperationValue[item.product_id.toString()] =
      item.products?.purchase_units?.operation_value;

    if (purchase) {
      updatedMaxQty[item.product_id.toString()] = purchase.total_qty;
    }
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

      tax_id: {
        ...prevFormValues.product_list.tax_id,
        ...updatedTaxId,
      },

      max_return: {
        ...prevFormValues.product_list.max_return,
        ...(purchase ? updatedMaxQty : updatedQty),
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

export const CustomPurchaseReturnProductForm = ({
  children,
  onCustomSubmit,
  purchaseData,
  data,
}) => {
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const [formValues, setFormValues] = useState({
    product_list: {
      qty: {},
      purchase_unit_id: {},
      net_unit_cost: {},
      discount: {},
      tax_rate: {},
      tax: {},
      total: {},

      tax_id: {},
      max_return: {},
    },
    units: {
      operator: {},
      operation_value: {},
    },
  });

  const [products, setProducts] = useState([]);

  // Define a function to reset form values and products
  const resetFormAndProducts = useCallback(() => {
    setFormValues({
      product_list: {
        qty: {},
        purchase_unit_id: {},
        net_unit_cost: {},
        discount: {},
        tax_rate: {},
        tax: {},
        total: {},

        tax_id: {},
        max_return: {},
      },
      units: {
        operator: {},
        operation_value: {},
      },
    });
    setProducts([]);
  }, []);

  const handleCustomSubmit = useCallback(() => formValues, [formValues]);

  useEffect(() => {
    onCustomSubmit(handleCustomSubmit);
  }, [handleCustomSubmit, onCustomSubmit]);

  useEffect(() => {
    if (purchaseData) {
      const data = purchaseData;

      updateStateWithProductData(data?.purchase_products, setFormValues);

      const purchaseProducts = data?.purchase_products?.map((product) => ({
        id: product.product_id,
        name: product.products?.name,
        sku: product.products?.sku,
        buying_price: product.products?.buying_price,
        purchase_unit_id: product.purchase_unit_id,
        purchase_units: product.products?.purchase_units,
        tax_id: product.products?.tax_id,
        taxes: product?.products.taxes,
        purchaseQty: product?.qty,
      }));

      setProducts(purchaseProducts);
    } else if (data && isEditDrawerOpen) {
      updateStateWithProductData(
        data?.purchase_return_products,
        setFormValues,
        data?.purchase
      );

      const purchaseProducts = data?.purchase_return_products?.map(
        (product) => ({
          id: product.product_id,
          name: product.products?.name,
          sku: product.products?.sku,
          buying_price: product.products?.buying_price,
          purchase_unit_id: product.purchase_unit_id,
          purchase_units: product.products?.purchase_units,
          tax_id: product.products?.tax_id,
          taxes: product?.products.taxes,
          purchaseQty: product?.qty,
        })
      );

      setProducts(purchaseProducts);
    } else {
      resetFormAndProducts();
    }
  }, [data, isEditDrawerOpen, purchaseData, resetFormAndProducts]);

  return (
    <>
      <ReturnProductTable
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
      />

      {children}
      <TransactionSummary formValues={formValues} />
    </>
  );
};
