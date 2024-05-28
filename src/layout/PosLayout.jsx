import { Button, Layout } from "antd";
// import { Footer } from "antd/es/layout/layout";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import Logo from "../components/AllSection/Header/Logo";
import Profile from "../components/AllSection/Header/Profile";
import { GlobalUtilityStyle } from "../container/Styled";
import { mode } from "../utilities/configs/base_url";
import SideBar from "./SideBar";
import { PosRegister } from "../components/PosRegister/PosRegister";
import Payment from "../components/PosRegister/Payment";

const { Header, Content, Footer } = Layout;

const TypeComponent = () => {
  return (
    <div className="grid grid-cols-3 gap-3 pr-4 pt-5">
      <Link to="/pos/category">
        <Button type="primary" size="large" className="w-full">
          Category
        </Button>
      </Link>
      <Link to="/pos/brand">
        <Button type="primary" size="large" className="w-full">
          Brand
        </Button>
      </Link>
      <Link to="/pos/featured">
        <Button type="primary" size="large" className="w-full">
          Featured
        </Button>
      </Link>
    </div>
  );
};

const PosLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalUtilityStyle>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-[#F5F5F5] ">
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
              <div className="h-[82.3dvh] absolute top-[8.7rem] left-0 pb-4">
                <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
              </div>

              <Layout className="w-48 h-[90dvh]">
                <TypeComponent />
                <Content
                  style={{
                    margin: "16px 16px 16px 0",
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                  className="shadow-md"
                >
                  <GlobalUtilityStyle>
                    <Outlet />
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
