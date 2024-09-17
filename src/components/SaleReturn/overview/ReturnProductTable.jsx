import { Button } from 'antd';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../../redux/services/pos/posSlice';
import { calculateOriginalPrice } from '../../../utilities/lib/calculatePrice';
import { showCurrency } from '../../../utilities/lib/currency';
import { openNotification } from '../../../utilities/lib/openToaster';
import { onDelete } from '../../../utilities/lib/productTable/counters';
import { calculateUnitCost } from '../../../utilities/lib/updateFormValues/calculateById';
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
            name={['product_list', 'qty', record?.id]}
            // value={record?.qty}
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
  sale_unit_id,
  unit_cost,
  sale_units,
  formValues,
  productUnits,
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
    // Quantity
    const qty = sanitizeIntValue(formValues.product_list.qty?.[id] || 1);
    formValues.product_list.qty[id] = qty;

    // Net Unit Cost
    const netUnitCost =
      sanitizeFloatValue(formValues.product_list.net_unit_cost?.[id]) ||
      sanitizeFloatValue(unit_cost) ||
      0;
    formValues.product_list.net_unit_cost[id] = netUnitCost;

    // Discount
    const discount = sanitizeFloatValue(
      formValues.product_list.discount?.[id] ?? 0
    );
    formValues.product_list.discount[id] = discount;

    // Tax Rate
    const taxRate = sanitizeFloatValue(
      formValues.product_list.tax_rate?.[id] ?? parseFloat(taxes) ?? 0
    );
    formValues.product_list.tax_rate[id] = taxRate;

    // Purchase Unit Operator and Operation Value
    // const purchaseUnitsOperationValue = sanitizeFloatValue(
    //   sale_units?.operation_value ?? 1
    // );
    // const purchaseUnitsOperator = sale_units?.operator ?? '*';

    // Calculate Tax
    const baseValue = netUnitCost - discount;
    let taxAmount = (taxRate * baseValue * qty) / 100;

    // If operator logic is needed for tax calculation (e.g., '/', '*')
    // if (purchaseUnitsOperator === '/') {
    //   taxAmount = taxAmount / purchaseUnitsOperationValue;
    // } else if (purchaseUnitsOperator === '*') {
    //   taxAmount = taxAmount * purchaseUnitsOperationValue;
    // }

    // Ensure tax is rounded to two decimal places
    formValues.product_list.tax[id] = sanitizeFloatValue(taxAmount.toFixed(2));

    // Total Calculation
    let total = baseValue * qty + taxAmount; // Base value + tax

    // Ensure total is properly sanitized and rounded
    formValues.product_list.total[id] = sanitizeFloatValue(total.toFixed(2));

    // Set purchase unit id
    formValues.product_list.sale_unit_id[id] =
      formValues.product_list.sale_unit_id?.[id] ?? sale_unit_id;

    // Set tax id if present
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

        return openNotification('info', 'Maximum quantity reached');
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
      sale_unit_id,
      sale_units,
      taxes,
      tax_method,
    } = product ?? {};

    const price = calculateUnitCost(sale_units, unit_cost);

    setFormValuesId(
      id,
      sale_unit_id,
      calculateOriginalPrice(price, taxes?.rate, tax_method),
      sale_units,
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
        formValues.product_list.net_unit_price[id],
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

  form.setFieldsValue(formValues);

  return <ProductTable columns={columns} dataSource={dataSource} />;
};
