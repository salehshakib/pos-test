import { CiDesktop } from 'react-icons/ci';
import { FaBuilding } from 'react-icons/fa';
import { FaPeopleRoof } from 'react-icons/fa6';
import { MdCoPresent } from 'react-icons/md';

import Account from '../../pages/Dashboard/Account/Account';
import { Attendance } from '../../pages/Dashboard/Attendance/Attendance';
import Designation from '../../pages/Dashboard/Designation/Designation';
import Employee from '../../pages/Dashboard/Employee/Employee';

export const accountPaths = [
  {
    name: 'Account',
    path: 'account',
    icon: FaBuilding,
    element: <Account />,
  },
  {
    name: 'Balance',
    path: 'balance',
    icon: CiDesktop,
    element: <Designation />,
  },
  {
    name: 'Balance Deposit',
    path: 'balance-deposit',
    icon: FaPeopleRoof,
    element: <Employee />,
  },

  {
    name: 'Balance Withdrwal',
    path: 'balance-withdrawal',
    icon: MdCoPresent,
    element: <Attendance />,
  },
];
