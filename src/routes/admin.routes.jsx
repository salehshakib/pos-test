//components
import Accounting from "../pages/Dashboard/Accounting/Accounting";
import AddOns from "../pages/Dashboard/AddOns/AddOns";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import Documents from "../pages/Dashboard/Documents/Documents";
import Expense from "../pages/Dashboard/Expense/Expense";
import Department from "../pages/Dashboard/Hrm/Department/Department";
import Employee from "../pages/Dashboard/Hrm/Employee/Employee";
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
    path: "product",
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
    path: "purchase",
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
    path: "sale",
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
    path: "return",
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
    icon: IoPeopleCircle,
    children: [
      {
        name: "Department",
        path: "department",
        icon: TbDashboard,
        element: <Department />,
      },
      {
        name: "Employee",
        path: "employee",
        icon: TbDashboard,
        element: <Employee />,
      },
      {
        name: "Payroll",
        path: "payroll",
        icon: TbDashboard,
        element: <Hrm />,
      },
      {
        name: "Holidays",
        path: "holidays",
        icon: TbDashboard,
        element: <Hrm />,
      },
    ],
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
    element: <Settings />,
  },
];
