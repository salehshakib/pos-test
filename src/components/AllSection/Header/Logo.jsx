import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getLogo } from '../../../redux/services/developer/developerSlice';
import Translate from '../../Shared/Translate/Translate';

const Logo = () => {
  const navigate = useNavigate();
  const logo = useSelector(getLogo);

  return (
    <div
      className="primary-text flex items-center justify-center font-bold hover:cursor-pointer"
      onClick={() => navigate('/dashboard')}
    >
      <img src={logo} alt="" className="h-16 w-32 object-cover" />
      <div className="w-12 lg:w-full">
        <Translate />
      </div>
    </div>
  );
};

export default Logo;
