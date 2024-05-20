import { FaCashRegister, FaChalkboardUser } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import Cashier from "../../pages/Dashboard/Cashier/Cashier";
import Customer from "../../pages/Dashboard/Customer/Customer";
import { Supplier } from "../../pages/Dashboard/Supplier/Supplier";
import UserList from "../../pages/Dashboard/User/UserList";

export const peoplePaths = [
  {
    name: "User List",
    path: "user-list",
    icon: HiOutlineUsers,
    element: <UserList />,
  },
  {
    name: "Customer",
    path: "customer",
    icon: FiUsers,
    element: <Customer />,
  },
  {
    name: "Supplier",
    path: "supplier",
    icon: FaChalkboardUser,
    element: <Supplier />,
  },
  {
    name: "Cashier",
    path: "cashier",
    icon: FaCashRegister,
    element: <Cashier />,
  },
  // {
  //   name: "Biller",
  //   path: "biler",
  //   icon: GiBilledCap,
  //   element: <Biller />,
  // },
];
