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
import { logout } from "../../../redux/services/auth/authSlice";
import {
  clearCashRegister,
  setCashRegister,
} from "../../../redux/services/cashRegister/cashRegisterSlice";
import {
  useCheckPettyCashQuery,
  useCreatePettyCashMutation,
} from "../../../redux/services/pettycash/pettyCashApi";
import {
  clearPettyCash,
  setPettyCash,
} from "../../../redux/services/pettycash/pettyCashSlice";
import createDetailsLayout from "../../../utilities/lib/createDetailsLayout";
import { WarehouseComponent } from "../../Generator/overview/WarehouseComponent";
import { CustomDescription } from "../../Shared/Description/CustomDescription";
import CustomInput from "../../Shared/Input/CustomInput";
import CreateComponent from "./CreateComponent";

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
      navigate("/pos");
    } else if (data?.data === "Close") {
      message.info("No cash register found. Open a new cash register");
    }
  }, [data, message, navigate]);

  const handleSubmit = async (values) => {
    // setWarehouseId(values.warehouse_id)
    const { data, error } = await createPettyCash({
      data: { ...values, status: "Open" },
    });

    if (data?.success) {
      dispatch(setCashRegister());
      dispatch(setPettyCash({ data: data?.data }));
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
          {/* {isFetching && (
            <Spin className="w-full justify-center flex items-center" />
          )} */}
          {!isFetching && data && (
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
  const { register } = useSelector((state) => state.cashRegister);
  const [open, setOpen] = useState(false);

  const posRegister = () => {
    if (!register) {
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
  const { register } = useSelector((state) => state.cashRegister);

  // const [updateGiftCard, { isLoading }] = useUpdatePettyCashMutation();

  console.log(pettyCash, register);

  const [open, setOpen] = useState(false);

  const handleCashRegister = () => {
    if (pathname.includes("/pos")) {
      setOpen(true);
      return;
    }

    navigate("/petty-cash");
  };

  const closeCashRegister = async () => {
    // const { data, error } = await updateGiftCard({
    //   data: { pettyCash.id, ...values },
    // });
    dispatch(clearPettyCash());
    dispatch(clearCashRegister());
    navigate("/dashboard");

    hideModal();
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
        // size="large"
      />

      <Modal
        width={800}
        centered
        // title={"Cash Register Close"}
        open={open}
        onCancel={hideModal}
        footer={null}
      >
        <CustomDescription title={"Cash Register Details"} items={details} />

        <div className={`w-full flex gap-3 justify-end items-center pt-5`}>
          <Button
            htmlType="button"
            onClick={closeCashRegister}
            type="primary"
            // loading={isLoading}
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
