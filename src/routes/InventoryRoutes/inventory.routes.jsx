import { FaWarehouse } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import Brand from "../../pages/Dashboard/Inventory/Brand/Brand";
import Category from "../../pages/Dashboard/Inventory/Category/Category";
import Warehouse from "../../pages/Dashboard/Inventory/Warehouse/Warehouse";

export const inventoryPaths = [
  {
    name: "Category",
    path: "category",
    icon: MdCategory,
    element: <Category />,
  },
  {
    name: "Brand",
    path: "brand",
    icon: FaBagShopping,
    element: <Brand />,
  },
  {
    name: "Warehouse",
    path: "warehouse",
    icon: FaWarehouse,
    element: <Warehouse />,
  },
];
