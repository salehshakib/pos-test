import { Form, Input, Table, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FcCancel } from 'react-icons/fc';
import { IoIosSave } from 'react-icons/io';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { showCurrency } from '../../../../utilities/lib/currency';

// Editable Cell component
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? <Input type="number" /> : <Input />;
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
}) => {
  const [variantForm] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const currency = useSelector(useCurrency);

  // Define columns and memoize for performance
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      width: 150,
      render: (sku) => (
        <span className="text-dark   text-xs md:text-sm">{sku}</span>
      ),
    },
    {
      title: 'IEMI',
      dataIndex: 'iemi',
      key: 'iemi',
      editable: true,
      render: (iemi) => (
        <span className="text-dark   text-xs md:text-sm">{iemi}</span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      editable: true,
      render: (price) => (
        <span className="text-dark   text-xs md:text-sm">
          {showCurrency(price, currency)}
        </span>
      ),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      editable: true,
      render: (cost) => (
        <span className="text-dark   text-xs md:text-sm">
          {showCurrency(cost, currency)}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        const selected = isSelected.includes(record.key);
        if (selected) {
          return null;
        } else {
          return editable ? (
            <span className="flex items-center gap-3">
              <IoIosSave
                size={20}
                className="cursor-pointer "
                onClick={() => save(record.key)}
              />

              <FcCancel
                size={20}
                className="cursor-pointer "
                onClick={cancel}
              />
            </span>
          ) : (
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
          );
        }
      },
    },
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'price' || col.dataIndex === 'cost'
            ? 'number'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // Memoize variantDatasource for performance
  const variantDatasource = useMemo(
    () =>
      combination.map((item, index) => {
        return {
          key: item.name,
          name: item.name,
          sku: data?.[index]?.sku ?? item.sku,
          iemi: data?.[index]?.iemi ?? '',
          price: data?.[index]?.price ?? item?.price,
          cost: data?.[index]?.cost ?? item?.cost,
          variant_options: item.variant_options,
        };
      }),
    [combination]
  );

  useEffect(() => {
    if (variantDatasource.length) {
      setData(variantDatasource);
    }
  }, [variantDatasource]);

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
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      });
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const [selectedRowData, setSelectedRowData] = useState([]);
  const [isSelected, setIsSelected] = useState([]);

  // Row selection
  const rowSelection = {
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
        />
      </Form>
    );
  } else return null;
};

export default ProductVariantOption;
