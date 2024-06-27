import { Button, Layout, Tag } from "antd";
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
      <div className="relative h-[100vh] ">
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
            <Tag color="processing" className="font-semibold">
              {mode.toUpperCase()} MODE
            </Tag>
          )}
          <Profile />
        </Header>

        <div className="flex">
          <div className="h-[calc(100vh-4rem)] sticky z-40 top-[4rem] left-0 ">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>

          <Layout className="w-48 flex flex-col ">
            <Content
              style={{
                margin: "16px",
                marginBottom: 0,
                backgroundColor: "white",
                borderRadius: "8px",
              }}
              className="shadow-md flex-grow overflow-auto"
            >
              <GlobalUtilityStyle>
                <Outlet />
              </GlobalUtilityStyle>
            </Content>
            <Footer
              style={{
                textAlign: "center",
                padding: "16px",
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
