import { Button, Layout, Tag } from 'antd';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import Logo from '../components/AllSection/Header/Logo';
import Profile from '../components/AllSection/Header/Profile';
import { GlobalUtilityStyle } from '../container/Styled';
import { isDev, mode } from '../utilities/configs/base_url';
import SideBar from './SideBar';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const { pathname } = useLocation();

  const dashboardStyle = pathname.includes('/dashboard')
    ? {}
    : { backgroundColor: 'white', borderRadius: '8px' };

  const [collapsed, setCollapsed] = useState(false);

  const { developedBy, hyperLink } = useSelector((state) => state.developer);

  return (
    <GlobalUtilityStyle>
      <div className="relative">
        <Header className="fixed top-0 z-50 flex w-full items-center justify-between bg-white px-5 shadow-md">
          <div className="flex items-center gap-6 text-2xl">
            <Button
              className="flex items-center justify-center rounded-full border border-none p-0 text-[20px]"
              type="text"
              icon={<GiHamburgerMenu />}
              onClick={() => setCollapsed(!collapsed)}
            ></Button>
            <Logo />
          </div>
          <div className="hidden lg:block">
            {mode === 'local' && (
              <Tag color="processing" className="font-semibold">
                {mode.toUpperCase()} MODE
              </Tag>
            )}
            {isDev.toLowerCase() === 'true' && (
              <Tag color="purple" className="font-semibold">
                DEV MODE
              </Tag>
            )}
          </div>
          <Profile />
        </Header>

        <div className="flex pt-16">
          <div className="left-0 top-[4rem] z-40 h-[calc(100vh-4rem)]">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>

          <Layout className="flex w-48 flex-col">
            <Content
              style={{
                margin: '16px',
                marginBottom: 0,
                ...dashboardStyle,
              }}
              className={`${pathname.includes('/dashboard') ? '' : 'shadow-md'} flex-grow overflow-auto`}
            >
              <GlobalUtilityStyle>
                <Outlet />
              </GlobalUtilityStyle>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
                padding: '16px',
              }}
            >
              POS Inventory ©{new Date().getFullYear()} Created by{' '}
              <a
                href={`http://${hyperLink}`}
                className="primary-text font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {developedBy ?? 'Vitasoft Solutions'}
              </a>
            </Footer>
          </Layout>
        </div>
      </div>
    </GlobalUtilityStyle>
  );
};
export default MainLayout;
