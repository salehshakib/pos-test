import { BiCategoryAlt } from 'react-icons/bi';
import { FaBarcode } from 'react-icons/fa6';
import {
  MdAddShoppingCart,
  MdOutlineAcUnit,
  MdOutlineMergeType,
} from 'react-icons/md';
import { TbBrandAirtable } from 'react-icons/tb';

import AttributeOption from '../../pages/Dashboard/AttributeOption/AttributeOption';
import Brand from '../../pages/Dashboard/Brand/Brand';
import Category from '../../pages/Dashboard/Category/Category';
import PrintBarcode from '../../pages/Dashboard/PrintBarcode/PrintBarcode';
import ProductList from '../../pages/Dashboard/ProductList/ProductList';
import { Variant } from '../../pages/Dashboard/Variant/Variant';

export const productPaths = [
  {
    name: 'Attribute',
    path: 'attribute',
    icon: MdOutlineMergeType,
    element: <Variant />,
  },
  {
    name: 'Attribute Option',
    path: 'attribute-option',
    icon: MdOutlineAcUnit,
    element: <AttributeOption />,
  },
  {
    name: 'Product',
    path: 'product',
    icon: MdAddShoppingCart,
    element: <ProductList />,
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
