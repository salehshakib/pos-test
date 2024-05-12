import { CiDiscount1 } from "react-icons/ci";
import { FaUserLock } from "react-icons/fa";
import { MdDisplaySettings } from "react-icons/md";
import Coupons from "../../pages/Dashboard/Coupons/Coupons";
import GiftCardList from "../../pages/Dashboard/GiftCard/GiftCardList";
import Discount from "../../pages/Dashboard/Settings/Discount/Discount";
import DiscountPlan from "../../pages/Dashboard/Settings/DiscountPlan/DiscountPlan";
import GeneralSettings from "../../pages/Dashboard/Settings/GeneralSettings/GeneralSettings";
import RolePermission from "../../pages/Dashboard/Settings/RolePermission/RolePermission";
import Types from "../../pages/Dashboard/Type/Types";

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

  // ui developing

  {
    name: "Gift Card",
    path: "gift-card",
    // icon: CiDiscount1,
    element: <GiftCardList />,
  },
  {
    name: "Coupons",
    path: "coupons",
    // icon: CiDiscount1,
    element: <Coupons />,
  },
  {
    name: "Types",
    path: "type",
    // icon: CiDiscount1,
    element: <Types />,
  },
];
