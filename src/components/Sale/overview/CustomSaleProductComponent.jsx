import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { TransactionSummary } from '../../ReusableComponent/TransactionSummary';
import { SaleProductTable } from './SaleProductTable';

const updateStateWithProductData = (saleProducts, setFormValues) => {
  // Fields that need to be updated in product_list
  const fieldsToUpdate = [
    { key: 'qty', value: 'qty' },
    { key: 'sale_unit_id', value: 'product_variants.sale_unit_id' },
    { key: 'net_unit_price', value: 'product_variants.net_unit_price' },
    { key: 'discount', value: 'product_variants.discount' },
    { key: 'tax_rate', value: 'product_variants.tax_rate' },
    { key: 'tax', value: 'product_variants.tax' },
    { key: 'total', value: 'product_variants.total' },
    { key: 'tax_id', value: 'product_variants.products.tax_id' },
  ];

  // Fields that need to be updated in units
  const unitsToUpdate = [
    { key: 'operator', value: 'product_variants.products.sale_units.operator' },
    {
      key: 'operation_value',
      value: 'product_variants.products.sale_units.operation_value',
    },
  ];

  // Initialize objects to store updated fields
  const updatedFields = {};
  const updatedUnits = {};

  // Initialize keys for all fields
  fieldsToUpdate.forEach(({ key }) => {
    updatedFields[key] = {};
  });

  unitsToUpdate.forEach(({ key }) => {
    updatedUnits[key] = {};
  });

  // Populate the updated fields from saleProducts
  saleProducts.forEach((item) => {
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

  // Update the state using the setFormValues callback
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

export const CustomSaleProductComponent = forwardRef(
  ({ children, onCustomSubmit, data }, ref) => {
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
      },
      units: {
        operator: {},
        operation_value: {},
      },
    });

    const [products, setProducts] = useState([]);

    const { state } = useLocation();
    const navigate = useNavigate();

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
        },
        units: {
          operator: {},
          operation_value: {},
        },
      });
      if (state?.selectedProduct) {
        setProducts([state?.selectedProduct]);
        navigate(window.location.pathname, { replace: true });
      }
    }, [navigate, state]);

    const handleCustomSubmit = useCallback(() => formValues, [formValues]);

    useEffect(() => {
      onCustomSubmit(handleCustomSubmit);
    }, [handleCustomSubmit, onCustomSubmit]);

    useEffect(() => {
      if (data && isEditDrawerOpen) {
        updateStateWithProductData(data?.sale_products, setFormValues);

        const saleProducts = data?.sale_products?.map((product) => ({
          id: product?.product_variants?.id,
          name: product?.product_variants?.name,
          sku: product?.product_variants?.sku,
          selling_price: product?.product_variants?.products?.selling_price,
          sale_unit_id: product?.product_variants?.sale_unit_id,
          sale_units: product?.product_variants?.products?.sale_units,
          tax_id: product?.product_variants?.products?.tax_id,
          taxes: product?.product_variants?.products.taxes,
          product_qties: product?.product_variants?.product_qties,
        }));

        setProducts(saleProducts);
      } else {
        resetFormAndProducts();
      }
    }, [data, isEditDrawerOpen, resetFormAndProducts]);

    useImperativeHandle(ref, () => ({
      resetFormAndProducts,
    }));

    return (
      <>
        <SaleProductTable
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

CustomSaleProductComponent.displayName = 'CustomSaleProductComponent';
