import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Modal, Popover, Row } from "antd";
import { useState } from "react";
import { FaCashRegister, FaShoppingBasket } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GlobalUtilityStyle } from "../../../container/Styled";
import { fullColLayout, rowLayout } from "../../../layout/FormLayout";
import { logout } from "../../../redux/services/auth/authSlice";
import { setCashRegister } from "../../../redux/services/cashRegister/cashRegisterSlice";
import { useCreatePettyCashMutation } from "../../../redux/services/pettycash/pettyCashApi";
import { WarehouseComponent } from "../../Generator/overview/WarehouseComponent";
import CustomInput from "../../Shared/Input/CustomInput";
import CreateComponent from "./CreateComponent";

const PettyCashOpenComponent = ({ navigate, open, setOpen }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [errorFields, setErrorFields] = useState([]);

  const [createPettyCash, { isLoading }] = useCreatePettyCashMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await createPettyCash({
      data: { ...values, status: "Open" },
    });

    if (data?.success) {
      dispatch(setCashRegister());
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
  };

  return (
    <Modal
      width={600}
      centered
      title={"Cash Register"}
      open={open}
      onCancel={hideModal}
      footer={null}
    >
      <Form
        isLoading={false}
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
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const PosComponent = () => {
  const navigate = useNavigate();
  const { cash } = useSelector((state) => state.cashRegister);
  const [open, setOpen] = useState(false);

  const posRegister = () => {
    if (!cash) {
      setOpen(true);
    } else navigate("/pos");
  };

  return (
    <GlobalUtilityStyle>
      <Button
        icon={<FaShoppingBasket size={18} />}
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

  return (
    <Button
      icon={<FaCashRegister size={18} />}
      className="flex justify-center items-center gap-1 shadow-md"
      onClick={() => navigate("/petty-cash/open")}
      // size="large"
    />
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

  const content = (
    <div className="">
      <Button onClick={handleLogout}>Log Out</Button>
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
