//components
import { BsBoxSeam } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";
import { FaUserLock, FaWarehouse } from "react-icons/fa";
import {
  FaBagShopping,
  FaBuilding,
  FaCartShopping,
  FaMoneyBillWave,
  FaUsers,
  FaUsersGear,
} from "react-icons/fa6";
import { GoCreditCard } from "react-icons/go";
import { IoDocumentTextOutline, IoPeopleCircle } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import {
  MdAccountBalance,
  MdCategory,
  MdDisplaySettings,
  MdInventory2,
  MdOutlineSettings,
  MdPayment,
  MdPeopleAlt,
  MdSpaceDashboard,
  MdTimeToLeave,
} from "react-icons/md";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { TbDashboard, TbReport } from "react-icons/tb";
import { VscDiffAdded } from "react-icons/vsc";
import Accounting from "../pages/Dashboard/Accounting/Accounting";
import AddOns from "../pages/Dashboard/AddOns/AddOns";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import Documents from "../pages/Dashboard/Documents/Documents";
import Expense from "../pages/Dashboard/Expense/Expense";
import Department from "../pages/Dashboard/Hrm/Department/Department";
import Employee from "../pages/Dashboard/Hrm/Employee/Employee";
import Hrm from "../pages/Dashboard/Hrm/Hrm";
import Brand from "../pages/Dashboard/Inventory/Brand/Brand";
import Category from "../pages/Dashboard/Inventory/Category/Category";
import Warehouse from "../pages/Dashboard/Inventory/Warehouse/Warehouse";
import People from "../pages/Dashboard/People/People";
import Purchase from "../pages/Dashboard/Purchase/Purchase";
import Quotation from "../pages/Dashboard/Quotations/Quotation";
import Reports from "../pages/Dashboard/Reports/Reports";
import Return from "../pages/Dashboard/Return/Return";
import Sale from "../pages/Dashboard/Sale/Sale";
import Discount from "../pages/Dashboard/Settings/Discount/Discount";
import DiscountPlan from "../pages/Dashboard/Settings/DiscountPlan/DiscountPlan";
import GeneralSettings from "../pages/Dashboard/Settings/GeneralSettings/GeneralSettings";
import Transfer from "../pages/Dashboard/Transfer/Transfer";
import RolePermission from "../pages/Dashboard/Settings/RolePermission/RolePermission";

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
    element: <AdminDashboard />,
  },
  {
    name: "Inventory",
    path: "inventory",
    icon: MdInventory2,
    children: [
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
    icon: FaUsersGear,
    children: [
      {
        name: "Department",
        path: "department",
        icon: FaBuilding,
        element: <Department />,
      },
      {
        name: "Employee",
        path: "employee",
        icon: FaUsers,
        element: <Employee />,
      },
      {
        name: "Payroll",
        path: "payroll",
        icon: MdPayment,
        element: <Hrm />,
      },
      {
        name: "Holidays",
        path: "holidays",
        icon: MdTimeToLeave,
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
    children: [
      {
        name: "General Settings",
        path: "general-settings",
        icon: MdDisplaySettings,
        element: <GeneralSettings />,
      },
      {
        name: "Discount",
        path: "discount",
        icon: CiDiscount1,
        element: <Discount />,
      },
      {
        name: "Discount Plan",
        path: "discount-plan",
        icon: CiDiscount1,
        element: <DiscountPlan />,
      },
      {
        name: "Role Permission",
        path: "role-permission",
        icon: FaUserLock,
        element: <RolePermission />,
      },
    ],
  },
];
