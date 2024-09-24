import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

import { TransactionSummary } from '../../ReusableComponent/TransactionSummary';
import { TransferProductTable } from './TransferProductTable';

const updateStateWithProductData = (transferProducts, setFormValues) => {
  const updatedQty = {};
  const updatedPurchaseUnitId = {};
  const updatedProductCost = {};
  const updatedTaxRate = {};
  const updatedTax = {};
  const updatedTotal = {};
  const updatedTaxId = {};

  const updatedOperator = {};
  const updatedOperationValue = {};

  transferProducts.forEach((item) => {
    updatedQty[item.product_id.toString()] = item.qty;
    updatedPurchaseUnitId[item.product_id.toString()] = item.purchase_unit_id;
    updatedProductCost[item.product_id.toString()] = item.net_unit_cost;
    updatedTaxRate[item.product_id.toString()] = item.tax_rate;
    updatedTax[item.product_id.toString()] = item.tax;
    updatedTotal[item.product_id.toString()] = item.total;
    updatedTaxId[item.product_id.toString()] = item.products?.tax_id;

    updatedOperator[item.product_id.toString()] =
      item.products?.sale_units?.operator;
    updatedOperationValue[item.product_id.toString()] =
      item.products?.sale_units?.operation_value;
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

export const CustomTransferProductComponent = forwardRef(
  ({ children, onCustomSubmit, data }, ref) => {
    const { isEditDrawerOpen } = useSelector((state) => state.drawer);

    const [formValues, setFormValues] = useState({
      product_list: {
        qty: {},
        purchase_unit_id: {},
        net_unit_cost: {},
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
          purchase_unit_id: {},
          net_unit_cost: {},
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
        updateStateWithProductData(data?.transfer_products, setFormValues);

        const transferProducts = data?.transfer_products?.map((product) => ({
          id: product.product_variant_id,
          name: product.product_variants?.name,
          sku: product.product_variants?.sku,
          buying_price: product.product_variants?.buying_price,
          purchase_unit_id_unit_id: product.purchase_unit_id_unit_id,
          purchase_units: product.product_variants?.purchase_units,
          tax_id: product.product_variants?.tax_id,
          taxes: product?.product_variants.taxes,
        }));

        setProducts(transferProducts);
      } else {
        resetFormAndProducts();
      }
    }, [data, isEditDrawerOpen, resetFormAndProducts]);

    useImperativeHandle(ref, () => ({
      resetFormAndProducts,
    }));

    return (
      <>
        <TransferProductTable
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

CustomTransferProductComponent.displayName = 'CustomTransferProductComponent';
