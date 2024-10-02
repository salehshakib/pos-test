import { CiDesktop } from 'react-icons/ci';
import { FaBuilding } from 'react-icons/fa';
import { FaPeopleRoof } from 'react-icons/fa6';
import { MdCoPresent } from 'react-icons/md';

import Account from '../../pages/Dashboard/Account/Account';
import Balance from '../../pages/Dashboard/Balance/Balance';
import BalanceDeposit from '../../pages/Dashboard/BalanceDeposit/BalanceDeposit';
import BalanceWithdraw from '../../pages/Dashboard/BalanceWithdraw/BalanceWithdraw';

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
    element: <Balance />,
  },
  {
    name: 'Balance Deposit',
    path: 'balance-deposit',
    icon: FaPeopleRoof,
    element: <BalanceDeposit />,
  },

  {
    name: 'Balance Withdrwal',
    path: 'balance-withdrawal',
    icon: MdCoPresent,
    element: <BalanceWithdraw />,
  },
];
