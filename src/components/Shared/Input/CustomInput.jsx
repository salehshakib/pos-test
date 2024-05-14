import { Form, Input, InputNumber } from "antd";
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
    noStyle = false,
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
        noStyle={noStyle}
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
          <Input
            type="number"
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
          <InputNumber
            type="number"
            // placeholder={`Enter ${placeholder ?? label}`}
            placeholder="01XXXX123XX"
            className="mt-2 border-2 w-full"
            prefix={prefix ?? "+880"}
            // addonBefore={addonBefore}
            // style={{}}
            suffix={suffix}
            size="large"
            allowClear
          />
        ) : type === "number" ? (
          <InputNumber
            type="number"
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-2 border-2 w-full"
            size="large"
            prefix={prefix}
            suffix={suffix}
            allowClear
          />
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
