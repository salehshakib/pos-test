import { EllipsisOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Dropdown, Menu, Spin, Table } from 'antd';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { useCurrentUser } from '../../../../redux/services/auth/authSlice';
import { useGetAllProductVariantsQuery } from '../../../../redux/services/product/productApi';

const ProductInquiry = () => {
  const user = useSelector(useCurrentUser);

  const { data, isFetching } = useGetAllProductVariantsQuery({
    params: { parent: 1, child: 1 },
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const loadingContent = (
    <div className="flex items-center justify-center">
      <div className="text-center text-lg">
        <Spin />
      </div>
    </div>
  );

  const options = isFetching
    ? [
        {
          value: 'loading',
          label: loadingContent,
        },
      ]
    : (data?.results?.productvariant?.map((product) => ({
        value: product?.id?.toString(),
        label: `${product.name} (SKU: ${product.sku})`,
        product: { ...product },
      })) ?? []);

  const handleSelect = (value, option) => {
    setSelectedProduct(option.product);
    setInputValue(option.label);
  };

  const handleChange = (value) => {
    setInputValue(value);
  };

  const menuItems = [
    {
      key: '1',
      label: (
        <Button type="primary" className="w-full">
          Sell
        </Button>
      ),
    },
    {
      key: '2',
      label: <Button className="w-full">Purchase</Button>,
    },
  ];

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Warehouse',
      dataIndex: 'warehouse',
      key: 'warehouse',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) =>
        record?.warehouse_id === user?.warehouse_id ? (
          <Dropdown overlay={<Menu items={menuItems} />} trigger={['click']}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        ) : (
          'N/A'
        ),
    },
  ];

  const dataSource = selectedProduct?.product_qties?.map((item) => ({
    key: item?.warehouse_id,
    product_name: selectedProduct?.name,
    sku: selectedProduct?.sku,
    warehouse: item?.warehouses?.name,
    qty: item?.qty,
    warehouse_id: item?.warehouse_id,
  }));

  return (
    <section className="lg:p-10">
      <AutoComplete
        options={options}
        className="mt-1 w-full"
        size="large"
        placeholder="Search Product Variants"
        suffixIcon={<FaSearch />}
        allowClear={true}
        onSelect={handleSelect}
        onChange={handleChange}
        value={inputValue}
      />

      {selectedProduct && (
        <div className="mt-10 p-6 border rounded-lg shadow-md bg-white">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            size="middle"
          />
        </div>
      )}
    </section>
  );
};

export default ProductInquiry;
