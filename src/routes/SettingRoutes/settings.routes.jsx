import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { BsCurrencyPound } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";
import { LuClipboardType } from "react-icons/lu";
import { MdDisplaySettings } from "react-icons/md";
import { PiWarehouse } from "react-icons/pi";
import { RiCoupon2Line, RiVerifiedBadgeLine } from "react-icons/ri";
import { TbBrandAirtable, TbReceiptTax } from "react-icons/tb";
import Brand from "../../pages/Dashboard/Brand/Brand";
import CurrencyList from "../../pages/Dashboard/Currency/CurrencyList";
import Discount from "../../pages/Dashboard/Discount/Discount";
import DiscountPlan from "../../pages/Dashboard/DiscountPlan/DiscountPlan";
import GeneralSettings from "../../pages/Dashboard/GeneralSettings/GeneralSettings";
import RolePermission from "../../pages/Dashboard/RolePermission/RolePermission";
import TaxList from "../../pages/Dashboard/Tax/TaxList";
import Types from "../../pages/Dashboard/Type/Types";
import UnitList from "../../pages/Dashboard/Unit/UnitList";
import Warehouse from "../../pages/Dashboard/Warehouse/Warehouse";

export const settingPaths = [
  {
    name: "Role Permission",
    path: "role-permission",
    icon: RiVerifiedBadgeLine,
    element: <RolePermission />,
  },
  {
    name: "Discount Plan",
    path: "discount-plan",
    icon: RiCoupon2Line,
    element: <DiscountPlan />,
  },
  {
    name: "Discount",
    path: "discount",
    icon: CiDiscount1,
    element: <Discount />,
  },
  {
    name: "Warehouse",
    path: "warehouse",
    icon: PiWarehouse,
    element: <Warehouse />,
  },
  {
    name: "Brand",
    path: "brand",
    icon: TbBrandAirtable,
    element: <Brand />,
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
    name: "General Settings",
    path: "general-settings",
    icon: MdDisplaySettings,
    element: <GeneralSettings />,
  },
];
