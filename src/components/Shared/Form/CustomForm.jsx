import { Button, Form } from "antd";

const CustomForm = ({ handleSubmit, children, fields, isLoading, onClose }) => {
  const [form] = Form.useForm();

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
        <Button type="default" onClick={onClose}>
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
