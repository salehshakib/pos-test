import { Form, Input, InputNumber, Space } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";
const { TextArea, Password } = Input;

const CustomInput = (props) => {
  const {
    type,
    name,
    label,
    placeholder,
    required = false,
    prefix,
    suffix,
    requireMsg = undefined,
  } = props;

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[
          {
            required: required,
            message: `Please input ${requireMsg ?? label}!`,
          },
        ]}
      >
        {type === "password" ? (
          <Password
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-2 border-2 "
            size="large"
            prefix={prefix}
            allowClear
          />
        ) : type === "select" ? (
          <h1>Use Custom select component</h1>
        ) : type === "textarea" ? (
          <TextArea
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-2 border-2"
            size="large"
            autoSize={{
              minRows: 2,
              maxRows: 5,
            }}
            showCount
            allowClear
          />
        ) : type === "number_with_percent" ? (
          <InputNumber
            type={type}
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-2 border-2 w-full"
            size="large"
            prefix={prefix}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value?.replace("%", "")}
            allowClear
          />
        ) : type === "phone" ? (
          <Space>
            <Space.Compact size="large">
              <Input
                value={"+880"}
                size="large"
                className="mt-2 border-2"
                style={{
                  width: "40%",
                }}
              />
              <InputNumber
                type="number"
                placeholder={`Enter ${placeholder ?? label}`}
                className="mt-2 border-2 w-full"
                size="large"
                prefix={prefix}
                suffix={suffix}
                allowClear
              />
            </Space.Compact>
          </Space>
        ) : (
          <Input
            type={type}
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-2 border-2"
            size="large"
            prefix={prefix}
            suffix={suffix}
            allowClear
          />
        )}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomInput;
