//components
import Accounting from "../pages/Dashboard/Accounting/Accounting";
import AddOns from "../pages/Dashboard/AddOns/AddOns";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import Documents from "../pages/Dashboard/Documents/Documents";
import Expense from "../pages/Dashboard/Expense/Expense";
import Hrm from "../pages/Dashboard/Hrm/Hrm";
import People from "../pages/Dashboard/People/People";
import Product from "../pages/Dashboard/Product/Product";
import Purchase from "../pages/Dashboard/Purchase/Purchase";
import Quotation from "../pages/Dashboard/Quotations/Quotation";
import Reports from "../pages/Dashboard/Reports/Reports";
import Return from "../pages/Dashboard/Return/Return";
import Sale from "../pages/Dashboard/Sale/Sale";
import Settings from "../pages/Dashboard/Settings/Settings";
import Transfer from "../pages/Dashboard/Transfer/Transfer";

//icons
import { AiOutlineDashboard } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { FaCartShopping, FaMoneyBillWave } from "react-icons/fa6";
import { GoCreditCard } from "react-icons/go";
import { IoDocumentTextOutline, IoPeopleCircle } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import {
  MdAccountBalance,
  MdOutlineSettings,
  MdPeopleAlt,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { TbDashboard, TbReport } from "react-icons/tb";
import { VscDiffAdded } from "react-icons/vsc";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: AiOutlineDashboard,
    element: <AdminDashboard />,
  },
  {
    name: "Product",
    icon: BsBoxSeam,
    children: [
      {
        name: "Products",
        path: "products",
        icon: MdProductionQuantityLimits,
        element: <Product />,
      },
    ],
  },
  {
    name: "Purchase",
    icon: GoCreditCard,
    children: [
      {
        name: "Purchases",
        path: "purchases",
        icon: TbDashboard,
        element: <Purchase />,
      },
    ],
  },
  {
    name: "Sale",
    icon: FaCartShopping,
    children: [
      {
        name: "Sales",
        path: "sales",
        icon: TbDashboard,
        element: <Sale />,
      },
    ],
  },
  {
    name: "Expense",
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
    icon: RiArrowGoForwardFill,
    children: [
      {
        name: "Transfers",
        path: "transfers",
        icon: TbDashboard,
        element: <Transfer />,
      },
    ],
  },
  {
    name: "Return",
    icon: RiArrowGoBackFill,
    children: [
      {
        name: "Returns",
        path: "returns",
        icon: TbDashboard,
        element: <Return />,
      },
    ],
  },
  {
    name: "Accounting",
    icon: MdAccountBalance,
    children: [
      {
        name: "Sub Accounting",
        path: "accounting",
        icon: TbDashboard,
        element: <Accounting />,
      },
    ],
  },
  {
    name: "HRM",
    icon: IoPeopleCircle,
    children: [
      {
        name: "Sub HRM",
        path: "hrm",
        icon: TbDashboard,
        element: <Hrm />,
      },
    ],
  },
  {
    name: "People",
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
    icon: TbReport,
    children: [
      {
        name: "Sub Reports",
        path: "reports",
        icon: TbDashboard,
        element: <Reports />,
      },
    ],
  },
  {
    name: "AddOns",
    icon: VscDiffAdded,
    children: [
      {
        name: "Sub AddOns",
        path: "addons",
        icon: TbDashboard,
        element: <AddOns />,
      },
    ],
  },
  {
    name: "Roles",
    icon: IoPeopleCircle,
    children: [
      {
        name: "Role",
        path: "role",
        icon: TbDashboard,
        element: <Hrm />,
      },
    ],
  },
  {
    name: "Settings",
    icon: MdOutlineSettings,
    children: [
      {
        name: "Sub Settings",
        path: "settings",
        icon: TbDashboard,
        element: <Settings />,
      },
    ],
  },
  {
    name: "Documents",
    icon: IoDocumentTextOutline,
    children: [
      {
        name: "Sub Documents",
        path: "documents",
        icon: TbDashboard,
        element: <Documents />,
      },
    ],
  },
];
