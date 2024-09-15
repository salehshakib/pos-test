import { Button } from 'antd';
import { useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../../redux/services/pos/posSlice';
import { calculateOriginalPrice } from '../../../utilities/lib/calculatePrice';
import { showCurrency } from '../../../utilities/lib/currency';
import { openNotification } from '../../../utilities/lib/openToaster';
import { onDelete } from '../../../utilities/lib/productTable/counters';
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
    title: 'Unit Cost',
    dataIndex: 'unitCost',
    key: 'unitCost',
    align: 'center',
    width: 100,
    render: (unitCost) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
            // name={["product_list", "qty", record?.id]}
            value={record.formValues.product_list.qty[record?.id] || 0}
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
    width: 150,
    render: (subTotal) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {subTotal}
      </span>
    ),
  },
];

function setFormValuesId(
  id,
  purchase_unit_id,
  unit_cost,
  purchase_units,
  formValues,
  productUnits,
  tax_id,
  // eslint-disable-next-line no-unused-vars
  taxes
) {
  const sanitizeIntValue = (value) => {
    const number = parseInt(value);
    return isNaN(number) ? 0 : number;
  };

  const sanitizeFloatValue = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? 0 : number;
  };

  if (id) {
    formValues.product_list.qty[id] = sanitizeIntValue(
      formValues.product_list.qty?.[id] || 1
    );

    formValues.product_list.net_unit_cost[id] =
      sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id]) ||
      sanitizeFloatValue(unit_cost) ||
      '0';

    formValues.product_list.discount[id] = sanitizeFloatValue(
      formValues.product_list.discount?.[id] ?? 0
    );

    formValues.product_list.tax_rate[id] = sanitizeIntValue(
      formValues.product_list.tax_rate?.[id] ?? taxes?.rate ?? 0
    );

    formValues.product_list.tax[id] = sanitizeFloatValue(
      (
        (sanitizeIntValue(productUnits.purchase_units?.[id] ?? 1) *
          sanitizeFloatValue(formValues.product_list.tax_rate?.[id]) *
          sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id]) *
          sanitizeIntValue(formValues.product_list.qty?.[id])) /
        100
      ).toFixed(2)
    );

    const purchaseUnitsOperationValue = purchase_units?.operation_value ?? 1;

    productUnits.purchase_units[id] =
      sanitizeIntValue(productUnits?.purchase_units?.[id]) ||
      purchaseUnitsOperationValue;

    formValues.product_list.total[id] =
      sanitizeIntValue(productUnits.purchase_units?.[id]) *
        sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id] ?? 0) *
        sanitizeIntValue(formValues.product_list.qty?.[id]) -
      sanitizeFloatValue(formValues.product_list.discount?.[id]) +
      sanitizeFloatValue(formValues.product_list.tax?.[id]);

    formValues.product_list.purchase_unit_id[id] =
      formValues.product_list.purchase_unit_id?.[id] ?? purchase_unit_id;

    if (formValues?.product_list?.tax_id) {
      formValues.product_list.tax_id[id] =
        formValues.product_list.tax_id?.[id] ?? tax_id;
    }
  }
}

export const ReturnProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productUnits,
  form,
}) => {
  const incrementCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.qty[id] || 1;

      if (currentQty === parseInt(formValues?.product_list?.max_return?.[id])) {
        // message.error("Maximum quantity reached");
        openNotification('info', 'Maximum quantity reached');

        return prevFormValues;
      }

      const newQty = Math.min(
        Number(currentQty) + 1,
        parseInt(formValues?.product_list?.max_return?.[id])
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
        parseInt(formValues?.product_list?.max_return?.[id])
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
      parseInt(formValues?.product_list?.max_return?.[id])
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
      buying_price: unit_cost,
      purchase_unit_id,
      purchase_units,
      taxes,
      tax_method,
    } = product ?? {};

    setFormValuesId(
      id,
      purchase_unit_id,
      calculateOriginalPrice(unit_cost, taxes?.rate, tax_method),
      purchase_units,
      formValues,
      productUnits,
      taxes,
      tax_method
    );

    return {
      id,
      name,
      sku,
      unitCost: showCurrency(
        formValues.product_list.net_unit_cost[id],
        currency
      ),
      delete: true,
      discount: showCurrency(formValues.product_list.discount[id], currency),
      tax: showCurrency(formValues.product_list.tax[id], currency),
      subTotal: showCurrency(formValues.product_list.total[id], currency),
      qty: formValues.product_list.qty[id],
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

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [form, formValues]);

  return <ProductTable columns={columns} dataSource={dataSource} />;
};
