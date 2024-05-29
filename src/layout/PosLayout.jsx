import { Button, Layout } from "antd";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../components/AllSection/Header/Logo";
import Profile from "../components/AllSection/Header/Profile";
import Payment from "../components/PosRegister/Payment";
import PosFilterComponent from "../components/PosRegister/PosFilterComponent";
import PosProducts from "../pages/Dashboard/PosRegister/PosProducts";
import { PosRegister } from "../components/PosRegister/PosRegister";
import { GlobalUtilityStyle } from "../container/Styled";
import { mode } from "../utilities/configs/base_url";
import SideBar from "./SideBar";

const { Header, Content, Footer } = Layout;

const PosLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalUtilityStyle>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-[#F5F5F5] min-h-[95vh]">
          <PosRegister />

          <div className="relative">
            <Header className="bg-white flex justify-between items-center px-5 sticky w-full top-0 z-50 shadow-md">
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
            </Header>

            <div className="flex">
              <div className="absolute h-[762px] top-[8.7rem] z-40 left-0 pb-4 ">
                <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
              </div>

              <Layout className="w-48 ">
                <PosFilterComponent />

                <Content
                  style={{
                    // margin: "16px 16px 16px 0",
                    // backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                  }}
                  className="shadow-md h-[746px] m-4 lg:ml-0 bg-gray-200"
                >
                  <GlobalUtilityStyle>
                    <PosProducts />
                  </GlobalUtilityStyle>
                </Content>
              </Layout>
            </div>
          </div>
        </div>

        <Payment />
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          POS Inventory ©{new Date().getFullYear()} Created by Vitasoft
          Solutions
        </Footer>
      </div>
    </GlobalUtilityStyle>
  );
};

export default PosLayout;
