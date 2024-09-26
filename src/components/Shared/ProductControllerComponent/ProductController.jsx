import { ProductTable } from './ProductTable';
import { SearchProduct } from './SearchProduct';

export const ProductController = ({
  products,
  setProducts,
  columns,
  dataSource,
  styleProps,
  tableStyle,
  productId,
}) => {
  return (
    <>
      <SearchProduct
        productId={productId}
        products={products}
        setProducts={setProducts}
      />
      <ProductTable
        columns={columns}
        dataSource={dataSource}
        styleProps={styleProps}
        tableStyle={tableStyle}
      />
    </>
  );
};
