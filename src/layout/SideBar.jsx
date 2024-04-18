import { Layout, Menu } from "antd";
import { adminPaths } from "../routes/admin.routes";
import { sidebarItemsGenerator } from "../utilities/lib/sidebarItemsGenerator";

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
      {/* <Button
        className="absolute top-0 -right-5 mt-2 mr-2 bg-white border border-gray-200 rounded-full"
        type="text"
        icon={
          collapsed ? (
            <TbLayoutSidebarLeftExpandFilled className="text-xl" />
          ) : (
            <TbLayoutSidebarRightExpandFilled className=" text-xl" />
          )
        }
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
        }}
      /> */}
    </div>
  );
};

export default SideBar;
