import { TbReportMoney } from "react-icons/tb";
import { ProductReport } from "../../pages/Dashboard/Reports/ProductReport";
import { PurchaseCalender } from "../../pages/Dashboard/Reports/PurchaseCalender";
import { PurchaseReport } from "../../pages/Dashboard/Reports/PurchaseReport";
import { SaleCalender } from "../../pages/Dashboard/Reports/SaleCalender";
import { SaleReport } from "../../pages/Dashboard/Reports/SaleReport";

export const reportPaths = [
  {
    name: "Product Report",
    path: "product-report",
    icon: TbReportMoney,
    element: <ProductReport />,
  },
  {
    name: "Purchase Calender",
    path: "purchase-calender",
    icon: TbReportMoney,
    element: <PurchaseCalender />,
  },
  {
    name: "Purchase Report",
    path: "purchase-report",
    icon: TbReportMoney,
    element: <PurchaseReport />,
  },
  {
    name: "Sale Calender",
    path: "sale-calender",
    icon: TbReportMoney,
    element: <SaleCalender />,
  },
  {
    name: "Sale Report",
    path: "sale-report",
    icon: TbReportMoney,
    element: <SaleReport />,
  },
];
