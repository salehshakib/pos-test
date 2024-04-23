import { Form } from "antd";

const CustomForm = ({ handleSubmit, children, fields }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    form
      .validateFields()
      .then(() => {
        console.log(values);
        handleSubmit(values);
      })
      .catch((error) => {
        console.error("Validation error:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
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
    </Form>
  );
};

export default CustomForm;
