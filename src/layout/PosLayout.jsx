import { Button, Layout } from "antd";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../components/AllSection/Header/Logo";
import Profile from "../components/AllSection/Header/Profile";
import Payment from "../components/PosRegister/Payment";
import PosFilterComponent from "../components/PosRegister/PosFilterComponent";
import { PosRegister } from "../components/PosRegister/PosRegister";
import { GlobalUtilityStyle } from "../container/Styled";
import PosProducts from "../pages/Dashboard/PosRegister/PosProducts";
import { mode } from "../utilities/configs/base_url";
import SideBar from "./SideBar";

const { Footer } = Layout;

const PosLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalUtilityStyle>
      <div className="flex flex-col relative h-screen">
        <div className="grow min-h-[60vh] overflow-auto h-full bg-[#F5F5F5]">
          <div className="grid grid-cols-2 h-full">
            <div>
              <PosRegister />
            </div>

            <div className="relative flex flex-col ">
              <div className="bg-white flex justify-between items-center px-5 w-full top-0 z-50 shadow-md">
                <div className="flex items-center gap-6 text-2xl">
                  <Button
                    className="p-0 border border-none rounded-full flex items-center justify-center text-[20px]"
                    type="text"
                    icon={<GiHamburgerMenu />}
                    onClick={() => setCollapsed(!collapsed)}
                  ></Button>
                  <Logo />
                </div>
                {mode === "local" && (
                  <span className="text-xs bg-white p-2 rounded-lg font-bold text-gray-500">
                    {mode.toUpperCase()} MODE
                  </span>
                )}
                <Profile />
              </div>

              <div className="flex grow">
                <div className="flex flex-col w-full h-full">
                  <div>
                    <PosFilterComponent />
                  </div>
                  <div
                    style={{
                      borderRadius: "8px",
                    }}
                    className="shadow-md grow m-4 bg-gray-200 "
                  >
                    <PosProducts />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer
          style={{
            textAlign: "center",
          }}
          className="py-4"
        >
          <Payment />
        </Footer>

        <div className="absolute h-[100vh] overflow-auto z-40 left-0 ">
          <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      </div>
    </GlobalUtilityStyle>
  );
};

export default PosLayout;
