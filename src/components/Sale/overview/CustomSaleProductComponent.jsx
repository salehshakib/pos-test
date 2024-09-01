import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

import { TransactionSummary } from '../../ReusableComponent/TransactionSummary';
import { SaleProductTable } from './SaleProductTable';

const updateStateWithProductData = (saleProducts, setFormValues) => {
  const updatedQty = {};
  const updatedSaleUnitId = {};
  const updatedProductCost = {};
  const updatedDiscount = {};
  const updatedTaxRate = {};
  const updatedTax = {};
  const updatedTotal = {};
  const updatedTaxId = {};

  const updatedOperator = {};
  const updatedOperationValue = {};

  saleProducts.forEach((item) => {
    updatedQty[item.product_id.toString()] = item.qty;
    updatedSaleUnitId[item.product_id.toString()] = item.sale_unit_id;
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
        ...prevFormValues.product_list.purchase_unit_id,
        ...updatedSaleUnitId,
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
      setProducts([]);
    }, []);

    const handleCustomSubmit = useCallback(() => formValues, [formValues]);

    useEffect(() => {
      onCustomSubmit(handleCustomSubmit);
    }, [handleCustomSubmit, onCustomSubmit]);

    useEffect(() => {
      if (data && isEditDrawerOpen) {
        updateStateWithProductData(data?.sale_products, setFormValues);

        const saleProducts = data?.sale_products?.map((product) => ({
          id: product.product_id,
          name: product.products?.name,
          sku: product.products?.sku,
          selling_price: product.products?.selling_price,
          sale_unit_id: product.sale_unit_id,
          sale_units: product.products?.sale_units,
          tax_id: product.products?.tax_id,
          taxes: product?.products.taxes,
          product_qties: product?.products?.product_qties,
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
