import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../redux/services/auth/authSlice";
import { adminPaths } from "../routes/admin.routes";
import { sidebarItemsGenerator } from "../utilities/lib/sidebarItemsGenerator";
import { useState } from "react";
const { Sider } = Layout;

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const SideBar = ({ collapsed, setCollapsed }) => {
  const userData = useSelector(useCurrentUser);
  const menu = userData?.roles?.menu;
  const [stateOpenKeys, setStateOpenKeys] = useState([]);

  const filteredPaths = adminPaths.filter((item) => {
    return menu?.some(
      (menuItem) => menuItem?.name.toLowerCase() === item.name.toLowerCase()
    );
  });

  console.log(filteredPaths);

  const sidebarItems = sidebarItemsGenerator(
    // !userData?.is_admin ? filteredPaths : adminPaths
    // filteredPaths
    adminPaths
  );

  const levelKeys = getLevelKeys(sidebarItems);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <div className="absolute md:relative z-50 lg:z-0 min-h-fit">
      <Sider
        className="border-r border-gray-200 drop-shadow-primary h-full"
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          // minHeight: "100vh",
          height: "100vh",
          overflow: "auto",
        }}
        breakpoint="md"
        collapsedWidth="70"
      >
        <Menu
          theme="light"
          mode="inline"
          className="pb-10"
          style={{
            // height: "100%",
            borderRight: 0,
          }}
          items={sidebarItems}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
        />
      </Sider>
    </div>
  );
};

export default SideBar;
