import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover, theme } from "antd";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, useCurrentUser } from "../../../redux/services/auth/authSlice";
import { openNotification } from "../../../utilities/lib/openToaster";
import { CloseCashRegister } from "./overview/CloseCashRegister";
import { Notification } from "./overview/Notification";
import { PosComponent } from "./overview/PosComponent";

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { pathname } = location;

  const handleLogout = () => {
    openNotification("success", "Logged out successfully!");
    dispatch(logout());
  };

  const user = useSelector(useCurrentUser);

  const { token } = theme.useToken();
  const navigate = useNavigate();

  const content = (
    <div>
      <div className="">
        <div className="py-3 rounded-md px-2">
          <div className="flex gap-4 items-center text-lg">
            <Avatar
              className="avatar-bg shadow-md hover:shadow-lg"
              size={44}
              icon={<UserOutlined />}
            />
            <div className="flex flex-col font-normal">
              <span className="font-bold">{user?.username ?? "User"}</span>
              <span
                className={`text-sm `}
                style={{
                  color: token.colorPrimary,
                }}
              >
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        <div className="py-2 px-4 bg-[#F5F5F5] rounded-md">
          <div
            className="flex gap-2 items-center text-lg  hover:underline profile-ul w-max"
            onClick={() => navigate("/settings/general-settings")}
          >
            <IoSettingsOutline size={18} />
            <div className="flex flex-col font-semibold text-[15px]">
              <span className="">General Settings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end pt-3">
        <Button onClick={handleLogout} className={`w-full`} size="large">
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className=" flex justify-center items-center gap-2">
      {/* <CreateComponent /> */}
      {!pathname.includes("/pos") && <PosComponent />}

      <CloseCashRegister />

      <Notification />

      <Popover
        placement="bottomLeft"
        content={content}
        className="hover:cursor-pointer"
        trigger={"click"}
        overlayStyle={{ width: "auto" }}
        overlayInnerStyle={{
          width: 280,
          // backgroundColor: "#F5F5F5",
        }}
      >
        <Avatar
          className="avatar-bg shadow-md hover:shadow-lg"
          size={40}
          icon={<UserOutlined />}
        />
      </Popover>
    </div>
  );
};

export default Profile;
