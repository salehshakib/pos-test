import { Form, Input, Table, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
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

function formatProductData(data, productName, sku) {
  return (
    data
      // .filter((item) => item.name.includes(productName))
      .map((item) => {
        return {
          key: item.name.split(productName)[1].trim(),
          name: item.name.split(productName)[1].trim(),
          sku: item.sku.split(sku + '-')[1].trim(),
          iemi: item.imei_number ?? '',
          price: item.selling_price,
          cost: item.buying_price,
          variant_options: item.product_variant_attribute_options.reduce(
            (acc, option) => {
              const attribute = option.attribute_option.attribute;
              const existingAttr = acc.find(
                (attr) => attr.attribute_id === attribute.id
              );

              if (existingAttr) {
                existingAttr.options.push({
                  id: option.attribute_option.id,
                  attribute_id: option.attribute_option.attribute_id,
                  name: option.attribute_option.name,
                  created_at: option.attribute_option.created_at,
                  updated_at: option.attribute_option.updated_at,
                  deleted_at: option.attribute_option.deleted_at,
                });
              } else {
                acc.push({
                  attribute_id: attribute?.id,
                  attribute_name: attribute.name,
                  options: [
                    {
                      id: option.attribute_option.id,
                      attribute_id: option.attribute_option.attribute_id,
                      name: option.attribute_option.name,
                      created_at: option.attribute_option.created_at,
                      updated_at: option.attribute_option.updated_at,
                      deleted_at: option.attribute_option.deleted_at,
                    },
                  ],
                });
              }

              return acc;
            },
            []
          ),
        };
      })
  );
}

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

  useEffect(() => {
    if (!editData && !isEditDrawerOpen) {
      const variantDatasource =
        combination?.map((item, index) => {
          console.log(item);
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

      setData(variantDatasource);

      const initialSelectedKeys = variantDatasource.map((item) => item.key);
      setIsSelected(initialSelectedKeys);
      setSelectedRowData(variantDatasource);
    }
    //  else {

    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combination]);

  useEffect(() => {
    if (editData) {
      // variant_options: [
      //   [
      //     {
      //       id: 3,
      //       attribute_id: 2,
      //       name: 'ARO 3',
      //       created_at: '2024-09-28T19:50:34.000000Z',
      //       updated_at: '2024-09-28T19:50:34.000000Z',
      //       deleted_at: null
      //     },
      //     {
      //       id: 4,
      //       attribute_id: 2,
      //       name: 'ARO 4',
      //       created_at: '2024-09-28T19:50:34.000000Z',
      //       updated_at: '2024-09-28T19:50:34.000000Z',
      //       deleted_at: null
      //     }
      //   ],
      //   [
      //     {
      //       id: 1,
      //       attribute_id: 1,
      //       name: 'ARO 1',
      //       created_at: '2024-09-28T19:50:04.000000Z',
      //       updated_at: '2024-09-28T19:50:04.000000Z',
      //       deleted_at: null
      //     },
      //     {
      //       id: 2,
      //       attribute_id: 1,
      //       name: 'ARO 2',
      //       created_at: '2024-09-28T19:50:04.000000Z',
      //       updated_at: '2024-09-28T19:50:04.000000Z',
      //       deleted_at: null
      //     }
      //   ]
      // ]
      console.log(editData?.variants);
      console.log(editData);

      const data = formatProductData(
        editData.variants,
        editData.name,
        editData?.sku
      );
      console.log(data);

      setData(data);

      const initialSelectedKeys = data.map((item) => item.key);
      setIsSelected(initialSelectedKeys);
      setSelectedRowData(data);
      // const variantDatasource =
    }
  }, [editData]);

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
          console.log(newData);
          setSelectedRowData(newData);
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
