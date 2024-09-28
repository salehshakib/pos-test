import { Button, Form } from 'antd';
import { useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { useGetWarehousesQuery } from '../../../redux/services/warehouse/warehouseApi';
import { CustomQuantityInput } from '../../Shared/Input/CustomQuantityInput';
import { ProductController } from '../../Shared/ProductControllerComponent/ProductController';

const columns = [
  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    width: 120,
    render: (warehouse) => (
      <div className={`flex items-center gap-2`}>
        <span className="text-dark   text-xs font-medium md:text-sm">
          {warehouse}
        </span>
      </div>
    ),
  },
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
              onClick={() => record.decrementCounter(record?.id)}
            />
          </div>
          <CustomQuantityInput
            // name={["stock_list", "qty", record?.id]}
            value={record?.formValues?.stock_list.qty?.[record?.id] ?? 0}
            noStyle={true}
            onChange={(value) => record.onQuantityChange(record.id, value)}
          />
          <div>
            <Button
              key={'add'}
              icon={<FaPlus />}
              type="primary"
              onClick={() => record.incrementCounter(record?.id)}
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

export const InitialStockComponent = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productId,
}) => {
  const form = Form.useFormInstance();

  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.stock_list.qty[id] ?? 1;

      const newQty = Number(currentQty) + 1;

      return {
        ...prevFormValues,
        stock_list: {
          ...prevFormValues.stock_list,
          qty: {
            ...prevFormValues.stock_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const decrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.stock_list.qty[id] || 1;
      const newQty = Math.max(Number(currentQty) - 1, 0);

      return {
        ...prevFormValues,
        stock_list: {
          ...prevFormValues.stock_list,
          qty: {
            ...prevFormValues.stock_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const onQuantityChange = (id, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      stock_list: {
        ...prevFormValues.stock_list,
        qty: {
          ...prevFormValues.stock_list.qty,
          [id]: parseInt(value, 10) || 0,
        },
      },
    }));
  };

  const onDelete = (id) => {
    setProducts((prevProduct) =>
      prevProduct.filter(
        (product) => product.id + '-' + product.warehouse_id !== id
      )
    );

    setFormValues((prevFormValues) => {
      const updatedQtyList = { ...prevFormValues.stock_list.qty };
      delete updatedQtyList[id];

      return {
        ...prevFormValues,
        stock_list: {
          ...prevFormValues.stock_list,
          qty: updatedQtyList,
        },
      };
    });
  };

  const { data } = useGetWarehousesQuery({});

  console.log(products);

  const dataSource =
    products?.map((product) => {
      const { id, name, warehouse_id } = product;

      const uid = id + '-' + warehouse_id;

      const warehouse = data?.results?.warehouse?.find(
        (warehouse) => warehouse?.id.toString() === warehouse_id?.toString()
      )?.name;

      formValues.stock_list.qty[uid] = formValues.stock_list.qty[uid] ?? 1;

      return {
        id: uid,
        warehouse,
        name,
        delete: true,
        incrementCounter,
        decrementCounter,
        onQuantityChange,
        onDelete,
        formValues,
        setFormValues,
      };
    }) ?? [];

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [form, formValues, products]);

  return (
    <ProductController
      productId={productId}
      columns={columns}
      dataSource={dataSource}
      products={products}
      setProducts={setProducts}
    />
  );
};
