import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../redux/services/auth/authSlice";

function PrivateRoute({ children }) {
  const token = useSelector(useCurrentToken);

  // if (!token) {
  //   return <Navigate to={"/login"} replace={true} />;
  // }

  return children;
}

export default PrivateRoute;
