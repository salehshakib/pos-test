import { AiOutlineStock } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBarcode } from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import { TbShoppingCartExclamation } from "react-icons/tb";
import AdjustmentList from "../../pages/Dashboard/AdjustmentList/AdjustmentList";
import Category from "../../pages/Dashboard/Category/Category";
import PrintBarcode from "../../pages/Dashboard/PrintBarcode/PrintBarcode";
import ProductList from "../../pages/Dashboard/ProductList/ProductList";
import StockCount from "../../pages/Dashboard/StockCount/StockCount";

export const productPaths = [
  {
    name: "Category",
    path: "category",
    icon: BiCategoryAlt,
    element: <Category />,
  },
  {
    name: "Product List",
    path: "product-list",
    icon: MdAddShoppingCart,
    element: <ProductList />,
  },
  {
    name: "Adjustment",
    path: "adjustment-list",
    icon: TbShoppingCartExclamation,
    element: <AdjustmentList />,
  },
  {
    name: "Stock Count",
    path: "stock-count",
    icon: AiOutlineStock,
    element: <StockCount />,
  },
  {
    name: "Print Barcode",
    path: "print-barcode",
    icon: FaBarcode,
    element: <PrintBarcode />,
  },
];
