import { Form } from "antd";

const CustomForm = ({ handleSubmit, children }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      // const values = form.getFieldsValue();
      handleSubmit(values);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="on"
      onFinishFailed={onFinishFailed}
    >
      {children}
    </Form>
  );
};

export default CustomForm;
