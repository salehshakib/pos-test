import { Form } from 'antd';
import { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';

import { useGetWarehousesQuery } from '../../../redux/services/warehouse/warehouseApi';
import CustomInput from '../../Shared/Input/CustomInput';
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
    title: 'Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    align: 'center',
    width: 140,
    render: (unitPrice, record) => {
      return unitPrice > -1 ? (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {unitPrice}
        </span>
      ) : (
        <CustomInput
          type={'number'}
          // name={['price_list', 'price', record?.id]}
          value={record.formValues.price_list.price[record?.id]}
          placeholder="price"
          noStyle={true}
          onChange={(value) => record.onUnitPriceChange(record.id, value)}
        />
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

export const DifferentPriceComponent = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productId,
}) => {
  const form = Form.useFormInstance();

  const incrementCounter = (id, stock = 5) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.price_list.price[id] || 1;
      const newQty = Math.min(currentQty + 1, stock);

      return {
        ...prevFormValues,
        price_list: {
          ...prevFormValues.price_list,
          price: {
            ...prevFormValues.price_list.price,
            [id]: newQty,
          },
        },
      };
    });
  };

  const decrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.price_list.price[id] || 1;
      const newQty = Math.max(currentQty - 1, 0);

      return {
        ...prevFormValues,
        price_list: {
          ...prevFormValues.price_list,
          price: {
            ...prevFormValues.price_list.price,
            [id]: newQty,
          },
        },
      };
    });
  };

  const onUnitPriceChange = (id, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      price_list: {
        ...prevFormValues.price_list,
        price: {
          ...prevFormValues.price_list.price,
          [id]: parseInt(value, 10) || 0,
        },
      },
    }));
  };

  const onDelete = (id) => {
    setProducts((prevWarehouse) =>
      prevWarehouse.filter(
        (product) => product.id + '-' + product.warehouse_id !== id
      )
    );
    setFormValues((prevFormValues) => {
      const updatedQtyList = { ...prevFormValues.price_list.qty };
      delete updatedQtyList[id];

      return {
        ...prevFormValues,
        price_list: {
          ...prevFormValues.price_list,
          price: updatedQtyList,
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

      formValues.price_list.price[uid] = formValues.price_list.price[uid] ?? 0;

      return {
        id: uid,
        name,
        warehouse,
        delete: true,
        incrementCounter,
        decrementCounter,
        onUnitPriceChange,
        onDelete,
        formValues,
        setFormValues,
      };
    }) ?? [];

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [form, formValues]);

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
