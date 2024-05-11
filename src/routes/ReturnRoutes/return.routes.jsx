import PurchaseReturn from "../../pages/Dashboard/Return/PurchaseReturn/PurchaseReturn";
import SaleReturn from "../../pages/Dashboard/Return/SaleReturn/SaleReturn";

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
