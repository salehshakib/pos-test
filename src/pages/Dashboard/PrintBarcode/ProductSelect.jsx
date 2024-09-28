import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { CustomQuantityInput } from '../../../components/Shared/Input/CustomQuantityInput';
import { ProductController } from '../../../components/Shared/ProductControllerComponent/ProductController';
import {
  decrementCounter,
  incrementCounter,
  onQuantityChange,
} from '../../../utilities/lib/productTable/counters';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <div className={`flex items-center gap-2`}>
        <span className="text-dark   text-xs font-medium md:text-sm">
          {name}
        </span>
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
              record.onQuantityChange(record.id, value, record.setFormValues)
            }
            value={record.formValues.product_list.qty[record.id]}
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
                record?.onDelete(
                  record.id,
                  record?.setProducts,
                  record?.setFormValues
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

const ProductSelect = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();

  const onDelete = (id, setProducts, setFormValues) => {
    setProducts((prevProducts) =>
      prevProducts.filter(
        (product) => product.id + '-' + product.warehouse_id !== id
      )
    );

    setFormValues((prevFormValues) => {
      const { product_list } = prevFormValues;

      const updatedProductList = Object.keys(product_list).reduce(
        (acc, key) => {
          // eslint-disable-next-line no-unused-vars
          const { [id]: _, ...rest } = product_list[key];
          acc[key] = rest;
          return acc;
        },
        {}
      );

      let updatedUnitList;

      if (prevFormValues.units) {
        updatedUnitList = Object.keys(prevFormValues.units).reduce(
          (acc, key) => {
            // eslint-disable-next-line no-unused-vars
            const { [id]: _, ...rest } = prevFormValues.units[key];
            acc[key] = rest;
            return acc;
          },
          {}
        );
      }

      return {
        ...prevFormValues,
        product_list: updatedProductList,
        units: updatedUnitList,
      };
    });
  };

  const dataSource =
    products?.map((product) => {
      const { id, name, sku, warehouse_id } = product;
      const uid = `${id}-${warehouse_id}`;

      formValues.product_list.qty[uid] = formValues.product_list.qty[uid] ?? 1;

      return {
        id: uid,
        name,
        sku,
        delete: true,
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
    const sanitizeValue = (value) => {
      const number = parseFloat(value);
      return isNaN(number) ? 0 : number;
    };

    if (products?.length > 0) {
      const total = Object.values(formValues.product_list.qty).reduce(
        (acc, cur) => acc + sanitizeValue(cur),
        0
      );
      setTotalQuantity(total);
    }
  }, [formValues, products]);

  products?.length > 0 &&
    dataSource.push({
      id: '',
      name: 'Total',
      quantity: totalQuantity,
    });

  form?.setFieldsValue(formValues);

  return (
    <ProductController
      products={products}
      setProducts={setProducts}
      columns={columns}
      dataSource={dataSource}
      styleProps={{
        width: '100%',
        scroll: {
          x: 'min-content',
        },
      }}
    />
  );
};

export default ProductSelect;
