import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Form,
  Modal,
  Popover,
  Row,
  theme,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { FaBell, FaCashRegister } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdPointOfSale } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalUtilityStyle } from "../../../container/Styled";
import { fullColLayout, rowLayout } from "../../../layout/FormLayout";
import { logout, useCurrentUser } from "../../../redux/services/auth/authSlice";
import { useGetAllNotificationQuery } from "../../../redux/services/notification/notificationApi";
import {
  useCheckPettyCashQuery,
  useCreatePettyCashMutation,
  useUpdatePettyCashMutation,
} from "../../../redux/services/pettycash/pettyCashApi";
import {
  clearPettyCash,
  setPettyCash,
} from "../../../redux/services/pettycash/pettyCashSlice";
import { categorizeNotifications } from "../../../utilities/lib/notification/notificationData";
import { openNotification } from "../../../utilities/lib/openToaster";
import NotificationComponent from "../../Notification/Notification";
import CustomInput from "../../Shared/Input/CustomInput";

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { pathname } = location;

  const handleLogout = () => {
    openNotification("success", "Logged out successfully!");
    dispatch(logout());
  };

  const user = useSelector(useCurrentUser);

  const { token } = theme.useToken();
  const navigate = useNavigate();

  const content = (
    <div>
      <div className="">
        <div className="py-3 rounded-md px-2">
          <div className="flex gap-4 items-center text-lg">
            <Avatar
              className="avatar-bg shadow-md hover:shadow-lg"
              size={44}
              icon={<UserOutlined />}
            />
            <div className="flex flex-col font-normal">
              <span className="font-bold">{user?.employees?.name}</span>
              <span
                className={`text-sm `}
                style={{
                  color: token.colorPrimary,
                }}
              >
                {user?.employees?.email}
              </span>
            </div>
          </div>
        </div>

        <div className="py-2 px-4 bg-[#F5F5F5] rounded-md">
          <div
            className="flex gap-2 items-center text-lg  hover:underline profile-ul w-max"
            onClick={() => navigate("/settings/general-settings")}
          >
            <IoSettingsOutline size={18} />
            <div className="flex flex-col font-semibold text-[15px]">
              <span className="">General Settings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end pt-3">
        <Button onClick={handleLogout} className={`w-full`} size="large">
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className=" flex justify-center items-center gap-2">
      {/* <CreateComponent /> */}
      {!pathname.includes("/pos") && <PosComponent />}

      <CloseCashRegister />

      <Notification />

      <Popover
        placement="bottomLeft"
        content={content}
        className="hover:cursor-pointer"
        trigger={"click"}
        overlayStyle={{ width: "auto" }}
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
    </div>
  );
};

const PosComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pettyCash } = useSelector((state) => state.pettyCash);
  const user = useSelector(useCurrentUser);

  const { data: pettyCashData } = useCheckPettyCashQuery(
    {
      params: {
        warehouse_id: parseInt(user?.warehouse_id),
      },
    },
    {
      skip: !user?.warehouse_id,
    }
  );

  useEffect(() => {
    if (pettyCashData?.data) {
      if (pettyCashData?.data?.status === "Open") {
        console.log("first");
        dispatch(setPettyCash({ status: "Open", id: pettyCashData?.data?.id }));
      } else if (
        pettyCashData?.data?.status === "Close" &&
        !pettyCashData?.data?.id
      ) {
        dispatch(setPettyCash({ status: "Close", id: undefined }));
      } else {
        dispatch(clearPettyCash());
      }
    }
  }, [pettyCashData?.data, dispatch, pettyCash?.data?.status]);

  const [open, setOpen] = useState(false);

  const posRegister = () => {
    if (pettyCash === "Close") {
      setOpen(true);
    } else navigate("/pos");
  };

  return (
    <GlobalUtilityStyle>
      <Tooltip title="POS">
        <Button
          icon={<MdPointOfSale size={18} />}
          className="flex justify-center items-center gap-1 shadow-sm"
          onClick={posRegister}
        >
          POS
        </Button>
      </Tooltip>

      <PettyCashOpenComponent
        navigate={navigate}
        open={open}
        setOpen={setOpen}
      />
    </GlobalUtilityStyle>
  );
};

const CloseCashRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = theme.useToken();
  const { pathname } = location;

  const [updatePettyCash, { isLoading }] = useUpdatePettyCashMutation();

  const [open, setOpen] = useState(false);

  const { pettyCashId } = useSelector((state) => state.pettyCash);

  const handleCashRegister = () => {
    if (pathname.includes("/pos")) {
      setOpen(true);
      return;
    }

    navigate("/petty-cash");
  };

  const user = useSelector(useCurrentUser);

  const closeCashRegister = async () => {
    const { data } = await updatePettyCash({
      id: pettyCashId,
      data: {
        warehouse_id: user?.warehouse_id,
        status: "Close",
        _method: "PUT",
      },
    });

    if (data?.success) {
      dispatch(clearPettyCash());

      hideModal();
      navigate("/dashboard");
    }
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleCashRegister}
        className="flex justify-center items-center"
      >
        <Tooltip title="Petty Cash">
          <FaCashRegister
            size={16}
            style={{
              color: token.colorPrimary,
            }}
            className="hover:cursor-pointer hover:shadow-lg"
          />
        </Tooltip>
      </Button>

      <Modal
        title={
          <div className="flex items-center gap-3">
            <RiErrorWarningFill
              style={{
                color: "red",
                fontSize: "20px",
              }}
            />
            <span>Close Cash Register</span>
          </div>
        }
        width={600}
        centered
        open={open}
        onCancel={hideModal}
        footer={null}
      >
        <GlobalUtilityStyle>
          <span className="text-[16px]">
            {" "}
            Are you sure you want to close cash register?
          </span>
          <div className={`w-full flex gap-3 justify-end items-center pt-5`}>
            <Button
              htmlType="button"
              onClick={closeCashRegister}
              type="primary"
              loading={isLoading}
            >
              Close
            </Button>
          </div>
        </GlobalUtilityStyle>
      </Modal>
    </>
  );
};

