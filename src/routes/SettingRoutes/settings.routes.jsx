import { MdDisplaySettings } from "react-icons/md";
import GeneralSettings from "../../pages/Dashboard/Settings/GeneralSettings/GeneralSettings";
import { CiDiscount1 } from "react-icons/ci";
import Discount from "../../pages/Dashboard/Settings/Discount/Discount";
import DiscountPlan from "../../pages/Dashboard/Settings/DiscountPlan/DiscountPlan";
import { FaUserLock } from "react-icons/fa";
import RolePermission from "../../pages/Dashboard/Settings/RolePermission/RolePermission";

export const settingPaths = [
  {
    name: "General Settings",
    path: "general-settings",
    icon: MdDisplaySettings,
    element: <GeneralSettings />,
  },
  {
    name: "Role Permission",
    path: "role-permission",
    icon: FaUserLock,
    element: <RolePermission />,
  },
  {
    name: "Discount",
    path: "discount",
    icon: CiDiscount1,
    element: <Discount />,
  },
  {
    name: "Discount Plan",
    path: "discount-plan",
    icon: CiDiscount1,
    element: <DiscountPlan />,
  },
];
