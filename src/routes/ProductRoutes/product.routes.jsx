import { FaWarehouse } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import AdjustmentList from "../../pages/Dashboard/Product/AdjustmentList/AdjustmentList";
import PrintBarcode from "../../pages/Dashboard/Product/PrintBarcode/PrintBarcode";
import ProductList from "../../pages/Dashboard/Product/ProductList/ProductList";
import StockCount from "../../pages/Dashboard/Product/StockCount/StockCount";

export const productPaths = [
  {
    name: "Product List",
    path: "product-list",
    icon: MdCategory,
    element: <ProductList />,
  },
  {
    name: "Print Barcode",
    path: "print-barcode",
    icon: FaBagShopping,
    element: <PrintBarcode />,
  },
  {
    name: "Adjustment List",
    path: "adjustment-list",
    icon: FaWarehouse,
    element: <AdjustmentList />,
  },
  {
    name: "Stock Count",
    path: "stock-count",
    icon: FaWarehouse,
    element: <StockCount />,
  },
];
