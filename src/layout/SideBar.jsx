import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../redux/services/auth/authSlice';
import { adminPaths } from '../routes/admin.routes';
import { useSiteLogo } from '../utilities/hooks/useSiteLogo';
import { useMenuItems } from '../utilities/lib/getPermission';
import { sidebarItemsGenerator } from '../utilities/lib/sidebarItemsGenerator';

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
  const navigate = useNavigate();
  const logo = useSiteLogo();

  const menuItems = useMenuItems(adminPaths);
  // const menuItems = adminPaths;

  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/dashboard');
    }
    if (pathname === '/dashboard') {
      setStateOpenKeys(['Dashboard']);
      setSelectedKeys(['Dashboard']);
    }

    if (pathname.includes('/stock-request')) {
      setStateOpenKeys(['Inventory']);
      setSelectedKeys(['Stock Request']);
    }

    if (pathname.includes('/transfer')) {
      setStateOpenKeys(['Inventory']);
      setSelectedKeys(['Transfer']);
    }

    if (pathname.includes('/pos') && !pathname.includes('pos-settings')) {
      setCollapsed(true);
    }
  }, [navigate, pathname, setCollapsed]);

  const filteredPaths = [];

  Object.keys(menuItems).forEach((key) => {
    adminPaths.forEach((item) => {
      if (key.toLowerCase().includes(item.path)) {
        if (item.children && menuItems[key].length) {
          const modifiedMenuItems = menuItems[key].map((subItem) =>
            subItem.toLowerCase().replace(/\s+/g, '-')
          );

          const filteredChildren = item.children.filter((child) =>
            modifiedMenuItems.includes(child.path)
          );

          if (filteredChildren.length > 0) {
            filteredPaths.push({
              ...item,
              children: filteredChildren,
            });
          } else {
            filteredPaths.push(item);
          }
        } else {
          filteredPaths.push(item);
        }
      }
    });
  });

  const userData = useSelector(useCurrentUser);
  const isAdmin = userData?.roles?.[0]?.name === 'Admin';

  //permission
  // const sidebarItems = sidebarItemsGenerator(
  //   isAdmin ? adminPaths : filteredPaths
  // );

  const sidebarItems = sidebarItemsGenerator(adminPaths);

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
      className="h-full overflow-x-auto bg-white pb-10 pt-1 "
      // theme="dark"
      width={240}
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        boxShadow:
          '4px 0 4px -1px rgb(0 0 0 / 0.1), 2px 0 2px -2px rgb(0 0 0 / 0.1)',
      }}
      breakpoint={`${pathname.includes('/pos') && !pathname.includes('pos-settings') ? '' : 'lg'}`}
      collapsedWidth={`${pathname.includes('/pos') && !pathname.includes('pos-settings') ? 0 : 70}`}
    >
      {pathname.includes('/pos') && !pathname.includes('pos-settings') && (
        <div className="w-full">
          <img src={logo} alt="" className="mx-auto h-16 w-32 object-cover" />
        </div>
      )}

      <Menu
        theme="light"
        mode="inline"
        className="h-full w-full"
        defaultSelectedKeys={['Dashboard']}
        items={sidebarItems}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
        openKeys={stateOpenKeys}
      />
    </Sider>
  );
};

export default SideBar;
