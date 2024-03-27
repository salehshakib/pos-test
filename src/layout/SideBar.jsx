import { Layout, Menu } from "antd";
import { adminPaths } from "../routes/admin.routes";
import { sidebarItemsGenerator } from "../utilities/lib/sidebarItemsGenerator";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  MANAGER: "manager",
};

const SideBar = () => {
  const role = "admin";

  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    default:
      break;
  }
  return (
    <Sider
      className="border-r border-gray-200 drop-shadow-primary"
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        theme="light"
        mode="inline"
        className="mt-5"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
