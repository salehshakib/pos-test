import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import logo from "../assets/data/defaultLogo";
import { useCurrentUser } from "../redux/services/auth/authSlice";
import { adminPaths } from "../routes/admin.routes";
import { sidebarItemsGenerator } from "../utilities/lib/sidebarItemsGenerator";
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
  const [selectedKeys, setSelectedKeys] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/dashboard") {
      setStateOpenKeys(["Dashboard"]);
      setSelectedKeys(["Dashboard"]);
    }

    if (pathname.includes("/pos")) {
      setCollapsed(true);
    }
  }, [pathname, setCollapsed]);

  const filteredPaths = adminPaths.filter((item) => {
    return menu?.some(
      (menuItem) => menuItem?.name.toLowerCase() === item.name.toLowerCase()
    );
  });

  const sidebarItems = sidebarItemsGenerator(
    userData?.is_admin ? filteredPaths : adminPaths
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
    <Sider
      className="h-full overflow-x-auto pb-48 pt-1 bg-white"
      // theme="dark"
      width={250}
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        boxShadow:
          "4px 0 4px -1px rgb(0 0 0 / 0.1), 2px 0 2px -2px rgb(0 0 0 / 0.1)",
      }}
      breakpoint={`${pathname.includes("/pos") ? "" : "lg"}`}
      collapsedWidth={`${pathname.includes("/pos") ? 0 : 70}`}
    >
      {pathname.includes("/pos") && (
        <div className="w-full">
          <img src={logo} alt="" className="w-32 h-16 object-cover mx-auto" />
        </div>
      )}
      <Menu
        theme="light"
        mode="inline"
        className="h-full w-full "
        defaultSelectedKeys={["Dashboard"]}
        items={sidebarItems}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
      />
    </Sider>
  );
};

export default SideBar;
