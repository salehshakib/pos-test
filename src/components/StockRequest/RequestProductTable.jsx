import { Button, Form, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../redux/services/pos/posSlice';
import { showCurrency } from '../../utilities/lib/currency';
import { getWarehouseQuantity } from '../../utilities/lib/getWarehouseQty';
import {
  decrementCounter,
  incrementCounter,
  onDelete,
  onQuantityChange,
} from '../../utilities/lib/productTable/counters';
import { CustomQuantityInput } from '../Shared/Input/CustomQuantityInput';
import { ProductController } from '../Shared/ProductControllerComponent/ProductController';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // width: 400,
    render: (name) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {name}
      </span>
    ),
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    align: 'center',
    width: 100,
    render: (sku) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {sku}
      </span>
    ),
  },
  {
    title: 'Minimum Qunatity',
    dataIndex: 'minQty',
    key: 'minQty',
    align: 'center',
    width: 100,
    render: (minQty) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {minQty}
      </span>
    ),
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
    width: 100,
    render: (stock, record) =>
      stock > record.minQty ? (
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
          {stock}
        </span>
      ) : (
        <span className="dark:text-white87 text-xs font-medium text-red-600 md:text-sm">
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {unitCost}
      </span>
    ),
  },

  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 200,
    render: (quantity, record) => {
      return quantity > -1 ? (
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
              record.onQuantityChange(record.id, value, record.setFormValues)
            }
            value={record?.formValues.product_list.qty?.[record?.id] ?? 0}
          />
          <div>
            <Button
              key={'add'}
              icon={<FaPlus />}
              type="primary"
              onClick={() =>
                record.incrementCounter(record?.id, record.setFormValues)
              }
              className=""
            />
          </div>
        </div>
      );
    },
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

export const RequestProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();
  const warehouseId = Form.useWatch('from_warehouse_id', form);

  const currency = useSelector(useCurrency);

  const dataSource =
    products?.map((product) => {
      const {
        id,
        name,
        sku,
        buying_price: unit_cost,
        product_qties,
        products,
      } = product ?? {};

      formValues.product_list.qty[id] = formValues.product_list.qty[id] ?? 1;
      formValues.product_list.min_qty[id] =
        formValues?.product_list?.min_qty[id] ?? product?.products?.alert_qty;

      const stock = getWarehouseQuantity(product_qties, warehouseId);

      return {
        id,
        name,
        sku,
        unitCost: showCurrency(unit_cost, currency),
        action: true,
        delete: true,
        minQty: product?.products?.alert_qty ?? 'N/A',
        stock,
        incrementCounter,
        decrementCounter,
        onQuantityChange,
        onDelete,
        products,
        setProducts,
        formValues,
        setFormValues,
      };
    }) ?? [];

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const total = Object.values(formValues.product_list.qty).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setTotalQuantity(total);
  }, [formValues, products]);

  // products.length > 0 &&
  //   dataSource.push({
  //     id: "",
  //     name: "Total",
  //     unitCost: "",
  //     quantity: totalQuantity,
  //     action: false,
  //   });

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [form, formValues]);

  const tableStyle = {
    summary: () => {
      return (
        <Table.Summary fixed="bottom">
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={5}>
              <Typography.Text className="font-bold" type="">
                Total
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={2} align="center">
              <Typography.Text type="" className="font-bold">
                {totalQuantity}
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      );
    },
  };

  return (
    <ProductController
      products={products}
      setProducts={setProducts}
      columns={columns}
      dataSource={dataSource}
      tableStyle={tableStyle}
    />
  );
};
