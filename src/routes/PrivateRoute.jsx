import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout, useCurrentToken } from "../redux/services/auth/authSlice";

function PrivateRoute({ children }) {
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();

  // const user = useSelector(useCurrentUser);
  // const warehouseId = user?.warehouse_id;

  // const { data } = useGetAllNotificationQuery({ id: warehouseId });

  // console.log(data);

  if (!token) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
}

export default PrivateRoute;
