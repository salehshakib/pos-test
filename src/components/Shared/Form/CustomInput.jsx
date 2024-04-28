import { Form, Input, InputNumber, Select } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomInput = ({
  type,
  name,
  label,
  placeholder,
  required = false,
  prefix,
  options = [],
  isSelectLoading = false,
}) => {
  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
      >
        {(type === "password" && (
          <Input.Password
            placeholder={placeholder}
            className="mt-2 border-2 "
            size="large"
            prefix={prefix}
            allowClear
          />
        )) ||
          (type === "select" && (
            <Select
              placeholder={placeholder}
              className="mt-2 custom-selector"
              size="large"
              loading={isSelectLoading}
              options={options}
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
              size="large"
              prefix={prefix}
              allowClear
            />
          )}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomInput;
