/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form } from 'antd';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

import { fullColLayout } from '../../../layout/FormLayout';
import CustomInput from '../../Shared/Input/CustomInput';
import CustomSelect from '../../Shared/Select/CustomSelect';
import CustomTable from '../../Shared/Table/CustomTable';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
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
    align: 'center',
    render: (unitCost) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {unitCost}
      </span>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 200,
    render: (quantity, record) => {
      return quantity >= 0 ? (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {quantity}
        </span>
      ) : (
        <CustomInput
          type={'number'}
          name={['product_list', 'qty', record?.id]}
          placeholder="quantity"
          noStyle={true}
        />
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 180,
    render: (action, record) => {
      return (
        action && (
          <div className="flex w-full items-center justify-center gap-3">
            <CustomSelect
              name={['product_list', 'action', record?.id]}
              placeholder="Type"
              options={[
                {
                  value: 'Addition',
                  label: 'Addition (+)',
                },
                {
                  value: 'Subtraction',
                  label: 'Subtraction (-)',
                },
              ]}
              styleProps={{ width: '9rem' }}
              noStyle={true}
            />
          </div>
        )
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
      const { setRowId } = props ?? {};
      return (
        props && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setRowId(record?.id)}
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

export const ProductTableComponent = () => {
  const form = Form.useFormInstance();
  const productData = Form.useWatch('product_name', form);
  const productListData = Form.useWatch('product_list', form);

  const [rowId, setRowId] = useState(undefined);

  useEffect(() => {
    if (productData?.length > 0) {
      const setFormValuesIfNotExists = (productIndex) => {
        const selectedProduct = productData[productIndex];
        const qtyPath = ['product_list', 'qty', selectedProduct];
        const actionPath = ['product_list', 'action', selectedProduct];

        // Check if the value already exists
        const existingQty = form.getFieldValue(qtyPath);
        const existingAction = form.getFieldValue(actionPath);

        // Only set the values if they do not exist
        if (existingQty === undefined) {
          form.setFieldValue(qtyPath, 1);
        }
        if (existingAction === undefined) {
          form.setFieldValue(actionPath, 'Addition');
        }
      };

      if (rowId !== undefined) {
        setFormValuesIfNotExists(rowId);
        setRowId(undefined);
      } else {
        const lastProductIndex = productData.length - 1;
        if (lastProductIndex >= 0) {
          setFormValuesIfNotExists(lastProductIndex);
        }
      }
    }
  }, [productData]);

  useEffect(() => {
    if (rowId !== undefined) {
      const updatedProductData = productData?.filter((item) => item !== rowId);

      form.setFieldValue('product_name', updatedProductData);
    }
  }, [rowId]);

  const dataSource =
    productData?.map((item) => {
      const { sku, unitCost } = item ?? {};

      return {
        id: item,
        name: item,
        sku,
        unitCost,
        action: true,
        delete: {
          setRowId,
        },
      };
    }) ?? [];

  dataSource.push({
    name: 'Total',
    quantity: productListData
      ? Object.values(productListData?.qty)?.reduce((acc, cur) => acc + cur, 0)
      : -1,
  });

  return (
    productData?.length > 0 && (
      <Col {...fullColLayout} className="mb-10">
        <CustomTable
          columns={columns}
          dataSource={dataSource}
          showPaging={false}
        />
      </Col>
    )
  );
};
