import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TransactionSummary } from '../../ReusableComponent/TransactionSummary';
import { ReturnProductTable } from './ReturnProductTable';

const updateStateWithProductData = (purchaseProducts, setFormValues, sale) => {
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
    updatedPurchaseUnitId[item.product_id.toString()] = item.sale_unit_id;
    updatedProductCost[item.product_id.toString()] = item.net_unit_price;
    updatedDiscount[item.product_id.toString()] = item.discount;
    updatedTaxRate[item.product_id.toString()] = item.tax_rate;
    updatedTax[item.product_id.toString()] = item.tax;
    updatedTotal[item.product_id.toString()] = item.total;

    updatedTaxId[item.product_id.toString()] = item.products?.tax_id;

    updatedOperator[item.product_id.toString()] =
      item.products?.purchase_units?.operator;
    updatedOperationValue[item.product_id.toString()] =
      item.products?.purchase_units?.operation_value;

    if (sale) {
      updatedMaxQty[item.product_id.toString()] = sale.total_qty;
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
      sale_unit_id: {
        ...prevFormValues.product_list.sale_unit_id,
        ...updatedPurchaseUnitId,
      },
      net_unit_price: {
        ...prevFormValues.product_list.net_unit_price,
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
        ...(sale ? updatedMaxQty : updatedQty),
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

export const CustomSaleReturnProductForm = ({
  children,
  onCustomSubmit,
  sellData,
  data,
}) => {
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

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
        sale_unit_id: {},
        net_unit_price: {},
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
    if (sellData) {
      const data = sellData;

      updateStateWithProductData(data?.sale_products, setFormValues);

      const purchaseProducts = data?.sale_products?.map((product) => ({
        id: product.product_id,
        name: product.products?.name,
        sku: product.products?.sku,
        buying_price: product.products?.buying_price,
        sale_unit_id: product.sale_unit_id,
        purchase_units: product.products?.purchase_units,
        tax_id: product.products?.tax_id,
        taxes: product?.products.taxes,
        soldQty: product.qty,
      }));

      setProducts(purchaseProducts);
    } else if (data && isEditDrawerOpen) {
      updateStateWithProductData(
        data?.sale_return_products,
        setFormValues,
        data?.sale
      );

      const purchaseProducts = data?.sale_return_products?.map((product) => ({
        id: product.product_id,
        name: product.products?.name,
        sku: product.products?.sku,
        buying_price: product.products?.buying_price,
        sale_unit_id: product.sale_unit_id,
        purchase_units: product.products?.purchase_units,
        tax_id: product.products?.tax_id,
        taxes: product?.products.taxes,
        soldQty: product.qty,
      }));

      setProducts(purchaseProducts);
    } else {
      resetFormAndProducts();
    }
  }, [data, isEditDrawerOpen, sellData, resetFormAndProducts]);

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
