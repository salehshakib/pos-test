import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { FaPeopleGroup } from 'react-icons/fa6';
import { LuClipboardType } from 'react-icons/lu';
import {
  MdOutlineSettingsApplications,
  MdPointOfSale,
  MdTimeToLeave,
} from 'react-icons/md';
import { RiVerifiedBadgeLine } from 'react-icons/ri';
import { TbReceiptTax } from 'react-icons/tb';
import CustomerGroup from '../../pages/Dashboard/CustomerGroup/CustomerGroup';
import GeneralSettings from '../../pages/Dashboard/GeneralSettings/GeneralSettings';
import GiftCardType from '../../pages/Dashboard/GiftCardType/GiftCardType';
import { HrmSettings } from '../../pages/Dashboard/HrmSetting/HrmSettings';
import PosSetting from '../../pages/Dashboard/PosSetting/PosSetting';
import { Roles } from '../../pages/Dashboard/Roles/Roles';
import { LeaveType } from '../../pages/Dashboard/Settings/LeaveType/LeaveType';
import TaxList from '../../pages/Dashboard/Tax/TaxList';
import Types from '../../pages/Dashboard/Type/Types';
import UnitList from '../../pages/Dashboard/Unit/UnitList';

export const settingPaths = [
  {
    name: 'Role Permission',
    path: 'role',
    icon: RiVerifiedBadgeLine,
    element: <Roles />,
  },
  // {
  //   name: "Discount Plan",
  //   path: "discount-plan",
  //   icon: LuClipboardList,
  //   element: <DiscountPlan />,
  // },
  // {
  //   name: "Discount",
  //   path: "discount",
  //   icon: CiDiscount1,
  //   element: <Discount />,
  // },
  {
    name: 'Customer Group',
    path: 'customer-group',
    icon: FaPeopleGroup,
    element: <CustomerGroup />,
  },
  {
    name: 'Types',
    path: 'type',
    icon: LuClipboardType,
    element: <Types />,
  },
  {
    name: 'Unit',
    path: 'unit',
    icon: AiOutlineDeploymentUnit,
    element: <UnitList />,
  },
  {
    name: 'Gift Card Type',
    path: 'gift-card-type',
    icon: LuClipboardType,
    element: <GiftCardType />,
  },
  {
    name: 'Vat',
    path: 'tax',
    icon: TbReceiptTax,
    element: <TaxList />,
  },
  {
    name: 'Leave Type',
    path: 'leave-type',
    icon: MdTimeToLeave,
    element: <LeaveType />,
  },
  {
    name: 'Hrm Settings',
    path: 'hrm-settings',
    icon: MdTimeToLeave,
    element: <HrmSettings />,
  },
  {
    name: 'Pos Settings',
    path: 'pos-settings',
    icon: MdPointOfSale,
    element: <PosSetting />,
  },
  {
    name: 'General Settings',
    path: 'general-settings',
    icon: MdOutlineSettingsApplications,
    element: <GeneralSettings />,
  },
];
