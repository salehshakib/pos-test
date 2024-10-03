import { AutoComplete, Button, Descriptions, Spin } from 'antd';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { useGetAllProductVariantsQuery } from '../../../../redux/services/product/productApi';

const ProductInquiry = () => {
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

  return (
    <section className="p-10">
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
          <h3 className="text-2xl font-semibold mb-8 text-center text-gray-800">
            Selected Product
          </h3>

          <div className="px-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <Descriptions bordered column={1} className="text-base">
              <Descriptions.Item label="Name">
                {selectedProduct.name}
              </Descriptions.Item>
              <Descriptions.Item label="SKU">
                {selectedProduct.sku}
              </Descriptions.Item>
            </Descriptions>

            <div className="space-y-4">
              {selectedProduct.product_qties?.map((item) => (
                <Descriptions
                  bordered
                  key={item?.warehouse_id}
                  className="rounded-lg border-gray-300"
                >
                  <Descriptions.Item label="Warehouse" span={1}>
                    {item?.warehouses?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Quantity" span={1}>
                    {item?.qty}
                  </Descriptions.Item>
                </Descriptions>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <Button type="primary" className="px-6 py-2 text-lg">
              Sell
            </Button>
            <Button className="px-6 py-3 text-lg bg-gray-100 hover:bg-gray-200">
              Purchase
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductInquiry;
