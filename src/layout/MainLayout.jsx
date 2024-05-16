import { Button, Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Outlet } from "react-router-dom";
import Logo from "../components/AllSection/Header/Logo";
import Profile from "../components/AllSection/Header/Profile";
import { GlobalUtilityStyle } from "../container/Styled";
import { mode } from "../utilities/configs/base_url";
import SideBar from "./SideBar";

const { Header, Content } = Layout;

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
              icon={<RxHamburgerMenu />}
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

        <div className="flex ">
          <div className="h-[100dvh] sticky top-16 left-0 border-2 border-red-600">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>

          <Layout className="">
            <Content
              style={{
                margin: "16px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
              className="shadow-md"
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
