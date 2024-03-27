import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import CreateProduct from "../pages/Dashboard/Product/CreateProduct";
import Product from "../pages/Dashboard/Product/Product";
import CreatePurchase from "../pages/Dashboard/Purchase/CreatePurchase";
import Purchase from "../pages/Dashboard/Purchase/Purchase";

import { TbDashboard } from "react-icons/tb";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: TbDashboard,
    element: <AdminDashboard />,
  },
  {
    name: "Product",
    icon: TbDashboard,
    children: [
      {
        name: "Products",
        path: "products",
        icon: TbDashboard,
        element: <Product />,
      },
      {
        name: "Create Product",
        path: "create-product",
        icon: TbDashboard,
        element: <CreateProduct />,
      },
    ],
  },
  {
    name: "Purchase",
    icon: TbDashboard,
    children: [
      {
        name: "Purchases",
        path: "purchases",
        icon: TbDashboard,
        element: <Purchase />,
      },
      {
        name: "Create Purchase",
        path: "create-purchase",
        icon: TbDashboard,
        element: <CreatePurchase />,
      },
    ],
  },
];
