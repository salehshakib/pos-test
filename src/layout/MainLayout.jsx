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

const { Header, Content, Sider } = Layout;

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

        <div className="flex">
          <div className="sticky top-14">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>

          <Layout className="ml-[4.3rem] lg:ml-0 border-2 border-black h-[100dvh] overflow-auto">
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

      {/* <div className="relative">
        <div className="bg-blue-500 text-white text-center py-4 sticky top-0 z-50">
          Header
        </div>

        <div className="border-2 border-black flex">
          <Sider
            width={200}
            className="bg-gray-200 h-[100dvh] overflow-y-auto sticky top-14 border-2 border-red-600 left-0"
          >
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
            <div className="py-5 text-white">Sidebar Content</div>
          </Sider>
          <Layout>
            <Content className="p-4 ">
              <div className="border border-green-600  h-[200dvh]">
                Main Content Area
              </div>
            </Content>
            <Footer className="bg-gray-300 text-center py-2">Footer</Footer>
          </Layout>
        </div>
      </div> */}
    </GlobalUtilityStyle>
  );
};
export default MainLayout;
