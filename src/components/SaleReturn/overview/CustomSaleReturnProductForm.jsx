import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TransactionSummary } from '../../ReusableComponent/TransactionSummary';
import { ReturnProductTable } from './ReturnProductTable';

const updateStateWithProductData = (purchaseProducts, setFormValues, sale) => {
  const updatedQty = {};
  const updatedMaxQty = {};
  const updatedSaleUnitId = {};
  const updatedProductPrice = {};
  const updatedDiscount = {};
  const updatedTaxRate = {};
  const updatedTax = {};
  const updatedTotal = {};
  const updatedTaxId = {};
  const updatedReturnedQty = {};
  const updatedOperator = {};
  const updatedOperationValue = {};

  purchaseProducts.forEach((item) => {
    const productId = item?.product_variants.id.toString();

    updatedQty[productId] = item?.qty - item.returned_qty;
    updatedSaleUnitId[productId] = item?.product_variants?.sale_unit_id;
    updatedProductPrice[productId] = item?.product_variants?.net_unit_price;
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
    if (sale) {
      updatedQty[productId] =
        parseInt(
          sale.sale_products.find(
            (item) =>
              item.product_variant_id.toString() === productId.toString()
          ).qty
        ) -
        parseInt(
          sale.sale_products.find(
            (item) =>
              item.product_variant_id.toString() === productId.toString()
          ).returned_qty
        );

      updatedMaxQty[productId] =
        parseInt(
          sale.sale_products.find(
            (item) =>
              item.product_variant_id.toString() === productId.toString()
          ).qty
        ) -
        parseInt(
          sale.sale_products.find(
            (item) =>
              item.product_variant_id.toString() === productId.toString()
          ).returned_qty
        );
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
      returned_qty: {
        ...prevFormValues.product_list.returned_qty,
        ...updatedReturnedQty,
      },
      sale_unit_id: {
        ...prevFormValues.product_list.sale_unit_id,
        ...updatedSaleUnitId,
      },
      net_unit_price: {
        ...prevFormValues.product_list.net_unit_price,
        ...updatedProductPrice,
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
        sale_unit_id: {},
        net_unit_price: {},
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
    if (sellData?.sale_products) {
      const data = sellData;

      updateStateWithProductData(data?.sale_products, setFormValues);

      const saleProducts = data?.sale_products?.map((product) => ({
        id: product?.product_variants?.id,
        name: product?.product_variants?.name,
        sku: product?.product_variants?.products?.sku,
        selling_price: product?.product_variants?.products?.selling_price,
        sale_unit_id: product?.product_variants?.sale_unit_id,
        sale_units: product?.product_variants?.products?.sale_units,
        tax_id: product?.product_variants?.products?.tax_id,
        taxes: product?.product_variants?.products?.taxes,
        soldQty: product?.qty,
        returned_qty: product.returned_qty,
      }));

      setProducts(saleProducts);
    } else if (data && isEditDrawerOpen) {
      updateStateWithProductData(
        data?.sale_return_products,
        setFormValues,
        data?.sale
      );

      const saleProducts = data?.sale_return_products?.map((returnProduct) => {
        const matchedSaleProduct = data?.sale?.sale_products?.find(
          (saleProduct) =>
            saleProduct?.sale_unit_id ===
            returnProduct?.product_variants?.sale_unit_id
        );

        return {
          id: returnProduct?.product_variants?.id,
          name: returnProduct?.product_variants?.name,
          sku: returnProduct?.product_variants?.sku,
          buying_price: returnProduct?.product_variants?.buying_price,
          sale_unit_id: returnProduct?.product_variants?.sale_unit_id,
          purchase_units: returnProduct?.product_variants?.purchase_units,
          tax_id: returnProduct?.product_variants?.tax_id,
          taxes: returnProduct?.product_variants?.taxes,
          soldQty: matchedSaleProduct?.qty,
          returned_qty: matchedSaleProduct?.returned_qty,
        };
      });

      setProducts(saleProducts);
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
