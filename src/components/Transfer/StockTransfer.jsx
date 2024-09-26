import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetStockRequestDetailsQuery } from '../../redux/services/stockRequest/stockRequestApi';
import { useCreateTransferMutation } from '../../redux/services/transfer/transferApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from '../../utilities/lib/generator/generatorUtils';
import { openNotification } from '../../utilities/lib/openToaster';
import { decimalConverter } from '../../utilities/lib/return/decimalComverter';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { StockTransferForm } from './StockTransferForm';

export const StockTransfer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [stockTransferId, setStockTransferId] = useState(state?.id);
  const [stockTransferDrawer, setStockTransferDrawer] = useState(!!state?.id);

  const { data, isFetching } = useGetStockRequestDetailsQuery(
    {
      id: stockTransferId,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !stockTransferId }
  );

  const hideDrawer = () => {
    setStockTransferDrawer(false);
    setStockTransferId(undefined);
    if (stockTransferId) {
      navigate('/inventory/transfer', { replace: true });
    }
  };

  useEffect(() => {
    if (state?.id) {
      setStockTransferId(state.id);
      setStockTransferDrawer(true);
    } else {
      setStockTransferId(undefined);
      setStockTransferDrawer(false);
    }
  }, [state?.id]);

  const [form] = Form.useForm();

  const [errorFields, setErrorFields] = useState([]);

  const [formValues, setFormValues] = useState({
    product_list: {
      product_id: {},
      qty: {},
      purchase_unit_id: {},
      net_unit_cost: {},
      tax_rate: {},
      tax: {},
      total: {},

      tax_id: {},
    },
  });

  const [products, setProducts] = useState([]);

  const [productUnits, setProductUnits] = useState({
    purchase_units: {},
    tax_rate: {},
  });
  const [updatedProductList, setUpdatedProductList] = useState({});

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        from_warehouse_id: data.from_warehouse_id,
        to_warehouse_id: data.to_warehouse_id,
      });

      const { stock_request_products } = data ?? {};

      setProducts(stock_request_products);
    }
  }, [data, form]);

  const [createTransfer, { isLoading }] = useCreateTransferMutation();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const { product_list } = updatedProductList;

    const { shipping_cost, attachment } = values ?? {};

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_variant_id: parseInt(product_id),
            qty: product_list.qty[product_id],
            purchase_unit_id: product_list.purchase_unit_id[product_id],
            net_unit_cost: decimalConverter(
              product_list.net_unit_cost[product_id]
            ),
            tax_rate: decimalConverter(product_list.tax_rate[product_id]),
            tax: decimalConverter(product_list.tax[product_id]),
            total: decimalConverter(product_list.total[product_id]),
          }))
      : [];

    if (productListArray.length === 0) {
      return openNotification('info', 'Please add atleast one product');
    }

    const totalPrice = calculateTotalPrice(product_list);
    const orderTax = calculateTotalTax(totalPrice, values.tax_rate);

    const totalQty =
      Object.values(formValues.product_list?.qty).reduce(
        (acc, cur) => acc + parseInt(cur),
        0
      ) ?? 0;

    const totalTax =
      Object.values(formValues.product_list?.tax).reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
      ) ?? 0;

    const postObj = {
      ...values,
      shipping_cost: decimalConverter(shipping_cost),
      item: productListArray.length,
      total_qty: totalQty,
      total_tax: decimalConverter(totalTax),
      total_cost: decimalConverter(totalPrice),
      tax: decimalConverter(orderTax),
      change: decimalConverter(
        Number(values?.recieved_amount ?? 0) - Number(values?.paid_amount ?? 0)
      ),
      grand_total: calculateGrandTotal(totalPrice, orderTax, 0, shipping_cost),

      product_list: JSON.stringify(productListArray),
      // petty_cash_id: 8,
      stock_request_id: stockTransferId,
    };

    if (attachment?.[0].originFileObj) {
      postObj.attachment = attachment?.[0].originFileObj;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await createTransfer({
      data: formData,
    });
    if (data?.success) {
      setStockTransferDrawer(false);
      form.resetFields();

      setFormValues({
        product_list: {
          product_id: {},
          qty: {},
          purchase_unit_id: {},
          net_unit_cost: {},
          tax_rate: {},
          tax: {},
          total: {},

          tax_id: {},
        },
      });

      setProducts([]);

      setProductUnits({
        purchase_units: {},
        tax_rate: {},
      });

      setUpdatedProductList({});
    }
    if (error) {
      const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
        name: fieldName,

        errors: error?.data?.errors[fieldName],
      }));
      setErrorFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={'Stock Transfer'}
      open={stockTransferDrawer}
      width={1400}
      onClose={hideDrawer}
      isLoading={isFetching}
    >
      <StockTransferForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
        productUnits={productUnits}
        setProductUnits={setProductUnits}
        onClose={hideDrawer}
        data={data}
        updatedProductList={updatedProductList}
        setUpdatedProductList={setUpdatedProductList}
      />
    </CustomDrawer>
  );
};
