import { Form, Input } from "antd";

const CustomInput = ({ type, name, label, placeholder, required = false }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: required, message: `Please input ${label}!` }]}
    >
      {(type === "password" && (
        <Input.Password
          placeholder={placeholder}
          className="mt-2 border-2"
          size="large"
          allowClear
        />
      )) ||
        (type === "textarea" && (
          <Input.TextArea
            placeholder={placeholder}
            className="mt-2 border-2"
            size="large"
            allowClear
          />
        )) || (
          <Input
            type={type}
            placeholder={`Enter ${placeholder}`}
            className="mt-2 border-2"
            // size="large"
            allowClear
          />
        )}
    </Form.Item>
  );
};

export default CustomInput;
