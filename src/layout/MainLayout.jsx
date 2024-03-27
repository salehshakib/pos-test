import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Profile from "../components/AllSection/Header/Header";
import SideBar from "./SideBar";
const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Header className="bg-primary">
        <Profile />
      </Header>
      <Layout className="h-screen">
        <SideBar />
        <Layout>
          <Content className="bg-white rounded">
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
