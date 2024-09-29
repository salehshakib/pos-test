import { useSelector } from 'react-redux';

import { useCurrency } from '../../../redux/services/pos/posSlice';
import { calculateOriginalPrice } from '../../../utilities/lib/calculatePrice';
import { showCurrency } from '../../../utilities/lib/currency';
import { getWarehouseQuantity } from '../../../utilities/lib/getWarehouseQty';
import { openNotification } from '../../../utilities/lib/openToaster';
import { onDelete } from '../../../utilities/lib/productTable/counters';
import CustomCheckbox from '../../Shared/Checkbox/CustomCheckbox';
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
      const onChange = (value) => {
        const { id, checked } = value.target;
        const productId = id.split('_')[1];

        if (parseInt(record?.requestedStock) <= parseInt(record?.stock)) {
          record.updateProductList(productId, checked, record.stock);
        } else {
          record.form.setFieldValue(['delete', record?.id], false);
          return openNotification(
            'error',
            'Requested stock is greater than stock'
          );
        }
      };
      return (
        props && (
          <div className="flex items-center justify-center gap-3 pl-9">
            <CustomCheckbox
              value={record?.id}
              name={['delete', record?.id]}
              onChange={onChange}
            />
          </div>
        )
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{name}</span>
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
    title: 'Unit Cost',
    dataIndex: 'unitCost',
    key: 'unitCost',
    align: 'right',
    width: 100,
    render: (unitCost) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {unitCost ?? 0}
      </span>
    ),
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
    width: 100,
    render: (stock) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {stock ?? 0}
      </span>
    ),
  },
  {
    title: 'Requested',
    dataIndex: 'requestedStock',
    key: 'requestedStock',
    align: 'center',
    width: 100,
    render: (requestedStock, record) => (
      <span
        className={`text-dark   text-xs font-medium md:text-sm ${record?.stock < record?.requestedStock ? 'text-red-500' : ''}`}
      >
        {requestedStock ?? 0}
      </span>
    ),
  },
  {
    title: 'Vat',
    dataIndex: 'tax',
    key: 'tax',
    align: 'right',
    width: 100,
    render: (tax) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{tax}</span>
    ),
  },
  {
    title: 'SubTotal',
    dataIndex: 'subTotal',
    key: 'subTotal',
    align: 'right',
    width: 150,
    render: (subTotal) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
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

    // formValues.product_list.discount[id] = sanitizeFloatValue(
    //   formValues.product_list.discount?.[id] ?? 0
    // );

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
      //   sanitizeFloatValue(formValues.product_list.discount?.[id]) +
      sanitizeFloatValue(formValues.product_list.tax?.[id]);

    formValues.product_list.purchase_unit_id[id] =
      formValues.product_list.purchase_unit_id?.[id] ?? purchase_unit_id;

    if (formValues?.product_list?.tax_id) {
      formValues.product_list.tax_id[id] =
        formValues.product_list.tax_id?.[id] ?? tax_id;
    }
  }
}

export const StockTransferProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productUnits,
  form,
  setUpdatedProductList,
}) => {
  const updateProductList = (productId, isChecked, qty) => {
    setUpdatedProductList((prevList) => {
      if (isChecked) {
        return {
          ...prevList,
          product_list: {
            ...prevList.product_list,

            qty: {
              ...prevList.product_list?.qty,
              [productId]: qty,
            },
            purchase_unit_id: {
              ...prevList.product_list?.purchase_unit_id,
              [productId]:
                formValues.product_list?.purchase_unit_id?.[productId],
            },
            net_unit_cost: {
              ...prevList.product_list?.net_unit_cost,
              [productId]: formValues.product_list?.net_unit_cost?.[productId],
            },
            tax_rate: {
              ...prevList.product_list?.tax_rate,
              [productId]: formValues.product_list?.tax_rate?.[productId],
            },
            tax: {
              ...prevList.product_list?.tax,
              [productId]: formValues.product_list?.tax?.[productId],
            },
            total: {
              ...prevList.product_list?.total,
              [productId]: formValues.product_list?.total?.[productId],
            },
            tax_id: {
              ...prevList.product_list?.tax_id,
              [productId]: formValues.product_list?.tax_id?.[productId],
            },
          },
        };
      } else {
        if (!prevList.product_list) return prevList;

        const updatedProductList = Object.keys(prevList.product_list).reduce(
          (acc, key) => {
            if (prevList.product_list[key]) {
              const { [productId]: omitted, ...rest } =
                prevList.product_list[key];
              acc[key] = rest;
            }
            return acc;
          },
          {}
        );

        return {
          ...prevList,
          product_list: updatedProductList,
        };
      }
    });
  };

  const currency = useSelector(useCurrency);

  const dataSource = products?.map((item) => {
    const { products } = item;
    const warehouseId = form.getFieldValue('from_warehouse_id');

    const {
      id,
      buying_price: unit_cost,
      purchase_unit_id,
      purchase_units,
      tax_id,
      taxes,
      tax_method,
    } = products ?? {};

    setFormValuesId(
      id,
      purchase_unit_id,
      calculateOriginalPrice(unit_cost, taxes?.rate, tax_method),
      purchase_units,
      formValues,
      productUnits,
      tax_id,
      taxes,
      tax_method
    );

    return {
      id: item?.id,
      name: item?.product_variants?.name,
      sku: item?.product_variants?.sku,
      unitCost: showCurrency(
        parseInt(item?.product_variants?.buying_price),
        currency
      ),
      delete: true,
      tax: showCurrency(formValues.product_list.tax[id], currency),
      subTotal: showCurrency(formValues.product_list.total[id], currency),
      onDelete,
      products,
      setProducts,
      formValues,
      setFormValues,
      updateProductList,
      stock: getWarehouseQuantity(
        item?.product_variants?.product_qties,
        warehouseId
      ),
      requestedStock: item?.need_qty,
      form,
    };
  });

  form.setFieldsValue(formValues);

  return <ProductTable columns={columns} dataSource={dataSource} />;
};
