import { EllipsisOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Dropdown, Menu, Spin, Table } from 'antd';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../../../../redux/services/auth/authSlice';
import { useGetAllProductVariantsQuery } from '../../../../redux/services/product/productApi';
import { openNotification } from '../../../../utilities/lib/openToaster';

const ProductInquiry = ({ setOpenInquiry }) => {
  const user = useSelector(useCurrentUser);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const { data, isFetching } = useGetAllProductVariantsQuery({
    params: { parent: 1, child: 1, keyword: inputValue },
  });

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

  const navigate = useNavigate();

  const handlePosSell = () => {
    const hasStock = selectedProduct?.product_qties?.some(
      (item) => item?.warehouse_id === user?.warehouse_id && item?.qty > 0
    );

    if (!hasStock) {
      openNotification('info', 'No stock available in this warehouse.');
      return;
    }

    setOpenInquiry(false);
    navigate('pos', {
      state: {
        selectedProduct,
      },
      replace: true,
    });
  };

  const handlePurchase = () => {
    setOpenInquiry(false);
    navigate('purchase', {
      state: {
        selectedProduct,
      },
      replace: true,
    });
  };

  const handleInventorySell = () => {
    const hasStock = selectedProduct?.product_qties?.some(
      (item) => item?.warehouse_id === user?.warehouse_id && item?.qty > 0
    );

    if (!hasStock) {
      openNotification('info', 'No stock available in this warehouse.');
      return;
    }

    setOpenInquiry(false);
    navigate('sales/sale', {
      state: {
        selectedProduct,
      },
      replace: true,
    });
  };
  const handleTransfer = () => {
    setOpenInquiry(false);
    navigate('transfer', {
      state: {
        selectedProduct,
      },
      replace: true,
    });
  };

  const handleStockRequest = () => {
    setOpenInquiry(false);

    navigate('inventory/stock-request', {
      state: {
        selectedProduct,
      },
      replace: true,
    });
  };

  const menuItems = [
    {
      key: '1',
      label: (
        <Button className="w-full" onClick={handlePosSell}>
          POS Sell
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button className="w-full" onClick={handlePurchase}>
          Purchase
        </Button>
      ),
    },
    {
      key: '3',
      label: (
        <Button className="w-full" onClick={handleInventorySell}>
          Inventory Sell
        </Button>
      ),
    },
    {
      key: '4',
      label: (
        <Button className="w-full" onClick={handleTransfer}>
          Tranfer
        </Button>
      ),
    },
    {
      key: '5',
      label: (
        <Button className="w-full" onClick={handleStockRequest}>
          Stock Request
        </Button>
      ),
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
