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
  const fieldsToUpdate = [
    { key: 'qty', value: 'qty' },
    { key: 'purchase_unit_id', value: 'product_variants.purchase_unit_id' },
    { key: 'net_unit_cost', value: 'product_variants.net_unit_cost' },
    { key: 'discount', value: 'product_variants.discount' },
    { key: 'tax_rate', value: 'product_variants.tax_rate' },
    { key: 'tax', value: 'product_variants.tax' },
    { key: 'total', value: 'product_variants.total' },
    { key: 'recieved', value: 'product_variants.recieved' },
    { key: 'tax_id', value: 'product_variants.products.tax_id' },
  ];

  const unitsToUpdate = [
    {
      key: 'operator',
      value: 'product_variants.products.purchase_units.operator',
    },
    {
      key: 'operation_value',
      value: 'product_variants.products.purchase_units.operation_value',
    },
  ];

  const updatedFields = {};
  fieldsToUpdate.forEach(({ key }) => {
    updatedFields[key] = {};
  });

  const updatedUnits = {};
  unitsToUpdate.forEach(({ key }) => {
    updatedUnits[key] = {};
  });

  purchaseProducts.forEach((item) => {
    const productId = item?.product_variants?.id.toString();

    fieldsToUpdate.forEach(({ key, value }) => {
      updatedFields[key][productId] = value
        .split('.')
        .reduce((acc, curr) => acc?.[curr], item);
    });

    unitsToUpdate.forEach(({ key, value }) => {
      updatedUnits[key][productId] = value
        .split('.')
        .reduce((acc, curr) => acc?.[curr], item);
    });
  });

  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    product_list: {
      ...prevFormValues.product_list,
      ...Object.keys(updatedFields).reduce((acc, key) => {
        acc[key] = {
          ...prevFormValues.product_list[key],
          ...updatedFields[key],
        };
        return acc;
      }, {}),
    },
    units: {
      ...prevFormValues.units,
      ...Object.keys(updatedUnits).reduce((acc, key) => {
        acc[key] = {
          ...prevFormValues.units[key],
          ...updatedUnits[key],
        };
        return acc;
      }, {}),
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

    useEffect(() => {
      if (data && isEditDrawerOpen) {
        updateStateWithProductData(data?.purchase_products, setFormValues);

        const purchaseProducts = data?.purchase_products?.map((product) => ({
          id: product?.product_variants?.id,
          name: product?.product_variants?.name,
          sku: product?.product_variants?.sku,
          buying_price: product?.product_variants?.products?.buying_price,
          purchase_unit_id: product?.product_variants?.purchase_unit_id,
          purchase_units: product?.product_variants?.products?.purchase_units,
          tax_id: product?.product_variants?.products?.tax_id,
          taxes: product?.product_variants?.products?.taxes,
          product_qties: product?.product_variants?.products?.product_qties,
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
