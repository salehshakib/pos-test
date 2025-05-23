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

  purchaseProducts.forEach((item) => {
    const productId = item?.product_variants?.id.toString();

    updatedQty[productId] = item?.qty - item.returned_qty;
    updatedPurchaseUnitId[productId] = item?.product_variants?.purchase_unit_id;
    updatedProductCost[productId] = item?.product_variants?.net_unit_cost;
    updatedDiscount[productId] = item?.product_variants?.discount;
    updatedTaxRate[productId] = item?.product_variants?.tax_rate;
    updatedTax[productId] = item?.product_variants?.tax;
    updatedTotal[productId] = item?.product_variants?.total;

    // Optional chaining for safe access
    updatedTaxId[productId] = item?.product_variants?.products?.tax_id;

    updatedOperator[productId] =
      item?.product_variants?.products?.purchase_units?.operator;
    updatedOperationValue[productId] =
      item?.product_variants?.products?.purchase_units?.operation_value;

    updatedReturnedQty[productId] = item?.returned_qty;

    // Handle max quantity if purchase is true
    if (purchase) {
      updatedQty[productId] = parseInt(
        purchase.purchase_products.find(
          (item) => item.product_variant_id.toString() === productId.toString()
        ).qty
      );

      updatedMaxQty[productId] = parseInt(
        purchase.purchase_products.find(
          (item) => item.product_variant_id.toString() === productId.toString()
        ).qty
      );
      // -
      // parseInt(
      //   purchase.purchase_products.find(
      //     (item) =>
      //       item.product_variant_id.toString() === productId.toString()
      //   ).returned_qty
      // );
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
      returned_qty: {
        ...prevFormValues.product_list.returned_qty,
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

      tax_id: {},
      max_return: {},

      returned_qty: {},
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

        returned_qty: {},
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
    if (purchaseData?.purchase_products) {
      const data = purchaseData;

      updateStateWithProductData(data?.purchase_products, setFormValues);

      const purchaseProducts = data?.purchase_products?.map((product) => ({
        id: product?.product_variants?.id,
        name: product?.product_variants?.name,
        sku: product?.product_variants?.products?.sku,
        buying_price: product?.product_variants?.products?.buying_price,
        purchase_unit_id: product?.product_variants?.purchase_unit_id,
        purchase_units: product?.product_variants?.products?.purchase_units,
        tax_id: product?.product_variants?.products?.tax_id,
        taxes: product?.product_variants?.products.taxes,
        purchaseQty: product?.qty,
        returned_qty: product?.returned_qty,
      }));

      setProducts(purchaseProducts);
    } else if (data && isEditDrawerOpen) {
      updateStateWithProductData(
        data?.purchase_return_products,
        setFormValues,
        data?.purchase
      );

      const purchaseProducts = data?.purchase_return_products?.map(
        (returnProduct) => {
          const matchedPurchaseProduct =
            data?.purchase?.purchase_products?.find(
              (purchaseProduct) =>
                purchaseProduct?.purchase_unit_id ===
                returnProduct?.product_variants?.purchase_unit_id
            );

          return {
            id: returnProduct?.product_variants?.id,
            name: returnProduct?.product_variants?.products?.name,
            sku: returnProduct?.product_variants?.products?.sku,
            buying_price:
              returnProduct?.product_variants?.products?.buying_price,
            purchase_unit_id: returnProduct?.product_variants?.purchase_unit_id,
            purchase_units:
              returnProduct?.product_variants?.products?.purchase_units,
            tax_id: returnProduct?.product_variants?.products?.tax_id,
            taxes: returnProduct?.product_variants?.products?.taxes,
            purchaseQty: matchedPurchaseProduct?.qty,
            returned_qty: matchedPurchaseProduct?.returned_qty,
          };
        }
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
