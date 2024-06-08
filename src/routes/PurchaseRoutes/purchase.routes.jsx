import { AiOutlineShoppingCart } from "react-icons/ai";
import Purchase from "../../pages/Dashboard/Purchase/Purchase";

export const purchasePaths = [
  {
    name: "Purchase List",
    path: "purchase-list",
    icon: AiOutlineShoppingCart,
    element: <Purchase />,
  },
];
