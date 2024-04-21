import { Button, Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Outlet } from "react-router-dom";
import Logo from "../components/AllSection/Header/Logo";
import Profile from "../components/AllSection/Header/Profile";
import SideBar from "./SideBar";
const { Header, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header className="bg-primary flex justify-between items-center px-5">
        <div className="flex items-center gap-6 text-2xl">
          <Button
            className="p-0 border border-none rounded-full flex items-center justify-center text-[20px]"
            type="text"
            icon={<RxHamburgerMenu />}
            onClick={() => setCollapsed(!collapsed)}
          ></Button>
          <Logo />
        </div>
        <Profile />
      </Header>

      <Layout>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout className=" ml-16 md:ml-0">
          <Content
            style={{
              margin: "8px 8px",
              // padding: 24,
              backgroundColor: "white",
            }}
            className="min-h-90vh"
          >
            <Outlet />
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
      </Layout>
    </Layout>
  );
};
export default MainLayout;
