import { BiCategoryAlt } from 'react-icons/bi';
import { FaBarcode } from 'react-icons/fa6';
import { MdAddShoppingCart, MdOutlineMergeType } from 'react-icons/md';
import { TbBrandAirtable } from 'react-icons/tb';

import Brand from '../../pages/Dashboard/Brand/Brand';
import Category from '../../pages/Dashboard/Category/Category';
import PrintBarcode from '../../pages/Dashboard/PrintBarcode/PrintBarcode';
import ProductList from '../../pages/Dashboard/ProductList/ProductList';
import { Variant } from '../../pages/Dashboard/Variant/Variant';

export const productPaths = [
  {
    name: 'Product',
    path: 'product',
    icon: MdAddShoppingCart,
    element: <ProductList />,
  },
  {
    name: 'Variant',
    path: 'variant',
    icon: MdOutlineMergeType,
    element: <Variant />,
  },
  {
    name: 'Brand',
    path: 'brand',
    icon: TbBrandAirtable,
    element: <Brand />,
  },
  {
    name: 'Category',
    path: 'category',
    icon: BiCategoryAlt,
    element: <Category />,
  },

  {
    name: 'Print Barcode',
    path: 'print-barcode',
    icon: FaBarcode,
    element: <PrintBarcode />,
  },
];
