import { Button, Form, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FaEdit, FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../../redux/services/pos/posSlice';
import { calculateOriginalPrice } from '../../../utilities/lib/calculatePrice';
import { calculateTotals } from '../../../utilities/lib/calculateTotals';
import { showCurrency } from '../../../utilities/lib/currency';
import { getWarehouseQuantity } from '../../../utilities/lib/getWarehouseQty';
import {
  decrementCounter,
  incrementCounter,
  onDelete,
  onQuantityChange,
} from '../../../utilities/lib/productTable/counters';
import { calculateUnitCost } from '../../../utilities/lib/updateFormValues/calculateById';
import { updateFormValues } from '../../../utilities/lib/updateFormValues/updateFormValues';
import { ProductFormComponent } from '../../ReusableComponent/ProductDetailsUpdateForm';
import { CustomQuantityInput } from '../../Shared/Input/CustomQuantityInput';
import { ProductController } from '../../Shared/ProductControllerComponent/ProductController';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 300,
    render: (name, record) => (
      <div
        className={`flex items-center gap-2 ${
          name !== 'Total' && 'hover:cursor-pointer hover:underline'
        }`}
        onClick={() => {
          record?.handleProductEdit(record?.id, record?.name);
        }}
      >
        <span className="text-dark   text-xs font-medium md:text-sm">
          {name}
        </span>
        {name !== 'Total' && <FaEdit className="primary-text" />}
      </div>
    ),
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    align: 'center',
    width: 150,
    render: (sku) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{sku}</span>
    ),
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
    width: 100,
    render: (stock) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {stock}
      </span>
    ),
  },
  {
    title: 'Unit Cost',
    dataIndex: 'unitCost',
    key: 'unitCost',
    align: 'center',
    width: 100,
    render: (unitCost) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {unitCost ?? 0}
      </span>
    ),
  },

  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 180,
    render: (quantity, record) => {
      return quantity > -1 ? (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {quantity}
        </span>
      ) : (
        <div className="flex items-center justify-center gap-1">
          <div>
            <Button
              key={'sub'}
              icon={<FaMinus />}
              type="primary"
              onClick={() =>
                record.decrementCounter(record?.id, record.setFormValues)
              }
            />
          </div>
          <CustomQuantityInput
            // name={["product_list", "qty", record?.id]}
            noStyle={true}
            onChange={(value) =>
              record.onQuantityChange(
                record.id,
                value,
                record.setFormValues,
                record.stock
              )
            }
            value={record?.formValues?.product_list?.qty[record?.id] || 0}
          />
          <div>
            <Button
              key={'add'}
              icon={<FaPlus />}
              type="primary"
              onClick={() =>
                record.incrementCounter(
                  record?.id,
                  record.setFormValues,
                  record.stock
                )
              }
              className=""
            />
          </div>
        </div>
      );
    },
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    align: 'center',
    width: 100,
    render: (discount) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {discount}
      </span>
    ),
  },
  {
    title: 'Vat',
    dataIndex: 'tax',
    key: 'tax',
    align: 'center',
    width: 100,
    render: (tax) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{tax}</span>
    ),
  },
  {
    title: 'SubTotal',
    dataIndex: 'subTotal',
    key: 'subTotal',
    align: 'center',
    width: 150,
    render: (subTotal) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {subTotal}
      </span>
    ),
  },
  {
    title: <MdDelete className="w-full text-center text-lg md:text-xl" />,
    dataIndex: 'delete',
    key: 'delete',
    align: 'center',
    width: 50,
    fixed: 'right',
    render: (props, record) => {
      return (
        props && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() =>
                record.onDelete(
                  record.id,
                  record.setProducts,
                  record.setFormValues
                )
              }
              className="primary-bg rounded-xl p-1 text-white duration-300 hover:scale-110"
              type="button"
            >
              <MdDelete className="text-lg md:text-xl" />
            </button>
          </div>
        )
      );
    },
  },
];

export const SaleProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();
  const warehouseId = Form.useWatch('warehouse_id', form);

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
    const {
      id,
      name,
      sku,
      product_prices,
      sale_units,
      taxes,
      tax_method,
      product_qties,
      warehouse_id,
    } = product ?? {};

    function getWarehousePrice(product_prices, warehouse_id) {
      const warehouse = product_prices?.find(
        (item) => item.warehouse_id.toString() === warehouse_id.toString()
      );

      return warehouse ? warehouse.price : product.selling_price;
    }

    const unit_cost = getWarehousePrice(product_prices, warehouse_id);

    const stock = getWarehouseQuantity(product_qties, warehouseId);

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
      stock,
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
            <Table.Summary.Cell index={1} colSpan={4}>
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
