import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import { FaShoppingBasket } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../../../redux/services/auth/authSlice";
import CreateComponent from "./CreateComponent";

const PosComponent = () => {
  return (
    <Link to="/pos">
      <Button
        icon={<FaShoppingBasket size={20} />}
        className="flex justify-center items-center gap-1"
        size="large"
        // onClick={}
      >
        POS
      </Button>
    </Link>
  );
};

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { pathname } = location;

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
    <div className=" flex justify-center items-center gap-3">
      <CreateComponent />
      {!pathname.includes("/pos") && <PosComponent />}
      <Popover
        placement="bottomLeft"
        content={content}
        className="hover:cursor-pointer"
        trigger={"click"}
      >
        <Avatar
          className="avatar-bg shadow-md hover:shadow-lg"
          size={40}
          icon={<UserOutlined />}
        />
      </Popover>
    </div>
    // <div></div>
  );
};

export default Profile;
