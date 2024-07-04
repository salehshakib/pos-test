import { UserOutlined } from "@ant-design/icons";
import { App, Avatar, Button, Col, Form, Modal, Popover, Row } from "antd";
import { useEffect, useState } from "react";
import { FaCashRegister } from "react-icons/fa";
import { MdPointOfSale } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GlobalUtilityStyle } from "../../../container/Styled";
import { fullColLayout, rowLayout } from "../../../layout/FormLayout";
import { logout, useCurrentUser } from "../../../redux/services/auth/authSlice";
import {
  useCheckPettyCashQuery,
  useCreatePettyCashMutation,
} from "../../../redux/services/pettycash/pettyCashApi";
import {
  clearPettyCash,
  setPettyCash,
} from "../../../redux/services/pettycash/pettyCashSlice";
import createDetailsLayout from "../../../utilities/lib/createDetailsLayout";
import { openNotification } from "../../../utilities/lib/openToaster";
import { CustomDescription } from "../../Shared/Description/CustomDescription";
import CustomInput from "../../Shared/Input/CustomInput";
import CreateComponent from "./CreateComponent";
import { WarehouseComponent } from "../../ReusableComponent/WarehouseComponent";

const PettyCashOpenComponent = ({ navigate, open, setOpen }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [errorFields, setErrorFields] = useState([]);

  const [createPettyCash, { isLoading }] = useCreatePettyCashMutation();

  const warehouseId = Form.useWatch("warehouse_id", form);

  const { data, isFetching } = useCheckPettyCashQuery(
    {
      params: {
        warehouse_id: parseInt(warehouseId),
      },
    },
    {
      skip: !warehouseId,
    }
  );

  useEffect(() => {
    if (data?.data === "Open") {
      dispatch(setPettyCash({ data: data?.data }));

      navigate("/pos");
    } else if (data?.data === "Close") {
      dispatch(setPettyCash({ data: data?.data }));

      openNotification(
        "warning",
        "No cash register found. Open a new cash register"
      );
    }
  }, [data, dispatch, message, navigate]);

  const handleSubmit = async (values) => {
    const { data, error } = await createPettyCash({
      data: { ...values, status: "Open" },
    });

    if (data?.success) {
      dispatch(setPettyCash({ data: data?.data.status }));
      hideModal();

      form.resetFields();
      navigate("/pos");
    }

    if (error) {
      const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
        name: fieldName,
        errors: error?.data?.errors[fieldName],
      }));
      setErrorFields(errorFields);
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
            <WarehouseComponent />
          </Col>

          {data?.data === "Close" && (
            <Col {...fullColLayout}>
              <CustomInput
                label="Opening Balance"
                type="number"
                name="opening_balance"
                required={true}
              />
            </Col>
          )}
        </Row>
        <div className={`w-full flex gap-3 justify-end items-center pt-5`}>
          <Button type="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading || isFetching}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const PosComponent = () => {
  const navigate = useNavigate();
  const { pettyCash } = useSelector((state) => state.pettyCash);

  const [open, setOpen] = useState(false);

  // //console.log(pettyCash);

  const posRegister = () => {
    if (pettyCash === "Close") {
      setOpen(true);
    } else navigate("/pos");
  };

  return (
    <GlobalUtilityStyle>
      <Button
        icon={<MdPointOfSale size={18} />}
        className="flex justify-center items-center gap-1 shadow-md"
        // size="large"
        onClick={posRegister}
      >
        POS
      </Button>

      <PettyCashOpenComponent
        navigate={navigate}
        open={open}
        setOpen={setOpen}
      />
    </GlobalUtilityStyle>
  );
};

const CashRegisterComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;

  const { pettyCash } = useSelector((state) => state.pettyCash);
  // const { register } = useSelector((state) => state.cashRegister);

  const [createPettyCash, { isLoading }] = useCreatePettyCashMutation();

  const [open, setOpen] = useState(false);

  const handleCashRegister = () => {
    if (pathname.includes("/pos")) {
      setOpen(true);
      return;
    }

    navigate("/petty-cash");
  };

  const closeCashRegister = async () => {
    const { data } = await createPettyCash({
      data: { warehouse_id: 4, status: "Close" },
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

  const details = createDetailsLayout(pettyCash);

  return (
    <>
      <Button
        icon={<FaCashRegister size={18} />}
        className="flex justify-center items-center gap-1 shadow-md"
        onClick={handleCashRegister}
      />

      <Modal
        width={800}
        centered
        open={open}
        onCancel={hideModal}
        footer={null}
      >
        <CustomDescription title={"Cash Register"} items={details} />

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
      </Modal>
    </>
  );
};

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { pathname } = location;

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!", { duration: 2000 });
  };

  const user = useSelector(useCurrentUser);

  const content = (
    <div className="">
      <div className="flex gap-2 items-center text-xl">
        <span className="font-semibold">Name:</span> {user?.employees?.name}
      </div>
      <div className="flex gap-2 items-center text-[16px]">
        <span className="font-semibold">Email:</span> {user?.employees?.email}
      </div>
      <hr className="my-2" />
      <div className="text-lg">User Profile</div>
      <hr className="my-2" />
      <div className="flex w-full justify-end">
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </div>
  );

  return (
    <div className=" flex justify-center items-center gap-3">
      <CreateComponent />
      {!pathname.includes("/pos") && (
        <>
          <PosComponent />
        </>
      )}

      <CashRegisterComponent />

      <Popover
        placement="bottomLeft"
        content={content}
        className="hover:cursor-pointer"
        trigger={"click"}
        overlayStyle={{ width: "auto" }}
      >
        <Avatar
          className="avatar-bg shadow-md hover:shadow-lg"
          size={40}
          icon={<UserOutlined />}
        />
      </Popover>
    </div>
    // <div></div>
  );
};

export default Profile;
