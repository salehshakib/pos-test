import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../redux/services/auth/authSlice";
import { adminPaths } from "../routes/admin.routes";
import { sidebarItemsGenerator } from "../utilities/lib/sidebarItemsGenerator";

const { Sider } = Layout;

const SideBar = ({ collapsed, setCollapsed }) => {
  const userData = useSelector(useCurrentUser);
  const menu = userData?.roles?.menu;

  const filteredPaths = adminPaths.filter((item) => {
    return menu?.some(
      (menuItem) => menuItem?.name.toLowerCase() === item.name.toLowerCase()
    );
  });

  const sidebarItems = sidebarItemsGenerator(
    // !userData?.is_admin ? filteredPaths : adminPaths
    // filteredPaths
    adminPaths
  );

  return (
    <div className="relative">
      <Sider
        className="border-r border-gray-200 drop-shadow-primary"
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          minHeight: "100vh",
        }}
        breakpoint="md"
        collapsedWidth="70"
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={sidebarItems}
        />
      </Sider>
    </div>
  );
};

export default SideBar;
