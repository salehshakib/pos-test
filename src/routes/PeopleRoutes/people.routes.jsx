import { FaChalkboardUser } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GiBilledCap } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";
import { Biller } from "../../pages/Dashboard/Biller/Biller";
import Customer from "../../pages/Dashboard/Customer/Customer";
import Discount from "../../pages/Dashboard/Discount/Discount";
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
    element: <Discount />,
  },
  {
    name: "Biller",
    path: "biler",
    icon: GiBilledCap,
    element: <Biller />,
  },
];
