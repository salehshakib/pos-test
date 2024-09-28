import { Button, Form } from 'antd';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../../redux/services/pos/posSlice';
import { calculateOriginalPrice } from '../../../utilities/lib/calculatePrice';
import { showCurrency } from '../../../utilities/lib/currency';
import { openNotification } from '../../../utilities/lib/openToaster';
import { onDelete } from '../../../utilities/lib/productTable/counters';
import { calculateUnitCost } from '../../../utilities/lib/updateFormValues/calculateById';
import { updateFormValues } from '../../../utilities/lib/updateFormValues/updateFormValues';
import CustomCheckbox from '../../Shared/Checkbox/CustomCheckbox';
import { CustomQuantityInput } from '../../Shared/Input/CustomQuantityInput';
import { ProductTable } from '../../Shared/ProductControllerComponent/ProductTable';

const columns = [
  {
    title: 'Choose',
    dataIndex: 'delete',
    key: 'delete',
    align: 'center',
    width: 80,
    fixed: 'left',
    render: (props, record) => {
      return (
        props && (
          <div className="flex items-center justify-center gap-3 pl-9">
            <CustomCheckbox value={record?.id} name={['delete', record?.id]} />
          </div>
        )
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: (name) => (
      <span className="text-dark text-xs font-medium md:text-sm">{name}</span>
    ),
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    align: 'center',
    width: 150,
    render: (sku) => (
      <span className="text-dark text-xs font-medium md:text-sm">{sku}</span>
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
    title: 'Sold Qty',
    dataIndex: 'soldQty',
    key: 'soldQty',
    align: 'center',
    width: 100,
    render: (soldQty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {soldQty ?? 0}
      </span>
    ),
  },
  {
    title: 'Returned Qty',
    dataIndex: 'returned_qty',
    key: 'returned_qty',
    align: 'center',
    width: 150,
    render: (returned_qty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {returned_qty ?? 0}
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
              onClick={() => record.decrementCounter(record?.id)}
            />
          </div>
          <CustomQuantityInput
            value={
              parseInt(record.formValues.product_list.qty[record.id]) -
                parseInt(
                  record.formValues.product_list.returned_qty[record.id]
                ) || 0
            }
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
];

export const ReturnProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();

  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty =
        prevFormValues.product_list.qty[id] !== undefined
          ? prevFormValues.product_list.qty[id]
          : 1;

      if (currentQty === parseInt(formValues?.product_list?.max_return?.[id])) {
        openNotification('info', "Can't add more than sold quantity");
        return prevFormValues;
      }

      if (
        currentQty === parseInt(formValues?.product_list?.returned_qty?.[id])
      ) {
        openNotification('info', "Can't add more than sold quantity");
        return prevFormValues;
      }

      const newQty = Math.min(
        Number(currentQty) + 1,
        parseInt(formValues?.product_list?.max_return?.[id]) -
          parseInt(formValues?.product_list?.returned_qty?.[id])
      );

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
      const newQty = Math.min(
        Number(currentQty) - 1,
        parseInt(formValues?.product_list?.max_return?.[id]) -
          parseInt(formValues?.product_list?.returned_qty?.[id])
      );
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

  const onQuantityChange = (id, value) => {
    const qty = Math.min(
      parseInt(value),
      parseInt(
        formValues?.product_list?.max_return?.[id] -
          parseInt(formValues?.product_list?.returned_qty?.[id])
      )
    );

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      product_list: {
        ...prevFormValues.product_list,
        qty: {
          ...prevFormValues.product_list.qty,
          [id]: qty || 0,
        },
      },
    }));
  };

  const currency = useSelector(useCurrency);

  const dataSource = products?.map((product) => {
    const {
      id,
      name,
      sku,
      selling_price: unit_cost,
      sale_units,
      taxes,
      tax_method,
      soldQty,
      returned_qty,
    } = product ?? {};

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
      soldQty,
      delete: true,
      returned_qty,
      discount: showCurrency(formValues.product_list.discount[id], currency),
      tax: showCurrency(formValues.product_list.tax[id], currency),
      subTotal: showCurrency(formValues.product_list.total[id], currency),
      qty:
        parseInt(formValues.product_list.qty[id]) -
        parseInt(formValues.product_list.returned_qty[id]),
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      onDelete,
      products,
      setProducts,
      formValues,
      setFormValues,
    };
  });

  form.setFieldsValue(formValues);

  return <ProductTable columns={columns} dataSource={dataSource} />;
};