const PettyCashOpenComponent = ({ navigate, open, setOpen }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);

  const { pettyCashId } = useSelector((state) => state.pettyCash);

  const [createPettyCash, { isLoading }] = useCreatePettyCashMutation();

  const [updatePettyCash, { isLoading: isUpdating }] =
    useUpdatePettyCashMutation();

  const user = useSelector(useCurrentUser);

  const handleSubmit = async (values) => {
    if (pettyCashId) {
      const { data, error } = await updatePettyCash({
        id: pettyCashId,
        data: {
          warehouse_id: user?.warehouse_id,
          status: "Open",
          _method: "PUT",
        },
      });

      if (data?.success) {
        dispatch(setPettyCash({ status: "Open", id: data?.data?.id }));
        hideModal();
        form.resetFields();
        navigate("/pos");
      }

      if (error) {
        const errorFields = Object.keys(error?.data?.errors).map(
          (fieldName) => ({
            name: fieldName,
            errors: error?.data?.errors[fieldName],
          })
        );
        setErrorFields(errorFields);
      }
    } else {
      const { data, error } = await createPettyCash({
        data: { ...values, warehouse_id: user?.warehouse_id, status: "Open" },
      });

      if (data?.success) {
        dispatch(setPettyCash({ status: "Open", id: data?.data?.id }));
        hideModal();
        form.resetFields();
        navigate("/pos");
      }

      if (error) {
        const errorFields = Object.keys(error?.data?.errors).map(
          (fieldName) => ({
            name: fieldName,
            errors: error?.data?.errors[fieldName],
          })
        );
        setErrorFields(errorFields);
      }
    }
  };

  const hideModal = () => {
    setOpen(false);
    form.resetFields();
  };

  if (!open) {
    return null;
  }

  return (
    <Modal
      width={600}
      centered
      title={"Cash Register Open"}
      open={open}
      onCancel={hideModal}
      footer={null}
    >
      <Form
        fields={errorFields}
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Row {...rowLayout} className="mt-5">
          <Col {...fullColLayout}>
            <CustomInput
              label="Opening Balance"
              type="number"
              name="opening_balance"
              required={true}
            />
          </Col>
        </Row>
        <div className={`w-full flex gap-3 justify-end items-center pt-5`}>
          <Button type="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading || isUpdating}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const Notification = () => {
  const [show, setShow] = useState(false);
  const { token } = theme.useToken();
  const { pathname } = useLocation();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const user = useSelector(useCurrentUser);
  const warehouseId = user?.warehouse_id;

  const { data, refetch, isLoading } = useGetAllNotificationQuery({
    id: warehouseId,
  });

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  useEffect(() => {
    if (data?.length === 0) {
      setShow(false);
    } else if (data?.length > 0) {
      setShow(true);
    }
  }, [data]);

  // const [readNotification] = useReadNotificationMutation();
  // const { data } = await readNotification({ id });

  const navigate = useNavigate();

  const { unreadNotifications } = categorizeNotifications(data);

  const onClose = () => {
    setIsPopoverOpen(false);
  };

  const handleReadNotification = async (item) => {
    if (item?.data?.stock_request_id) {
      navigate("/inventory/stock-request", {
        state: {
          id: item?.data?.stock_request_id,
          status: item?.read_at === null ? "unread" : "read",
        },
      });
      onClose();
    }
  };

  const handleNotification = () => {
    setIsPopoverOpen(true);
    handleReadNotification();
  };

  const [selected, setSelected] = useState("All");

  const selectedStyleProps = {
    color: "#005FC6",
    backgroundColor: "#DFE9F2",
  };

  const title = () => {
    return (
      <div className="space-y-2">
        <div className="text-start font-bold text-[1.4rem]">Notifications</div>
        <div className="flex items-center gap-2 text-sm">
          <span
            style={selected === "All" ? selectedStyleProps : {}}
            className={`${selected === "Unread" ? "cursor-pointer hover:bg-[#f5f5f5]" : "cursor-default"} duration-300 px-4 py-1 rounded-full`}
            onClick={() => setSelected("All")}
          >
            All
          </span>
          <span
            style={selected === "Unread" ? selectedStyleProps : {}}
            className={`${selected === "All" ? "cursor-pointer hover:bg-[#f5f5f5]" : "cursor-default"} duration-300 px-4 py-1 rounded-full`}
            onClick={() => setSelected("Unread")}
          >
            Unread
          </span>
        </div>
      </div>
    );
  };

  return (
    <Popover
      content={
        <NotificationComponent
          data={selected === "All" ? data : unreadNotifications}
          handleReadNotification={handleReadNotification}
          loading={isLoading}
        />
      }
      title={title}
      trigger="click"
      placement="bottomRight"
      overlayClassName="rounded-md shadow-xl "
      overlayStyle={{ width: 330 }}
      overlayInnerStyle={{
        maxHeight: "85vh",
        overflowY: "auto",
        padding: "15px",
        paddingTop: "12px",
      }}
      onOpenChange={onClose}
      open={isPopoverOpen}
      arrow={false}
    >
      <Button
        onClick={handleNotification}
        className="flex justify-center items-center"
      >
        <Tooltip title="Notifications">
          <Badge dot={show}>
            <FaBell
              size={16}
              style={{
                color: token.colorPrimary,
              }}
              className="hover:cursor-pointer "
            />
          </Badge>
        </Tooltip>
      </Button>
    </Popover>
  );
};

export default Profile;
