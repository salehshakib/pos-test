import { Form, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { calculateOriginalPrice } from '../../../../utilities/lib/calculatePrice';
import { calculateTotals } from '../../../../utilities/lib/calculateTotals';
import { showCurrency } from '../../../../utilities/lib/currency';
import {
  decrementCounter,
  incrementCounter,
  onDelete,
  onQuantityChange,
} from '../../../../utilities/lib/productTable/counters';
import { calculateUnitCost } from '../../../../utilities/lib/updateFormValues/calculateById';
import { updateFormValues } from '../../../../utilities/lib/updateFormValues/updateFormValues';
import { ProductFormComponent } from '../../../ReusableComponent/ProductDetailsUpdateForm';
import { ProductController } from '../../../Shared/ProductControllerComponent/ProductController';
import { columns } from './productColumns';

export const QuotationProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  type = 'quotation',
}) => {
  const form = Form.useFormInstance();
  const currency = useSelector(useCurrency);

  const [productEditModal, setProductEditModal] = useState(false);
  const [productId, setProductId] = useState(undefined);
  const [productName, setProductName] = useState(null);

  const handleProductEdit = (id, name) => {
    setProductId(id);
    setProductName(name);
    setProductEditModal(true);
  };

  const hideModal = () => {
    setProductEditModal(false);
  };

  const dataSource = products?.map((product) => {
    const { id, name, sku, taxes, sale_units, tax_method, warehouse_id } =
      product ?? {};

    function getWarehousePrice(product_prices, warehouse_id) {
      const warehouse = product_prices.find(
        (item) => item.warehouse_id.toString() === warehouse_id.toString()
      );

      return warehouse ? warehouse.price : product.selling_price;
    }

    console.log(product);

    const unit_cost =
      type === 'invoice'
        ? getWarehousePrice(product.product_prices, warehouse_id)
        : product?.selling_price;

    const price = calculateUnitCost(
      sale_units,
      unit_cost,
      formValues?.units,
      id
    );

    updateFormValues(
      id,
      calculateOriginalPrice(price, taxes?.rate, tax_method),
      sale_units,
      taxes,
      formValues
    );

    return {
      id,
      name,
      sku,
      unitCost: showCurrency(
        formValues.product_list.net_unit_price[id],
        currency
      ),
      delete: true,
      discount: showCurrency(formValues.product_list.discount[id], currency),
      tax: showCurrency(formValues.product_list.tax[id], currency),
      subTotal: showCurrency(formValues.product_list.total[id], currency),
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      onDelete,
      handleProductEdit,
      products,
      setProducts,
      formValues,
      setFormValues,
    };
  });

  const { totalQuantity, totalPrice, totalTax, totalDiscount } =
    calculateTotals(formValues);

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [formValues, products, form]);

  const tableStyle = {
    summary: () => {
      return (
        <Table.Summary fixed="bottom">
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={3}>
              <Typography.Text className="font-bold" type="">
                Total
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={2} align="center">
              <Typography.Text type="" className="font-bold">
                {totalQuantity}
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={4} align="center">
              <Typography.Text type="" className="font-bold">
                {showCurrency(totalDiscount, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5} align="center">
              <Typography.Text type="" className="font-bold">
                {showCurrency(totalTax, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={6} align="center">
              <Typography.Text type="" className="font-bold">
                {showCurrency(totalPrice, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      );
    },
  };

  return (
    <>
      <ProductController
        products={products}
        setProducts={setProducts}
        columns={columns}
        dataSource={dataSource}
        tableStyle={tableStyle}
      />

      <ProductFormComponent
        productEditModal={productEditModal}
        productId={productId}
        productName={productName}
        hideModal={hideModal}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </>
  );
};
