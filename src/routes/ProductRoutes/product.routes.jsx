import { AiOutlineStock } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { FaBarcode } from "react-icons/fa6";
import { HiAdjustments } from "react-icons/hi";
import AdjustmentList from "../../pages/Dashboard/Product/AdjustmentList/AdjustmentList";
import PrintBarcode from "../../pages/Dashboard/Product/PrintBarcode/PrintBarcode";
import ProductList from "../../pages/Dashboard/Product/ProductList/ProductList";
import StockCount from "../../pages/Dashboard/Product/StockCount/StockCount";

export const productPaths = [
  {
    name: "Product List",
    path: "product-list",
    icon: FaShoppingCart,
    element: <ProductList />,
  },
  {
    name: "Print Barcode",
    path: "print-barcode",
    icon: FaBarcode,
    element: <PrintBarcode />,
  },
  {
    name: "Adjustment List",
    path: "adjustment-list",
    icon: HiAdjustments,
    element: <AdjustmentList />,
  },
  {
    name: "Stock Count",
    path: "stock-count",
    icon: AiOutlineStock,
    element: <StockCount />,
  },
];
