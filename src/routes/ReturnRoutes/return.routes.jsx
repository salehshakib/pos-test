import PurchaseReturn from "../../pages/Dashboard/Return/Purchase/PurchaseReturn";
import SaleReturn from "../../pages/Dashboard/Return/Sale/SaleReturn";

export const returnPaths = [
  {
    name: "Purchase Return",
    path: "purchase",
    // icon: TbDashboard,
    element: <PurchaseReturn />,
  },
  {
    name: "Sale Return",
    path: "sale",
    // icon: TbDashboard,
    element: <SaleReturn />,
  },
];
