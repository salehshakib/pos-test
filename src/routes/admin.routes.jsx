//components
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { FaUsersGear } from "react-icons/fa6";
import { IoDocumentTextOutline, IoPeopleCircle } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import {
  MdAccountBalance,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
  MdPeopleAlt,
} from "react-icons/md";
import { SlWallet } from "react-icons/sl";
import {
  TbDashboard,
  TbReport,
  TbTransferIn,
  TbTruckReturn,
} from "react-icons/tb";
import { TfiShoppingCart } from "react-icons/tfi";
import { VscDiffAdded } from "react-icons/vsc";
import Accounting from "../pages/Dashboard/Accounting/Accounting";
import AddOns from "../pages/Dashboard/AddOns/AddOns";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import Documents from "../pages/Dashboard/Documents/Documents";
import People from "../pages/Dashboard/People/People";
import Quotation from "../pages/Dashboard/Quotations/Quotation";
import Reports from "../pages/Dashboard/Reports/Reports";
import { expensePaths } from "./ExpenseRoutes/expense.routes";
import { hrmPaths } from "./HrmRoutes/hrm.routes";
import { peoplePaths } from "./PeopleRoutes/people.routes";
import { productPaths } from "./ProductRoutes/product.routes";
import { purchasePaths } from "./PurchaseRoutes/purchase.routes";
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
    icon: BsBoxSeam,
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
    icon: AiOutlineShoppingCart,
    children: purchasePaths,
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
    name: "Quotation",
    path: "quotation",
    icon: LuClipboardList,
    children: [
      {
        name: "Quotations",
        path: "quotations",
        icon: TbDashboard,
        element: <Quotation />,
      },
    ],
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
    icon: MdAccountBalance,
    children: [
      {
        name: "Sub Accounting",
        path: "sub-accounting",
        icon: TbDashboard,
        element: <Accounting />,
      },
    ],
  },
  {
    name: "HRM",
    path: "human-resources",
    icon: FaUsersGear,
    children: hrmPaths,
  },
  {
    name: "People",
    path: "people",
    icon: MdPeopleAlt,
    children: peoplePaths,
  },
  {
    name: "Reports",
    path: "reports",
    icon: TbReport,
    children: [
      {
        name: "Sub Reports",
        path: "sub-reports",
        icon: TbDashboard,
        element: <Reports />,
      },
    ],
  },
  {
    name: "AddOns",
    path: "addons",
    icon: VscDiffAdded,
    element: <AddOns />,
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
    name: "Settings",
    path: "settings",
    icon: MdOutlineSettings,
    children: settingPaths,
  },
];
