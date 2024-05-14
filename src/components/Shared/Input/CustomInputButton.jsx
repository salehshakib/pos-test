import { Button, Form, Input, Space } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomInputButton = (props) => {
  const {
    type,
    name,
    label,
    placeholder,
    required = false,
    requireMsg = undefined,
    onClick,
    icon,
  } = props;

  return (
    <GlobalUtilityStyle>
      <Form.Item label={label} required={required}>
        <Space.Compact style={{ width: "100%" }}>
          <Form.Item
            // label={label}
            name={name}
            rules={[
              {
                required: required,
                message: `Please input ${requireMsg ?? label}!`,
              },
            ]}
            noStyle
          >
            <Input
              type={type}
              placeholder={`Enter ${placeholder ?? label}`}
              className="mt-2 border-2"
              size="large"
              allowClear
            />
          </Form.Item>
          <Button
            onClick={onClick}
            icon={icon}
            className="border-2 mt-2"
            size="large"
          />
        </Space.Compact>
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomInputButton;
