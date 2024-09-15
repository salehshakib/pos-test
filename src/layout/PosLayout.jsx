import { useState } from 'react';

import { CustomPosLayoutComponent } from '../components/PosRegister/overview/CustomPosLayoutComponent';
import { GlobalUtilityStyle } from '../container/Styled';
import SideBar from './SideBar';

const PosLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalUtilityStyle>
      <div className="relative flex h-screen flex-col">
        <CustomPosLayoutComponent setCollapsed={setCollapsed} />

        <div className="absolute left-0 z-40 h-[100vh] overflow-auto ">
          <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      </div>
    </GlobalUtilityStyle>
  );
  // }
};

export default PosLayout;
