import { Drawer } from "antd";

const CustomDrawer = ({
  title,
  open,
  onClose,
  placement = "right",
  children,
}) => {
  return (
    <Drawer
      key={title}
      title={title}
      placement={placement}
      closable={true}
      onClose={onClose}
      open={open}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
