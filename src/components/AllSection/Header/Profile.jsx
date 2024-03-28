import { Avatar, Button, Popover } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/services/auth/authSlice";
import { toast } from "sonner";
import { UserOutlined } from "@ant-design/icons";

const Profile = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!", { duration: 2000 });
  };
  const content = (
    <div className="">
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );

  return (
    <div className="flex justify-between items-center mt-3">
      <div className="flex items-center ml-4">
        <div className="font-bold text-2xl text-secondary">POS Inventory</div>
      </div>
      <Popover placement="bottomLeft" content={content} className="mr-4">
        <Avatar className="bg-secondary" size={40} icon={<UserOutlined />} />
      </Popover>
    </div>
  );
};

export default Profile;
