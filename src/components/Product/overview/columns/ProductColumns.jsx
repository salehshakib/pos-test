import { Button } from 'antd';
import { FaEdit, FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import CustomInput from '../../../Shared/Input/CustomInput';
import { CustomQuantityInput } from '../../../Shared/Input/CustomQuantityInput';

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: (name, record) => (
      <div
        className={`flex items-center gap-2 ${
          name !== 'Total' && 'hover:cursor-pointer hover:underline'
        }`}
        onClick={() => {
          record?.handleProductEdit(record?.id, record?.name);
        }}
      >
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
    render: (sku) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {sku}
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
            name={['product_list', 'qty', record?.id]}
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
    title: 'UnitPrice',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    align: 'center',
    width: 200,
    render: (unitPrice, record) => {
      return unitPrice >= 0 ? (
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
          {unitPrice}
        </span>
      ) : (
        <CustomInput
          type={'number'}
          name={['product_list', 'unit_price', record?.id]}
          placeholder="quantity"
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
