import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { BsCurrencyPound } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuClipboardType } from "react-icons/lu";
import { MdOutlineSettingsApplications, MdTimeToLeave } from "react-icons/md";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { TbReceiptTax } from "react-icons/tb";
import CurrencyList from "../../pages/Dashboard/Currency/CurrencyList";
import CustomerGroup from "../../pages/Dashboard/CustomerGroup/CustomerGroup";
import GeneralSettings from "../../pages/Dashboard/GeneralSettings/GeneralSettings";
import RolePermission from "../../pages/Dashboard/RolePermission/RolePermission";
import { LeaveType } from "../../pages/Dashboard/Settings/LeaveType/LeaveType";
import TaxList from "../../pages/Dashboard/Tax/TaxList";
import Types from "../../pages/Dashboard/Type/Types";
import UnitList from "../../pages/Dashboard/Unit/UnitList";

export const settingPaths = [
  {
    name: "Role Permission",
    path: "role-permission",
    icon: RiVerifiedBadgeLine,
    element: <RolePermission />,
  },
  // {
  //   name: "Discount Plan",
  //   path: "discount-plan",
  //   icon: LuClipboardList,
  //   element: <DiscountPlan />,
  // },
  // {
  //   name: "Discount",
  //   path: "discount",
  //   icon: CiDiscount1,
  //   element: <Discount />,
  // },
  {
    name: "Customer Group",
    path: "customer-group",
    icon: FaPeopleGroup,
    element: <CustomerGroup />,
  },
  {
    name: "Types",
    path: "type",
    icon: LuClipboardType,
    element: <Types />,
  },
  {
    name: "Unit",
    path: "unit",
    icon: AiOutlineDeploymentUnit,
    element: <UnitList />,
  },
  {
    name: "Currency",
    path: "currency",
    icon: BsCurrencyPound,
    element: <CurrencyList />,
  },
  {
    name: "Tax",
    path: "tax",
    icon: TbReceiptTax,
    element: <TaxList />,
  },
  {
    name: "Leave Type",
    path: "leave-type",
    icon: MdTimeToLeave,
    element: <LeaveType />,
  },
  {
    name: "General Settings",
    path: "general-settings",
    icon: MdOutlineSettingsApplications,
    element: <GeneralSettings />,
  },
];
