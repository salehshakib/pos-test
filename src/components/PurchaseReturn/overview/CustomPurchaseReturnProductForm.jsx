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
  const updatedReturnedQty = {};

  // Loop through each product and populate updated fields
  purchaseProducts.forEach((item) => {
    const productId = item?.product_variants.id.toString();

    updatedQty[productId] = item?.qty;
    updatedPurchaseUnitId[productId] = item?.product_variants?.purchase_unit_id;
    updatedProductCost[productId] = item?.product_variants?.net_unit_cost;
    updatedDiscount[productId] = item?.product_variants?.discount;
    updatedTaxRate[productId] = item?.product_variants?.tax_rate;
    updatedTax[productId] = item?.product_variants?.tax;
    updatedTotal[productId] = item?.product_variants?.total;
    updatedReturnedQty[productId] = item?.returned_qty;

    // Optional chaining for safe access
    updatedTaxId[productId] = item?.product_variants?.products?.tax_id;

    updatedOperator[productId] =
      item?.product_variants?.products?.purchase_units?.operator;
    updatedOperationValue[productId] =
      item?.product_variants?.products?.purchase_units?.operation_value;

    // Handle max quantity if purchase is true
    if (purchase) {
      updatedMaxQty[productId] = purchase.total_qty; // Ensure this is defined correctly in purchase
    }
  });

  // Update the state using the setFormValues callback
  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    product_list: {
      ...prevFormValues.product_list,
      qty: {
        ...prevFormValues.product_list.qty,
        ...updatedQty,
      },
      returend_qty: {
        ...prevFormValues.product_list.returend_qty,
        ...updatedReturnedQty,
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
      returned_qty: {},
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
        returned_qty: {},
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
        id: product?.product_variants?.id,
        name: product?.product_variants?.products?.name,
        sku: product?.product_variants?.products?.sku,
        buying_price: product?.product_variants?.products?.buying_price,
        purchase_unit_id: product?.product_variants?.purchase_unit_id,
        purchase_units: product?.product_variants?.products?.purchase_units,
        tax_id: product?.product_variants?.products?.tax_id,
        taxes: product?.product_variants?.products.taxes,
        returned_qty: product?.returned_qty,
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
          id: product?.product_variants?.id,
          name: product?.product_variants?.products?.name,
          sku: product?.product_variants?.products?.sku,
          buying_price: product?.product_variants?.products?.buying_price,
          purchase_unit_id: product?.product_variants?.purchase_unit_id,
          purchase_units: product?.product_variants?.products?.purchase_units,
          tax_id: product?.product_variants?.products?.tax_id,
          taxes: product?.product_variants?.products.taxes,
          returned_qty: product?.returned_qty,
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
