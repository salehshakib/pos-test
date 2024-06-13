import { AiOutlineStock } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
import { PiWarehouse } from "react-icons/pi";
import AdjustmentList from "../../pages/Dashboard/AdjustmentList/AdjustmentList";
import StockCount from "../../pages/Dashboard/StockCount/StockCount";
import Warehouse from "../../pages/Dashboard/Warehouse/Warehouse";

export const inventoryPaths = [
  {
    name: "Warehouse",
    path: "warehouse",
    icon: PiWarehouse,
    element: <Warehouse />,
  },
  {
    name: "Adjustment",
    path: "adjustment",
    icon: GoChecklist,
    element: <AdjustmentList />,
  },
  {
    name: "Stock Count",
    path: "stock-count",
    icon: AiOutlineStock,
    element: <StockCount />,
  },
];
