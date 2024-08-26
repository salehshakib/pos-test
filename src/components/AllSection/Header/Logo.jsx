import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLogo } from '../../../redux/services/developer/developerSlice';

const Logo = () => {
  const navigate = useNavigate();
  const logo = useSelector(getLogo);

  // console.log(logo);

  return (
    <div
      className="primary-text flex items-center justify-center font-bold hover:cursor-pointer"
      onClick={() => navigate('/dashboard')}
    >
      <img src={logo} alt="" className="h-16 w-32 object-cover" />
    </div>
  );
};

export default Logo;
