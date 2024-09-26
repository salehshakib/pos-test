import { useSelector } from 'react-redux';

import { SITE_LOGO } from '../../assets/data/defaultLogo';
import { getLogo } from '../../redux/services/developer/developerSlice';

export const useSiteLogo = () => {
  const logo = useSelector(getLogo);

  if (!logo) {
    return SITE_LOGO;
  }

  return logo;
};
