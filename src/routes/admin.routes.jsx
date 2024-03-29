//components
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import Product from "../pages/Dashboard/Product/Product";
import Purchase from "../pages/Dashboard/Purchase/Purchase";
import Sale from "../pages/Dashboard/Sale/Sale";
import Expense from "../pages/Dashboard/Expense/Expense";
import Quotation from "../pages/Dashboard/Quotations/Quotation";
import Transfer from "../pages/Dashboard/Transfer/Transfer";
import Return from "../pages/Dashboard/Return/Return";
import Accounting from "../pages/Dashboard/Accounting/Accounting";
import People from "../pages/Dashboard/People/People";
import Reports from "../pages/Dashboard/Reports/Reports";
import AddOns from "../pages/Dashboard/AddOns/AddOns";
import Settings from "../pages/Dashboard/Settings/Settings";
import Documents from "../pages/Dashboard/Documents/Documents";

//icons
import { TbDashboard } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GoCreditCard } from "react-icons/go";
import { FaCartShopping, FaMoneyBillWave } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import Hrm from "../pages/Dashboard/Hrm/Hrm";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: TbDashboard,
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
    icon: RiArrowGoBackFill,
    children: [
      {
        name: "Accounting",
        path: "accounting",
        icon: TbDashboard,
        element: <Accounting />,
      },
    ],
  },
  {
    name: "HRM",
    icon: RiArrowGoBackFill,
    children: [
      {
        name: "HRM",
        path: "hrm",
        icon: TbDashboard,
        element: <Hrm />,
      },
    ],
  },
  {
    name: "People",
    icon: RiArrowGoBackFill,
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
    icon: RiArrowGoBackFill,
    children: [
      {
        name: "Reports",
        path: "reports",
        icon: TbDashboard,
        element: <Reports />,
      },
    ],
  },
  {
    name: "AddOns",
    icon: RiArrowGoBackFill,
    children: [
      {
        name: "AddOns",
        path: "addons",
        icon: TbDashboard,
        element: <AddOns />,
      },
    ],
  },
  {
    name: "Settings",
    icon: RiArrowGoBackFill,
    children: [
      {
        name: "Settings",
        path: "settings",
        icon: TbDashboard,
        element: <Settings />,
      },
    ],
  },
  {
    name: "Documents",
    icon: RiArrowGoBackFill,
    children: [
      {
        name: "Documents",
        path: "documents",
        icon: TbDashboard,
        element: <Documents />,
      },
    ],
  },
];
