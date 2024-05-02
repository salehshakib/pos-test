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
    <Popover
      placement="bottomLeft"
      content={content}
      className="hover:cursor-pointer"
      trigger={"click"}
    >
      <Avatar className="avatar-bg" size={40} icon={<UserOutlined />} />
    </Popover>
  );
};

export default Profile;
