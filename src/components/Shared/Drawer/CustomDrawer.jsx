import { Drawer, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import {
  closeCreateDrawer,
  closeEditDrawer,
} from '../../../redux/services/drawer/drawerSlice';

const CustomDrawer = ({
  title,
  placement = 'right',
  children,
  open,
  isLoading = false,
  onClose,
  width = 900,
}) => {
  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(closeCreateDrawer());
    dispatch(closeEditDrawer());
  };

  return (
    <Drawer
      key={title}
      title={title}
      open={open}
      width={width}
      placement={placement}
      closable={true}
      onClose={onClose ?? handleCloseDrawer}
      maskClosable
      destroyOnClose
    >
      <div className="relative h-full w-full">
        {isLoading ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <Spin size="default" />
          </div>
        ) : (
          children
        )}
      </div>
      {/* {children} */}
    </Drawer>
  );
};

export default CustomDrawer;
