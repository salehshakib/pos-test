import { Drawer } from "antd";
import { useDispatch } from "react-redux";
import {
  closeCreateDrawer,
  closeEditDrawer,
} from "../../../redux/services/global/globalSlice";

const CustomDrawer = ({ title, placement = "right", children, open }) => {
  const dispatch = useDispatch();
  const handleCloseDrawer = () => {
    dispatch(closeCreateDrawer());
    dispatch(closeEditDrawer());
  };

  return (
    <Drawer
      key={title}
      width={600}
      title={title}
      placement={placement}
      closable={true}
      onClose={handleCloseDrawer}
      open={open}
      destroyOnClose
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
