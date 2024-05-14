import { CiDiscount1 } from "react-icons/ci";
import { FaUserLock, FaWarehouse } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { LuClipboardType } from "react-icons/lu";
import { MdCategory, MdDisplaySettings } from "react-icons/md";
import { SiUnitedairlines } from "react-icons/si";
import { TbReceiptTax } from "react-icons/tb";
import Brand from "../../pages/Dashboard/Brand/Brand";
import Category from "../../pages/Dashboard/Category/Category";
import Coupons from "../../pages/Dashboard/Coupons/Coupons";
import CurrencyList from "../../pages/Dashboard/Currency/CurrencyList";
import Discount from "../../pages/Dashboard/Discount/Discount";
import DiscountPlan from "../../pages/Dashboard/DiscountPlan/DiscountPlan";
import GeneralSettings from "../../pages/Dashboard/GeneralSettings/GeneralSettings";
import GiftCardList from "../../pages/Dashboard/GiftCard/GiftCardList";
import RolePermission from "../../pages/Dashboard/RolePermission/RolePermission";
import TaxList from "../../pages/Dashboard/Tax/TaxList";
import Types from "../../pages/Dashboard/Type/Types";
import UnitList from "../../pages/Dashboard/Unit/UnitList";
import Warehouse from "../../pages/Dashboard/Warehouse/Warehouse";

export const settingPaths = [
  {
    name: "General Settings",
    path: "general-settings",
    icon: MdDisplaySettings,
    element: <GeneralSettings />,
  },
  {
    name: "Types",
    path: "type",
    icon: LuClipboardType,
    element: <Types />,
  },
  {
    name: "Tax",
    path: "tax",
    icon: TbReceiptTax,
    element: <TaxList />,
  },

  //! ui done

  {
    name: "Role Permission",
    path: "role-permission",
    icon: FaUserLock,
    element: <RolePermission />,
  },

  {
    name: "Discount Plan",
    path: "discount-plan",
    icon: CiDiscount1,
    element: <DiscountPlan />,
  },

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
    name: "Currency",
    path: "currency",
    // icon: CiDiscount1,
    element: <CurrencyList />,
  },

  {
    name: "Category",
    path: "category",
    icon: MdCategory,
    element: <Category />,
  },
  {
    name: "Brand",
    path: "brand",
    icon: FaBagShopping,
    element: <Brand />,
  },
  {
    name: "Warehouse",
    path: "warehouse",
    icon: FaWarehouse,
    element: <Warehouse />,
  },
  {
    name: "Unit",
    path: "unit",
    icon: SiUnitedairlines,
    element: <UnitList />,
  },

  {
    name: "Discount",
    path: "discount",
    icon: CiDiscount1,
    element: <Discount />,
  },
];
