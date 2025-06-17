import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { logout, useCurrentToken } from '../redux/services/auth/authSlice';
import { openNotification } from '../utilities/lib/openToaster';

function PosRoute({ children }) {
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();

  const { pettyCash } = useSelector((state) => state.pettyCash);

  if (pettyCash === 'Close') {
    openNotification('info', 'Cash register is closed.');
    return <Navigate to={'/dashboard'} replace={true} />;
  }

  // if (!token) {
  //   dispatch(logout());
  //   return <Navigate to={'/login'} replace={true} />;
  // }

  return children;
}

export default PosRoute;
