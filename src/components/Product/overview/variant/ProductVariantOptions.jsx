import { Button, Form, Input, InputNumber, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { showCurrency } from '../../../../utilities/lib/currency';
import {
  findNonMatchingItems,
  formatProductData,
} from '../../../../utilities/lib/product/variant';

// Editable Cell component
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? (
      <InputNumber controls={false} changeOnWheel={false} width={'full'} />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

// Main component
const ProductVariantOption = ({
  combination,
  onCustomSubmit,
  data: editData,
  reset,
}) => {
  const [variantForm] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const currency = useSelector(useCurrency);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 330,
      editable: true,
      render: (name) => (
        <span className="text-dark   text-xs md:text-sm">{name}</span>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      editable: true,
      width: 130,
      render: (sku) => (
        <span className="text-dark   text-xs md:text-sm">{sku}</span>
      ),
    },
    {
      title: 'IEMI',
      dataIndex: 'iemi',
      key: 'iemi',
      width: 130,
      editable: true,
      render: (iemi) => (
        <span className="text-dark   text-xs md:text-sm">{iemi}</span>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
      editable: true,
      width: 100,
      render: (qty) => (
        <span className="text-dark   text-xs md:text-sm">{qty}</span>
      ),
    },
    {
      title: 'Buying Cost',
      dataIndex: 'cost',
      key: 'cost',
      align: 'right',
      editable: true,
      width: 150,
      render: (cost) => (
        <span className="text-dark   text-xs md:text-sm">
          {showCurrency(cost, currency)}
        </span>
      ),
    },
    {
      title: 'Selling Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      width: 150,
      editable: true,
      render: (price) => (
        <span className="text-dark   text-xs md:text-sm">
          {showCurrency(price, currency)}
        </span>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      width: 130,
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        {
          return editable ? (
            <span className="flex items-center gap-2 justify-center font-bold">
              <Button size="small" onClick={cancel}>
                Cancel
              </Button>
              <Button
                size="small"
                type="primary"
                onClick={() => save(record.key)}
              >
                Save
              </Button>
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Button size="small" onClick={() => edit(record)}>
                Edit
              </Button>
            </span>
          );
        }
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'price' ||
          col.dataIndex === 'cost' ||
          col.dataIndex === 'qty'
            ? 'number'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  // console.log(reset);

  useEffect(() => {
    if (!editData && !isEditDrawerOpen) {
      const variantDatasource =
        combination?.map((item) => {
          return {
            key: item.key,
            name: item.name,
            sku: item.sku,
            iemi: item.iemi,
            qty: item.qty,
            price: item.price,
            cost: item.cost,
            variant_attribute_ids: item.variant_attribute_ids,
          };
        }) ?? [];

      setData(variantDatasource);

      const initialSelectedKeys = variantDatasource.map((item) => item.key);
      setIsSelected(initialSelectedKeys);
      setSelectedRowData(variantDatasource);
    } else {
      const formattedData = formatProductData(
        editData.variants,
        editData.name,
        editData?.sku
      );

      const variantDatasource =
        combination?.map((item) => {
          return {
            key: item.key,
            name: item.name,
            sku: item.sku,
            iemi: item.iemi,
            qty: item.qty,
            price: item.price,
            cost: item.cost,
            variant_attribute_ids: item.variant_attribute_ids,
          };
        }) ?? [];

      const nonMatchingItems = findNonMatchingItems(
        formattedData,
        variantDatasource
      );

      let newData = [];
      if (reset) {
        newData = [...variantDatasource];
      } else newData = [...formattedData, ...nonMatchingItems];

      setData(newData);

      if (reset) {
        const initialSelectedKeys = variantDatasource.map((item) => item.key);

        setIsSelected(initialSelectedKeys);
        setSelectedRowData(newData);
      } else {
        const initialSelectedKeys = formattedData.map((item) => item.key);

        setIsSelected(initialSelectedKeys);
        setSelectedRowData(newData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combination, editData, isEditDrawerOpen, reset]);

  // Editing handlers
  const edit = (record) => {
    variantForm.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      variantForm.validateFields(['name', 'sku']).then(() => {
        const row = variantForm.getFieldsValue();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);
          setSelectedRowData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      });
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
    }
  };

  const [selectedRowData, setSelectedRowData] = useState([]);
  const [isSelected, setIsSelected] = useState([]);

  // Row selection
  const rowSelection = {
    selectedRowKeys: isSelected, // Pre-select the rows
    onChange: (selectedRowKeys, selectedRows) => {
      setIsSelected(selectedRowKeys);
      setSelectedRowData(selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
      sku: record.sku,
      iemi: record.iemi,
      price: record.price,
      cost: record.cost,
    }),
  };

  const handleCustomSubmit = useCallback(() => {
    return { selectedRowData };
  }, [selectedRowData]);

  onCustomSubmit(handleCustomSubmit);

  if (combination.length) {
    return (
      <Form form={variantForm} component={false}>
        <Table
          className="mb-5"
          components={{ body: { cell: EditableCell } }}
          title={() => <>Product Variant Options</>}
          size="small"
          pagination={false}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowSelection={rowSelection}
          scroll={{
            x: 'max-content',
          }}
        />
      </Form>
    );
  } else return null;
};

export default ProductVariantOption;
