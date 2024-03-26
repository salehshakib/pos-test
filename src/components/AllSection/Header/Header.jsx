import { Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/services/auth/authSlice";
import { toast } from "sonner";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!", { duration: 2000 });
  };
  return (
    <div className="flex justify-between items-center px-4">
      <div>Logo</div>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
};

export default Header;
