/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form } from 'antd';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

import { fullColLayout } from '../../../layout/FormLayout';
import CustomInput from '../../Shared/Input/CustomInput';
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
    title: 'UnitPrice',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    align: 'center',
    width: 200,
    render: (unitPrice, record) => {
      return unitPrice >= 0 ? (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {unitPrice}
        </span>
      ) : (
        <CustomInput
          type={'number'}
          name={['product_list', 'unit_price', record?.id]}
          placeholder="quantity"
          noStyle={true}
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
      const { setRowId } = props ?? {};
      return (
        props && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setRowId(record?.id)}
              type="button"
              className="primary-bg rounded-xl p-1 text-white duration-300 hover:scale-110"
            >
              <MdDelete className="text-lg md:text-xl" />
            </button>
          </div>
        )
      );
    },
  },
];

const ComboTableComponent = () => {
  const form = Form.useFormInstance();
  const productData = Form.useWatch('product_id', form);
  const productListData = Form.useWatch('product_list', form);

  const [rowId, setRowId] = useState(undefined);

  useEffect(() => {
    if (productData?.length > 0) {
      const setFormValuesIfNotExists = (productIndex) => {
        const selectedProduct = productData[productIndex];
        const qtyPath = ['product_list', 'qty', selectedProduct];
        const unitPricePath = ['product_list', 'unit_price', selectedProduct];

        // Check if the value already exists
        const existingQty = form.getFieldValue(qtyPath);
        const existingUnitPrice = form.getFieldValue(unitPricePath);

        // Only set the values if they do not exist
        if (existingQty === undefined) {
          form.setFieldValue(qtyPath, 1);
        }
        if (existingUnitPrice === undefined) {
          form.setFieldValue(unitPricePath, 0);
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

      form.setFieldValue('product_id', updatedProductData);
    }
  }, [rowId]);

  const dataSource =
    productData?.map((item) => {
      return {
        key: item,
        id: item,
        name: item,
        action: true,
        delete: {
          setRowId,
        },
      };
    }) ?? [];

  dataSource.push({
    id: 'total',
    name: 'Total',
    quantity: productListData
      ? Object.values(productListData?.qty)?.reduce((acc, cur) => acc + cur, 0)
      : -1,
    unitPrice: productListData
      ? Object.values(productListData?.unit_price)?.reduce(
          (acc, cur) => acc + cur,
          0
        )
      : -1,
  });

  return (
    productData?.length > 0 && (
      <Col {...fullColLayout} className={`${productData && 'mb-10'}`}>
        <CustomTable
          columns={columns}
          dataSource={dataSource}
          showPaging={false}
        />
      </Col>
    )
  );
};

export default ComboTableComponent;
