import { Button, Layout, Menu } from "antd";
import { adminPaths } from "../routes/admin.routes";
import { sidebarItemsGenerator } from "../utilities/lib/sidebarItemsGenerator";
import { TbArrowBadgeRight } from "react-icons/tb";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  MANAGER: "manager",
};

const SideBar = ({ collapsed, setCollapsed }) => {
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
    <div className="relative">
      <Sider
        className="border-r border-gray-200 drop-shadow-primary h-screen"
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          theme="light"
          mode="inline"
          className="mt-5"
          defaultSelectedKeys={["4"]}
          items={sidebarItems}
        />
      </Sider>
      <Button
        className="absolute top-0 -right-5 mt-2 mr-2 bg-white border border-gray-200 rounded-full"
        type="text"
        icon={
          collapsed ? (
            <TbArrowBadgeRight className="text-xl" />
          ) : (
            <TbArrowBadgeRight className="rotate-180 text-xl" />
          )
        }
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default SideBar;
