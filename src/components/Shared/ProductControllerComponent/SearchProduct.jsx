import { AutoComplete, Col, Form, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { fullColLayout } from '../../../layout/FormLayout';
import { useCurrentUser } from '../../../redux/services/auth/authSlice';
import { useGetAllProductVariantsQuery } from '../../../redux/services/product/productApi';
import { useGlobalParams } from '../../../utilities/hooks/useParams';
import { getWarehouseQuantity } from '../../../utilities/lib/getWarehouseQty';
import { openNotification } from '../../../utilities/lib/openToaster';

const ignorePaths = [
  'stock-request',
  'print-barcode',
  'products',
  'adjustment',
  'purchase',
  'quotation',
  'invoice',
];

export const SearchProduct = ({ setProducts, productId }) => {
  const [keyword, setKeyword] = useState(null);
  const [value, setValue] = useState(null);

  const form = Form.useFormInstance();
  const { pathname } = useLocation();

  const warehouseId = Form.useWatch('warehouse_id', form);
  const warehouseIdFrom = Form.useWatch('from_warehouse_id', form);

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== '') {
      setKeyword(value);
    } else {
      setKeyword(null);
    }
  }, 1000);

  const [searchParams] = useSearchParams();

  const fetchAll = searchParams.get('fetch-all');

  const isIgnore =
    ignorePaths.filter((item) => pathname.includes(item)).length === 0;

  const baseParams = {};

  if (!pathname.includes('/products/product')) {
    baseParams.need_qty = 1;
  }

  if (!keyword && fetchAll && !fetchAll === 'true') {
    baseParams.page = 1;
    baseParams.perPage = 20;
    baseParams.allData = 1;
  }

  if (isIgnore) {
    baseParams.parent = 1;
    baseParams.child = 1;
    // baseParams.need_qty = 1;
    // baseParams.need_price = 1;
  }

  const params = useGlobalParams({
    params: baseParams,
    keyword,
    isRelationalParams: !isIgnore,
  });

  if (productId) {
    params.product_id = productId;
  }

  const { data, isFetching } = useGetAllProductVariantsQuery({
    params,
  });

  useEffect(() => {
    if (fetchAll === 'true' && data && warehouseId) {
      const allProducts =
        data?.results?.productvariant?.map((product) => ({
          ...product,
          warehouse_id: warehouseId,
        })) ?? [];

      setProducts((prev) => {
        // Check if products with the current warehouse_id already exist
        const hasWarehouse = prev.some(
          (product) =>
            product.warehouse_id.toString() === warehouseId.toString()
        );

        // If warehouse_id is not found, add the products
        if (!hasWarehouse) {
          return [...prev, ...allProducts];
        }

        // If warehouse_id is found, return the previous state
        return prev;
      });

      // removeQueryParam(); // Uncomment if needed
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAll, data, warehouseId]);

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
        product: { ...product, warehouse_id: warehouseId },
      })) ?? []);

  const user = useSelector(useCurrentUser);

  useEffect(() => {
    if (keyword) {
      if (data.results.productvariant?.length === 1) {
        const option = data.results.productvariant?.[0];

        setProducts((prevProducts) => {
          const productExists = prevProducts.some((product) => {
            if (pathname.includes('/pos')) {
              return product?.id.toString() === option?.id?.toString();
            }

            const selectedWarehouse =
              warehouseIdFrom ?? warehouseId ?? user.warehouse_id;

            return (
              product?.id.toString() === option?.id?.toString() &&
              product?.warehouse_id?.toString() === selectedWarehouse.toString()
              // option?.product?.warehouse_id?.toString()
            );
          });

          if (!productExists) {
            return [...prevProducts, { ...option, warehouse_id: warehouseId }];
          }

          openNotification('warning', 'Product already exists in the list');
          return prevProducts;
        });

        setKeyword(null);
        setValue(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, data]);

  const onSelect = (_, option) => {
    if (!warehouseId && !warehouseIdFrom && isIgnore) {
      openNotification('warning', 'Please select warehouse');

      return;
    }

    const stock = getWarehouseQuantity(
      option?.product?.product_qties,
      warehouseId ?? warehouseIdFrom
    );

    if (
      !stock &&
      !pathname.includes('/purchase') &&
      !pathname.includes('/quotation') &&
      !pathname.includes('/invoice') &&
      !pathname.includes('/stock-request') &&
      !pathname.includes('/print-barcode') &&
      !pathname.includes('/adjustment') &&
      !pathname.includes('/stock-transfer') &&
      !pathname.includes('/transfer') &&
      !pathname.includes('/products/product')
    ) {
      openNotification('warning', 'Product is out of stock');
      setValue(null);
      return;
    }

    setProducts((prevProducts) => {
      const productExists = prevProducts.some((product) => {
        if (pathname.includes('/pos')) {
          return product?.id.toString() === option?.product?.id?.toString();
        }
        return (
          product?.id.toString() === option?.product?.id?.toString() &&
          product?.warehouse_id?.toString() ===
            option?.product?.warehouse_id?.toString()
        );
      });

      if (!productExists) {
        return [...prevProducts, option.product];
      }

      openNotification('warning', 'Product already exists in the list');
      return prevProducts;
    });

    setValue(null);
  };

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Col {...fullColLayout}>
      <AutoComplete
        options={options}
        className="mt-1 w-full"
        size="large"
        onSelect={!isFetching && onSelect}
        onSearch={debounce}
        value={value}
        onChange={onChange}
        placeholder="Search Product Varients"
        suffixIcon={<FaSearch />}
        allowClear={true}
      />
    </Col>
  );
};
