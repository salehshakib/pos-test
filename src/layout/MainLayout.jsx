import { Button, Layout } from "antd";
// import { Footer } from "antd/es/layout/layout";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet } from "react-router-dom";
import Logo from "../components/AllSection/Header/Logo";
import Profile from "../components/AllSection/Header/Profile";
import { GlobalUtilityStyle } from "../container/Styled";
import { mode } from "../utilities/configs/base_url";
import SideBar from "./SideBar";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalUtilityStyle>
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
          <div className="h-[100dvh] absolute lg:sticky top-[4rem] left-0">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>

          <Layout className="w-48 h-[100dvh]">
            <Content
              style={{
                // margin: "16px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
              className="shadow-md m-4 ml-[5.5rem] lg:m-4"
            >
              <GlobalUtilityStyle>
                <Outlet />
              </GlobalUtilityStyle>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              POS Inventory ©{new Date().getFullYear()} Created by Vitasoft
              Solutions
            </Footer>
          </Layout>
        </div>
      </div>
    </GlobalUtilityStyle>
  );
};
export default MainLayout;
