import { Button, Form } from 'antd';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { CustomQuantityInput } from '../../Shared/Input/CustomQuantityInput';
import { WarehouseController } from '../../WarehouseController/WarehouseController';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <div className={`flex items-center gap-2`}>
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
              onClick={() => record.decrementCounter(record?.id)}
            />
          </div>
          <CustomQuantityInput
            // name={["qty_list", "qty", record?.id]}
            value={record?.formValues?.qty_list.qty?.[record?.id] ?? 0}
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
  initialWarehouses,
  setInitialWarehouses,
}) => {
  const form = Form.useFormInstance();
  const hasStock = Form.useWatch('has_stock', form);

  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.qty_list.qty[id] ?? 1;

      const newQty = Number(currentQty) + 1;

      return {
        ...prevFormValues,
        qty_list: {
          ...prevFormValues.qty_list,
          qty: {
            ...prevFormValues.qty_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const decrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.qty_list.qty[id] || 1;
      const newQty = Math.max(Number(currentQty) - 1, 0);

      return {
        ...prevFormValues,
        qty_list: {
          ...prevFormValues.qty_list,
          qty: {
            ...prevFormValues.qty_list.qty,
            [id]: newQty,
          },
        },
      };
    });
  };

  const onQuantityChange = (id, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      qty_list: {
        ...prevFormValues.qty_list,
        qty: {
          ...prevFormValues.qty_list.qty,
          [id]: parseInt(value, 10) || 0,
        },
      },
    }));
  };

  const onDelete = (id) => {
    setInitialWarehouses((prevWarehouse) =>
      prevWarehouse.filter((warehouse) => warehouse.id !== id)
    );

    setFormValues((prevFormValues) => {
      const updatedQtyList = { ...prevFormValues.qty_list.qty };
      delete updatedQtyList[id];

      return {
        ...prevFormValues,
        qty_list: {
          ...prevFormValues.qty_list,
          qty: updatedQtyList,
        },
      };
    });
  };

  const dataSource =
    initialWarehouses?.map((warehouse) => {
      const { id, name } = warehouse;

      formValues.qty_list.qty[id] = formValues.qty_list.qty[id] ?? 1;

      return {
        id,
        name,
        delete: true,
        incrementCounter,
        decrementCounter,
        onQuantityChange,
        onDelete,
        formValues,
      };
    }) ?? [];

  form.setFieldsValue(formValues);

  return (
    hasStock && (
      <WarehouseController
        warehouses={initialWarehouses}
        setWarehouses={setInitialWarehouses}
        columns={columns}
        dataSource={dataSource}
      />
    )
  );
};
