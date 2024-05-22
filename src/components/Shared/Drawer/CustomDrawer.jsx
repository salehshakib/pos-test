import { Drawer, Form, Spin } from "antd";
import { useDispatch } from "react-redux";
import {
  closeCreateDrawer,
  closeEditDrawer,
} from "../../../redux/services/drawer/drawerSlice";

const CustomDrawer = ({
  title,
  placement = "right",
  children,
  open,
  isLoading = false,
  onClose,
}) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleCloseDrawer = () => {
    form.resetFields();
    dispatch(closeCreateDrawer());
    dispatch(closeEditDrawer());
  };

  return (
    <Drawer
      key={title}
      title={title}
      open={open}
      width={800}
      placement={placement}
      closable={true}
      onClose={onClose ?? handleCloseDrawer}
      maskClosable
      destroyOnClose
    >
      <div className="relative w-full h-full ">
        {isLoading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
