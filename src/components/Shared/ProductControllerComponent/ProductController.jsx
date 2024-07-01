import { ProductTable } from "./ProductTable";
import { SearchProduct } from "./SearchProduct";

export const ProductController = ({
  products,
  setProducts,
  columns,
  dataSource,
  styleProps,
  qty,
}) => {
  return (
    <>
      <SearchProduct products={products} setProducts={setProducts} />
      <ProductTable
        columns={columns}
        dataSource={dataSource}
        styleProps={styleProps}
        qty={qty}
      />
    </>
  );
};
