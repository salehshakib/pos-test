//components
import { FiShoppingBag } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import {
  IoCardOutline,
  IoDocumentTextOutline,
  IoPeopleCircle,
} from "react-icons/io5";
import { LuArchive } from "react-icons/lu";
import { MdOutlineSettings, MdOutlineSpaceDashboard } from "react-icons/md";
import { SlWallet } from "react-icons/sl";
import {
  TbFilePercent,
  TbReport,
  TbTransferIn,
  TbTruckReturn,
  TbUsersGroup,
} from "react-icons/tb";
import { TfiShoppingCart } from "react-icons/tfi";
import { VscDiffAdded } from "react-icons/vsc";
import AddOns from "../pages/Dashboard/AddOns/AddOns";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import Documents from "../pages/Dashboard/Documents/Documents";
import People from "../pages/Dashboard/People/People";
import { expensePaths } from "./ExpenseRoutes/expense.routes";
import { generatorPaths } from "./Generator/generator.routes";
import { hrmPaths } from "./HrmRoutes/hrm.routes";
import { peoplePaths } from "./PeopleRoutes/people.routes";
import { productPaths } from "./ProductRoutes/product.routes";
import { returnPaths } from "./ReturnRoutes/return.routes";
import { salePaths } from "./SaleRoutes/sale.routes";
import { settingPaths } from "./SettingRoutes/settings.routes";
import { transferPaths } from "./TransaferRoutes/transfer.routes";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: MdOutlineSpaceDashboard,
    element: <AdminDashboard />,
  },
  {
    name: "Product",
    path: "product",
    icon: LuArchive,
    children: productPaths,
  },
  // {
  //   name: "Inventory",
  //   path: "inventory",
  //   icon: MdInventory2,
  //   children: inventoryPaths,
  // },
  {
    name: "Purchase",
    path: "purchase",
    icon: FiShoppingBag,
    // children: purchasePaths,
  },
  {
    name: "Sale",
    path: "sale",
    icon: TfiShoppingCart,
    children: salePaths,
  },
  {
    name: "Expense",
    path: "expense",
    icon: SlWallet,
    children: expensePaths,
  },
  {
    name: "Generator",
    path: "generator",
    icon: TbFilePercent,
    children: generatorPaths,
  },
  {
    name: "Transfer",
    path: "transfer",
    icon: TbTransferIn,
    children: transferPaths,
  },
  {
    name: "Return",
    path: "return",
    icon: TbTruckReturn,
    children: returnPaths,
  },
  {
    name: "Accounting",
    path: "accounting",
    icon: IoCardOutline,
    // children: [
    //   {
    //     name: "Sub Accounting",
    //     path: "sub-accounting",
    //     icon: TbDashboard,
    //     element: <Accounting />,
    //   },
    // ],
  },
  {
    name: "HRM",
    path: "human-resources",
    icon: TbUsersGroup,
    children: hrmPaths,
  },
  {
    name: "People",
    path: "people",
    icon: GoPeople,
    children: peoplePaths,
  },
  {
    name: "Reports",
    path: "reports",
    icon: TbReport,
    // children: [
    //   {
    //     name: "Sub Reports",
    //     path: "sub-reports",
    //     icon: TbDashboard,
    //     element: <Reports />,
    //   },
    // ],
  },
  {
    name: "Roles",
    path: "roles",
    icon: IoPeopleCircle,
    element: <People />,
  },
  {
    name: "Documents",
    path: "documents",
    icon: IoDocumentTextOutline,
    element: <Documents />,
  },

  {
    name: "AddOns",
    path: "addons",
    icon: VscDiffAdded,
    element: <AddOns />,
  },
  {
    name: "Settings",
    path: "settings",
    icon: MdOutlineSettings,
    children: settingPaths,
  },
];
