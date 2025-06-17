import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Popover, theme } from 'antd';
import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuPackageSearch } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { logout, useCurrentUser } from '../../../redux/services/auth/authSlice';
import { openNotification } from '../../../utilities/lib/openToaster';
import Translate from '../../Shared/Translate/Translate';
import { CloseCashRegister } from './overview/CloseCashRegister';
import { Notification } from './overview/Notification';
import { PosComponent } from './overview/PosComponent';
import ProductInquiry from './overview/ProductInquiry';

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { pathname } = location;

  const handleLogout = () => {
    openNotification('success', 'Logged out successfully!');
    dispatch(logout());
  };

  const user = useSelector(useCurrentUser);

  const { token } = theme.useToken();
  const navigate = useNavigate();

  const [openInquiry, setOpenInquiry] = useState(false);

  const content = (
    <div>
      <div className="">
        <div className="rounded-md px-2 py-3">
          <div className="flex flex-col items-center gap-4 text-lg">
            <Avatar
              className="avatar-bg shadow-md hover:shadow-lg"
              size={50}
              icon={<UserOutlined />}
            />
            <div className="flex flex-col text-center font-normal">
              <span className="font-bold">
                {user?.name ?? user?.username ?? 'User'} (
                <span className="font-medium">
                  {user?.roles?.[0]?.name ?? 'User'}
                </span>
                )
              </span>

              <span
                className={`text-sm`}
                style={{
                  color: token.colorPrimary,
                }}
              >
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-md bg-[#F5F5F5] px-4 py-2">
          <div
            className="profile-ul flex w-max items-center gap-2 text-lg hover:underline"
            onClick={() => navigate('/settings/general-settings')}
          >
            <IoSettingsOutline size={18} />
            <div className="flex flex-col text-[15px] font-semibold">
              <span className="">General Settings</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        icon={<LuPackageSearch />}
        onClick={() => setOpenInquiry(true)}
        className="md:hidden w-full mt-4"
      >
        Inquiry
      </Button>

      <div className="mt-6">
        <Translate />
      </div>

      <div className="flex w-full justify-end pt-3">
        <Button onClick={handleLogout} className={`w-full`} size="large">
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={() => setOpenInquiry(true)}
        className="hidden md:flex items-center gap-1"
      >
        <LuPackageSearch className="text-lg" />
        Inquiry
      </Button>

      {!pathname.includes('/pos') && <PosComponent />}

      <CloseCashRegister />

      <Notification />

      <Popover
        placement="bottomLeft"
        content={content}
        className="hover:cursor-pointer"
        trigger={'click'}
        overlayStyle={{ width: 'auto' }}
        overlayInnerStyle={{
          width: 280,
          // backgroundColor: "#F5F5F5",
        }}
      >
        <Avatar
          className="avatar-bg shadow-md hover:shadow-lg"
          size={40}
          icon={<UserOutlined />}
        />
      </Popover>

      <Modal
        open={openInquiry}
        onCancel={() => setOpenInquiry(false)}
        footer={null}
        destroyOnClose
        width={1200}
        centered
        title="Product Inquiry"
      >
        <ProductInquiry setOpenInquiry={setOpenInquiry} />
      </Modal>
    </div>
  );
};

export default Profile;
