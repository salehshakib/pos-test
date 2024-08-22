import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLogo } from '../../../redux/services/developer/developerSlice';

const Logo = () => {
  const navigate = useNavigate();
  const logo = useSelector(getLogo);

  // console.log(logo);

  return (
    <div
      className="font-bold hover:cursor-pointer primary-text flex justify-center items-center "
      onClick={() => navigate('/dashboard')}
    >
      <img src={logo} alt="" className="w-32 h-16 object-cover" />
    </div>
  );
};

export default Logo;
