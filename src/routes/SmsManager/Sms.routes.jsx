import { LiaSmsSolid } from 'react-icons/lia';
import { MdOutlineSms } from 'react-icons/md';

import SmsConfig from '../../pages/Dashboard/SmsConfig/SmsConfig';
import SmsTemplate from '../../pages/Dashboard/SmsTemplate/SmsTemplate';

export const smsPaths = [
  {
    name: 'SMS Template',
    path: 'sms-template',
    icon: MdOutlineSms,
    element: <SmsTemplate />,
  },
  {
    name: 'SMS Configuration',
    path: 'sms-settings',
    icon: LiaSmsSolid,
    element: <SmsConfig />,
  },
];
