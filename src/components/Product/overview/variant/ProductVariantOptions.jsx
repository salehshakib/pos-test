import { Form, Input, Table, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { FcCancel } from 'react-icons/fc';
import { IoIosSave } from 'react-icons/io';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../../../redux/services/pos/posSlice';
import { showCurrency } from '../../../../utilities/lib/currency';
import { formatProductData } from '../../../../utilities/lib/product/variant';

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
      title: 'Buying Cost',
      dataIndex: 'cost',
      key: 'cost',
      align: 'right',
      editable: true,
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
      render: (_, record) => {
        const editable = isEditing(record);
        {
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

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  function findNonMatchingItems(data, combination) {
    // Create a Set of data names for faster lookup
    const dataNames = new Set(data?.map((item) => item?.name));

    // Filter the combination array to find non-matching items
    return combination.filter(
      (combinationItem) => !dataNames.has(combinationItem.name)
    );
  }

  useEffect(() => {
    if (!editData && !isEditDrawerOpen) {
      const variantDatasource =
        combination?.map((item, index) => {
          return {
            key: item.key,
            name: item.name,
            sku: data?.[index]?.sku ?? item.sku,
            iemi: data?.[index]?.iemi ?? '',
            price: data?.[index]?.price ?? item?.price,
            cost: data?.[index]?.cost ?? item?.cost,
            variant_attribute_ids: item.variant_attribute_ids,
          };
        }) ?? [];

      setData(variantDatasource);

      const initialSelectedKeys = variantDatasource.map((item) => item.key);
      setIsSelected(initialSelectedKeys);
      setSelectedRowData(variantDatasource);
    } else {
      console.log(combination);

      console.log(editData?.variants);
      console.log(editData);

      const formattedData = formatProductData(
        editData.variants,
        editData.name,
        editData?.sku
      );

      console.log(formattedData);

      const variantDatasource =
        combination?.map((item, index) => {
          console.log(item.variant_options);
          return {
            key: item.name,
            name: item.name,
            sku: data?.[index]?.sku ?? item.sku,
            iemi: data?.[index]?.iemi ?? '',
            price: data?.[index]?.price ?? item?.price,
            cost: data?.[index]?.cost ?? item?.cost,
            variant_options: item.variant_options,
          };
        }) ?? [];

      const nonMatchingItems = findNonMatchingItems(
        formattedData,
        variantDatasource
      );

      console.log(nonMatchingItems);

      const newData = [...formattedData, ...nonMatchingItems];

      setData(newData);
      // setData({ ...data, variants: [...data.variants, ...nonMatchingItems] });

      const initialSelectedKeys = data.map((item) => item.key);
      setIsSelected(initialSelectedKeys);
      setSelectedRowData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combination, editData, isEditDrawerOpen]);

  // useEffect(() => {
  //   if (editData) {
  //     // variant_options: [
  //     //   [
  //     //     {
  //     //       id: 3,
  //     //       attribute_id: 2,
  //     //       name: 'ARO 3',
  //     //       created_at: '2024-09-28T19:50:34.000000Z',
  //     //       updated_at: '2024-09-28T19:50:34.000000Z',
  //     //       deleted_at: null
  //     //     },
  //     //     {
  //     //       id: 4,
  //     //       attribute_id: 2,
  //     //       name: 'ARO 4',
  //     //       created_at: '2024-09-28T19:50:34.000000Z',
  //     //       updated_at: '2024-09-28T19:50:34.000000Z',
  //     //       deleted_at: null
  //     //     }
  //     //   ],
  //     //   [
  //     //     {
  //     //       id: 1,
  //     //       attribute_id: 1,
  //     //       name: 'ARO 1',
  //     //       created_at: '2024-09-28T19:50:04.000000Z',
  //     //       updated_at: '2024-09-28T19:50:04.000000Z',
  //     //       deleted_at: null
  //     //     },
  //     //     {
  //     //       id: 2,
  //     //       attribute_id: 1,
  //     //       name: 'ARO 2',
  //     //       created_at: '2024-09-28T19:50:04.000000Z',
  //     //       updated_at: '2024-09-28T19:50:04.000000Z',
  //     //       deleted_at: null
  //     //     }
  //     //   ]
  //     // ]

  //     // const variantDatasource =
  //   }
  // }, [editData]);

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
        />
      </Form>
    );
  } else return null;
};

export default ProductVariantOption;
