//components
import { BsBoxSeam } from "react-icons/bs";
import { FaCartShopping, FaMoneyBillWave, FaUsersGear } from "react-icons/fa6";
import { GoCreditCard } from "react-icons/go";
import { IoDocumentTextOutline, IoPeopleCircle } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import {
  MdAccountBalance,
  MdInventory2,
  MdOutlineSettings,
  MdPeopleAlt,
  MdSpaceDashboard,
} from "react-icons/md";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { TbDashboard, TbReport } from "react-icons/tb";
import { VscDiffAdded } from "react-icons/vsc";
import Accounting from "../pages/Dashboard/Accounting/Accounting";
import AddOns from "../pages/Dashboard/AddOns/AddOns";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import Documents from "../pages/Dashboard/Documents/Documents";
import Expense from "../pages/Dashboard/Expense/Expense";
import People from "../pages/Dashboard/People/People";
import Quotation from "../pages/Dashboard/Quotations/Quotation";
import Reports from "../pages/Dashboard/Reports/Reports";
import { hrmPaths } from "./HrmRoutes/hrm.routes";
import { inventoryPaths } from "./InventoryRoutes/inventory.routes";
import { productPaths } from "./ProductRoutes/product.routes";
import { purchasePaths } from "./PurchaseRoutes/purchase.routes";
import { salePaths } from "./SaleRoutes/sale.routes";
import { settingPaths } from "./SettingRoutes/settings.routes";
import { transferPaths } from "./TransaferRoutes/transfer.routes";
import { returnPaths } from "./ReturnRoutes/return.routes";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: MdSpaceDashboard,
    element: <AdminDashboard />,
  },
  {
    name: "Product",
    path: "product",
    icon: BsBoxSeam,
    children: productPaths,
  },
  {
    name: "Inventory",
    path: "inventory",
    icon: MdInventory2,
    children: inventoryPaths,
  },
  {
    name: "Purchase",
    path: "purchase",
    icon: GoCreditCard,
    children: purchasePaths,
  },
  {
    name: "Sale",
    path: "sale",
    icon: FaCartShopping,
    children: salePaths,
  },
  {
    name: "Expense",
    path: "expense",
    icon: FaMoneyBillWave,
    children: [
      {
        name: "Expenses",
        path: "expenses",
        icon: TbDashboard,
        element: <Expense />,
      },
    ],
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
    icon: RiArrowGoForwardFill,
    children: transferPaths,
  },
  {
    name: "Return",
    path: "return",
    icon: RiArrowGoBackFill,
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
    children: [
      {
        name: "Peoples",
        path: "peoples",
        icon: TbDashboard,
        element: <People />,
      },
    ],
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
