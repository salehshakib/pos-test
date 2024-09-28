import { Row } from 'antd';
import { useState } from 'react';

import defaultUser from '../../../assets/data/defaultUserImage';
import ProductCreate from '../../../components/Product/ProductCreate';
import ProductTable from '../../../components/Product/ProductTable';
import {
  BarcodeFilter,
  BrandFilter,
  CategoryFilter,
  ProductTypeFilter,
  ProductUnitFilter,
  PurchaseUnitFilter,
  SaleUnitFilter,
  TaxFilter,
  WarehouseFilter,
} from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { PRODUCT } from '../../../utilities/apiEndpoints/inventory.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Img',
    dataIndex: 'img',
    key: 'img',
    // fixed: 'left',
    align: 'center',
    width: 70,
    render: (img) => (
      <div className="mx-auto h-8 w-8 overflow-hidden rounded-md">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{name}</span>
    ),
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    width: 150,
    align: 'center',
    render: (sku) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{sku}</span>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    render: (type) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{type}</span>
    ),
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    render: (brand) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {brand ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (category) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {category ?? 'N/A'}
      </span>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    render: (quantity) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {quantity ?? 0}
      </span>
    ),
  },

  {
    title: 'Buying Cost',
    dataIndex: 'cost',
    key: 'cost',
    align: 'right',
    render: (cost) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{cost}</span>
    ),
  },
  {
    title: 'Selling Price',
    dataIndex: 'price',
    key: 'price',
    align: 'right',
    render: (price) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {price}
      </span>
    ),
  },
  {
    title: 'Has Variant',
    dataIndex: 'hasVariant',
    key: 'hasVariant',
    align: 'center',
    width: 100,
    render: (hasVariant) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {hasVariant}
      </span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <ProductTypeFilter />
      <WarehouseFilter name="product_warehouse_ids" />
      <BarcodeFilter />
      <BrandFilter />
      <CategoryFilter />
      <ProductUnitFilter />
      <PurchaseUnitFilter />
      <SaleUnitFilter />
      <TaxFilter />
    </Row>
  );
};

const ProductList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Product"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      searchFilterContent={<SearchComponent />}
      api={PRODUCT}
    >
      <ProductCreate />

      <ProductTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default ProductList;
