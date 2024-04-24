import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import {
  closeCreateDrawer,
  closeEditDrawer,
} from "../../../redux/services/global/globalSlice";

const CustomForm = ({ handleSubmit, children, fields, isLoading }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => {
        handleSubmit(values);
      })
      .catch((error) => {
        console.error("Validation error:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const handleDrawerClose = () => {
    dispatch(closeCreateDrawer());
    dispatch(closeEditDrawer());
  };

  return (
    <Form
      form={form}
      fields={fields}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="on"
      onFinishFailed={onFinishFailed}
    >
      {children}

      <div className="w-full flex gap-3 justify-end items-center">
        <Button type="default" onClick={handleDrawerClose}>
          Cancel
        </Button>
        <Button
          htmlType="submit"
          className="bg-secondary hover:bg-posPurple text-white"
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default CustomForm;
