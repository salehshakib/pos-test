import { AiOutlineShoppingCart } from "react-icons/ai";
import AdminDashboard from "../../pages/Dashboard/Admin/AdminDashboard";

export const purchasePaths = [
  {
    name: "Purchase List",
    path: "purchase-list",
    icon: AiOutlineShoppingCart,
    element: <AdminDashboard />,
  },
];
