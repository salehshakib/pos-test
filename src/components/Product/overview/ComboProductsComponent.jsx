import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { onQuantityChange } from '../../../utilities/lib/productTable/counters';
import CustomInput from '../../Shared/Input/CustomInput';
import { CustomQuantityInput } from '../../Shared/Input/CustomQuantityInput';
import { ProductController } from '../../Shared/ProductControllerComponent/ProductController';

// import { columns } from "./columns/ProductColumns";

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
    width: 100,
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
                record.decrementCounter(record?.id, record?.setFormValues)
              }
            />
          </div>
          <CustomQuantityInput
            // name={["product_list", "qty", record?.id]}
            noStyle={true}
            onChange={(value) =>
              record.onQuantityChange(record.id, value, record.setFormValues)
            }
            value={record.formValues.product_list.qty[record.id] ?? 0}
          />
          <div>
            <Button
              key={'add'}
              icon={<FaPlus />}
              type="primary"
              onClick={() =>
                record.incrementCounter(record?.id, record?.setFormValues)
              }
              className=""
            />
          </div>
        </div>
      );
    },
  },
  {
    title: 'UnitPrice',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    align: 'center',
    width: 200,
    render: (unitPrice, record) => {
      return unitPrice > -1 ? (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {unitPrice}
        </span>
      ) : (
        <CustomInput
          type={'number'}
          name={['product_list', 'amount', record?.id]}
          placeholder="Unit Price"
          noStyle={true}
          onChange={(value) => record.onUnitPriceChange(record.id, value)}
        />
      );
    },
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
    align: 'center',
    width: 100,
    render: (unit) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{unit}</span>
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
              onClick={() => record.onDelete(record.id)}
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

const ComboProductsComponent = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();

  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;

      const newQty = parseInt(currentQty) + 1;

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const decrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;

      const newQty = Math.max(parseInt(currentQty) - 1, 0);

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const onDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );

    setFormValues((prevFormValues) => {
      const { product_list } = prevFormValues;

      const updatedProductList = Object.keys(product_list).reduce(
        (acc, key) => {
          const { [id]: _, ...rest } = product_list[key];
          acc[key] = rest;
          return acc;
        },
        {}
      );

      // const updatedQtyList = Object.keys(qty_list).reduce((acc, key) => {
      //   const { [id]: _, ...rest } = qty_list[key];
      //   acc[key] = rest;
      //   return acc;
      // }, {});

      // const updatedPriceList = Object.keys(price_list).reduce((acc, key) => {
      //   const { [id]: _, ...rest } = price_list[key];
      //   acc[key] = rest;
      //   return acc;
      // }, {});

      return {
        ...prevFormValues,
        product_list: updatedProductList,
        // qty_list: updatedQtyList,
        // price_list: updatedPriceList,
      };
    });
  };

  const onUnitPriceChange = (id, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      product_list: {
        ...prevFormValues.product_list,
        amount: {
          ...prevFormValues.product_list.amount,
          [id]: parseInt(value, 10) || 0,
        },
      },
    }));
  };

  const dataSource =
    products?.map((product) => {
      const { id, name, sku, buying_price: unitPrice, units } = product;

      formValues.product_list.qty[id] = formValues.product_list.qty[id] ?? 1;
      formValues.product_list.amount[id] =
        formValues.product_list.amount[id] ?? parseInt(unitPrice) ?? 0;

      return {
        id,
        name,
        sku,
        unitPrice: `$${formValues.product_list.amount[id]}`,
        unit: units?.base_unit ?? 'N/A',
        delete: true,
        incrementCounter,
        decrementCounter,
        onQuantityChange,
        onDelete,
        onUnitPriceChange,
        formValues,
        setFormValues,
      };
    }) ?? [];

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalUnitPrice, setTotalUnitPrice] = useState(0);

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

      const totalAmount = Object.values(formValues.product_list.amount).reduce(
        (acc, cur) => acc + sanitizeValue(cur),
        0
      );
      setTotalUnitPrice(totalAmount);
    }

    form.setFieldsValue(formValues);
  }, [form, formValues, products]);

  products?.length > 0 &&
    dataSource.push({
      id: '',
      name: 'Total',
      quantity: totalQuantity,
      unitPrice: Number(totalUnitPrice)?.toFixed(2),
    });

  return (
    <ProductController
      products={products}
      setProducts={setProducts}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default ComboProductsComponent;
