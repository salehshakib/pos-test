//components
import { CiBoxes } from 'react-icons/ci';
import { FiShoppingBag } from 'react-icons/fi';
import { GoPeople } from 'react-icons/go';
import { LuDatabaseBackup } from 'react-icons/lu';
import {
  MdAccountBalance,
  MdOutlineInventory2,
  MdOutlineMailLock,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
  MdSms,
} from 'react-icons/md';
import { PiBroomFill } from 'react-icons/pi';
import { SlWallet } from 'react-icons/sl';
import {
  TbFilePercent,
  TbReport,
  TbTruckReturn,
  TbUsersGroup,
} from 'react-icons/tb';
import { TfiShoppingCart } from 'react-icons/tfi';

import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard';
import Purchase from '../pages/Dashboard/Purchase/Purchase';
import { accountPaths } from './accountPath/account.routes';
import { emailPaths } from './EmailManager/email.routes';
import { expensePaths } from './ExpenseRoutes/expense.routes';
import { generatorPaths } from './Generator/generator.routes';
import { hrmPaths } from './HrmRoutes/hrm.routes';
import { inventoryPaths } from './InventoryRoutes/inventory.routes';
import { peoplePaths } from './PeopleRoutes/people.routes';
import { productPaths } from './ProductRoutes/product.routes';
import { reportPaths } from './ReportRoutes/report.routes';
import { returnPaths } from './ReturnRoutes/return.routes';
import { salePaths } from './SaleRoutes/sale.routes';
import { settingPaths } from './SettingRoutes/settings.routes';
import { smsPaths } from './SmsManager/Sms.routes';

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: MdOutlineSpaceDashboard,
    element: <AdminDashboard />,
  },
  {
    name: 'Products',
    path: 'products',
    icon: CiBoxes,
    children: productPaths,
  },
  {
    name: 'Inventory',
    path: 'inventory',
    icon: MdOutlineInventory2,
    children: inventoryPaths,
  },
  {
    name: 'Purchase',
    path: 'purchase',
    icon: FiShoppingBag,
    element: <Purchase />,
  },
  {
    name: 'Sales',
    path: 'sales',
    icon: TfiShoppingCart,
    children: salePaths,
  },
  {
    name: 'Expenses',
    path: 'expenses',
    icon: SlWallet,
    children: expensePaths,
  },
  {
    name: 'Generator',
    path: 'generator',
    icon: TbFilePercent,
    children: generatorPaths,
  },
  {
    name: 'Return',
    path: 'return',
    icon: TbTruckReturn,
    children: returnPaths,
  },
  {
    name: 'HRM',
    path: 'hrm',
    icon: TbUsersGroup,
    children: hrmPaths,
  },
  {
    name: 'Accounts',
    path: 'accounts',
    icon: MdAccountBalance,
    children: accountPaths,
  },
  {
    name: 'People',
    path: 'people',
    icon: GoPeople,
    children: peoplePaths,
  },
  {
    name: 'Reports',
    path: 'reports',
    icon: TbReport,
    children: reportPaths,
  },
  {
    name: 'Email Manager',
    path: 'email',
    icon: MdOutlineMailLock,
    children: emailPaths,
  },
  {
    name: 'SMS Manager',
    path: 'sms',
    icon: MdSms,
    children: smsPaths,
  },
  {
    name: 'Settings',
    path: 'settings',
    icon: MdOutlineSettings,
    children: settingPaths,
  },
  // {
  //   name: 'Backup & Restore',
  //   path: 'backup-restore',
  //   icon: LuDatabaseBackup,
  //   element: <></>,
  // },
  // {
  //   name: 'Clear Cache',
  //   path: 'clear-cache',
  //   icon: PiBroomFill,
  //   element: <></>,
  // },
];
