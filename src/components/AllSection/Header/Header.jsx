import { Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/services/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="flex justify-between items-center px-4">
      <div>Logo</div>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
};

export default Header;
