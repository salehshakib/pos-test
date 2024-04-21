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
      width={600}
      title={title}
      placement={placement}
      closable={true}
      onClose={onClose}
      open={open}
      destroyOnClose
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
