import { TbReportMoney } from "react-icons/tb";
import { ProductReport } from "../../pages/Dashboard/Reports/ProductReport";
import { PurchaseCalender } from "../../pages/Dashboard/Reports/PurchaseCalender";
import { PurchaseReport } from "../../pages/Dashboard/Reports/PurchaseReport";
import { SaleCalender } from "../../pages/Dashboard/Reports/SaleCalender";
import { SaleReport } from "../../pages/Dashboard/Reports/SaleReport";
import { Summary } from "../../pages/Dashboard/Reports/Summary";
import { WarehouseReport } from "../../pages/Dashboard/Reports/WarehouseReport";

export const reportPaths = [
  {
    name: "Summary",
    path: "summary",
    icon: TbReportMoney,
    element: <Summary />,
  },
  {
    name: "Product Report",
    path: "product",
    icon: TbReportMoney,
    element: <ProductReport />,
  },
  {
    name: "Purchase Report",
    path: "purchase",
    icon: TbReportMoney,
    element: <PurchaseReport />,
  },
  {
    name: "Purchase Calender",
    path: "purchase-calender",
    icon: TbReportMoney,
    element: <PurchaseCalender />,
  },

  {
    name: "Sale Report",
    path: "sale",
    icon: TbReportMoney,
    element: <SaleReport />,
  },
  {
    name: "Sale Calender",
    path: "sale-calender",
    icon: TbReportMoney,
    element: <SaleCalender />,
  },
  {
    name: "Warehouse Report",
    path: "warehouse",
    icon: TbReportMoney,
    element: <WarehouseReport />,
  },
  {
    name: "Supplier Report",
    path: "supplier",
    icon: TbReportMoney,
    element: <SaleReport />,
  },
];
