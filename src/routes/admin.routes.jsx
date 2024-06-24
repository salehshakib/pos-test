//components
import { FiShoppingBag } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import {
  IoCardOutline,
  IoDocumentTextOutline,
  IoPeopleCircle,
} from "react-icons/io5";
import { LuArchive } from "react-icons/lu";
import {
  MdOutlineInventory2,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
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
import Purchase from "../pages/Dashboard/Purchase/Purchase";
import { Roles } from "../pages/Dashboard/Roles/Roles";
import TransferList from "../pages/Dashboard/Transfer/TransferList";
import { expensePaths } from "./ExpenseRoutes/expense.routes";
import { generatorPaths } from "./Generator/generator.routes";
import { hrmPaths } from "./HrmRoutes/hrm.routes";
import { inventoryPaths } from "./InventoryRoutes/inventory.routes";
import { peoplePaths } from "./PeopleRoutes/people.routes";
import { productPaths } from "./ProductRoutes/product.routes";
import { reportPaths } from "./ReportRoutes/report.routes";
import { returnPaths } from "./ReturnRoutes/return.routes";
import { salePaths } from "./SaleRoutes/sale.routes";
import { settingPaths } from "./SettingRoutes/settings.routes";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: MdOutlineSpaceDashboard,
    element: <AdminDashboard />,
  },
  {
    name: "Products",
    path: "products",
    icon: LuArchive,
    children: productPaths,
  },
  {
    name: "Inventory",
    path: "inventory",
    icon: MdOutlineInventory2,
    children: inventoryPaths,
  },
  {
    name: "Purchase",
    path: "purchase",
    icon: FiShoppingBag,
    element: <Purchase />,
    // children: purchasePaths,
  },
  {
    name: "Sales",
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
    element: <TransferList />,
    // children: transferPaths,
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
    children: reportPaths,
  },
  {
    name: "Roles",
    path: "roles",
    icon: IoPeopleCircle,
    element: <Roles />,
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
