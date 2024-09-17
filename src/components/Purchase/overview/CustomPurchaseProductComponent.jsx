import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

import { TransactionSummary } from '../../ReusableComponent/TransactionSummary';
import { PurchaseProductTable } from './PurchaseProductTable';

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

  console.log(purchaseProducts);

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

export const CustomPurchaseProductComponent = forwardRef(
  ({ children, onCustomSubmit, data }, ref) => {
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
        recieved: {},
        tax_id: {},
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
          recieved: {},
          tax_id: {},
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

    console.log(data);

    useEffect(() => {
      if (data && isEditDrawerOpen) {
        console.log(data?.purchase_products);

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
          product_qties: product?.products?.product_qties,
        }));

        setProducts(purchaseProducts);
      } else {
        resetFormAndProducts();
      }
    }, [data, isEditDrawerOpen, resetFormAndProducts]);

    useImperativeHandle(ref, () => ({
      resetFormAndProducts,
    }));

    return (
      <>
        <PurchaseProductTable
          formValues={formValues}
          setFormValues={setFormValues}
          products={products}
          setProducts={setProducts}
        />
        {children}
        <TransactionSummary formValues={formValues} />
      </>
    );
  }
);

// Set the display name for the component
CustomPurchaseProductComponent.displayName = 'CustomPurchaseProductComponent';
