import { Button, Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Profile from "../components/AllSection/Header/Profile";
import SideBar from "./SideBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { Footer } from "antd/es/layout/layout";
const { Header, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header className="bg-primary flex  justify-between items-center">
        <div className="flex items-center ml-4 gap-10 text-2xl">
          <Button
            className="-ml-10 p-0 bg-transparent border border-none rounded-full flex items-center justify-center "
            type="text"
            icon={
              <RxHamburgerMenu
                // className="hover:cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
              />
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "20px",
            }}
          />
          {/* <RxHamburgerMenu
            className="-ml-10 hover:cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          /> */}
          <div className="font-bold  text-secondary">POS Inventory</div>
        </div>
        <Profile />
      </Header>

      <Layout>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout>
          <Content
            style={{
              margin: "8px 8px",
            }}
            className="min-h-90vh"
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: "center",
              // backgroundColor: "white",
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
