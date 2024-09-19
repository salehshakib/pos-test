import { Button } from 'antd';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import CustomCheckbox from '../../Shared/Checkbox/CustomCheckbox';
import { CustomQuantityInput } from '../../Shared/Input/CustomQuantityInput';

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: (name) => (
      // <div
      //   className={`flex items-center gap-2 ${
      //     name !== "Total" && "hover:underline hover:cursor-pointer"
      //   }`}
      //   onClick={() => {
      //     record?.handleProductEdit(record?.id, record?.name);
      //   }}
      // >
      //   <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
      //     {name}
      //   </span>
      //   {name !== "Total" && <FaEdit className="primary-text" />}
      // </div>
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
    render: (sku) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {sku}
      </span>
    ),
  },
  {
    title: 'Unit Cost',
    dataIndex: 'unitCost',
    key: 'unitCost',
    align: 'center',
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
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    align: 'center',
    render: (discount) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        ${discount}
      </span>
    ),
  },
  {
    title: 'Vat',
    dataIndex: 'tax',
    key: 'tax',
    align: 'center',
    render: (tax) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {tax}
      </span>
    ),
  },
  {
    title: 'SubTotal',
    dataIndex: 'subTotal',
    key: 'subTotal',
    align: 'center',
    render: (subTotal) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        ${subTotal}
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
            {/* <button
              onClick={() => record.onDelete(record.id)}
              className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
              type="button"
            >
              <MdDelete className="text-lg md:text-xl" />
            </button> */}
            <CustomCheckbox value={record?.id} />
          </div>
        )
      );
    },
  },
];
