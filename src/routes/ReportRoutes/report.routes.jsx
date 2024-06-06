import { TbReportMoney } from "react-icons/tb";
import { ProductReport } from "../../pages/Dashboard/Reports/ProductReport";
import { SaleReport } from "../../pages/Dashboard/Reports/SaleReport";

export const reportPaths = [
  {
    name: "Product Report",
    path: "product-report",
    icon: TbReportMoney,
    element: <ProductReport />,
  },
  {
    name: "Sale Report",
    path: "sale-report",
    icon: TbReportMoney,
    element: <SaleReport />,
  },
];
