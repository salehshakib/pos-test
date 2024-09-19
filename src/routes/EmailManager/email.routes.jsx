import { MdOutlineAttachEmail, MdOutlineMailLock } from 'react-icons/md';

import { EmailConfig } from '../../pages/Dashboard/EmailConfig/EmailConfig';
import EmailTemplate from '../../pages/Dashboard/EmailTemplate/EmailTemplate';

export const emailPaths = [
  {
    name: 'Email Template',
    path: 'email-template',
    icon: MdOutlineAttachEmail,
    element: <EmailTemplate />,
  },
  {
    name: 'Email Configuration',
    path: 'email-settings',
    icon: MdOutlineMailLock,
    element: <EmailConfig />,
  },
];
