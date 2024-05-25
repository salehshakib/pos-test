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
    addonAfter,
    tooltip,
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
        tooltip={tooltip}
        noStyle={noStyle}
      >
        {type === "password" ? (
          <Password
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-1 border-2 "
            size="large"
            prefix={prefix}
            style={{
              allowClear: true,
            }}
          />
        ) : type === "select" ? (
          <h1>Use Custom select component</h1>
        ) : type === "textarea" ? (
          <TextArea
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-1 border-2"
            size="large"
            autoSize={{
              minRows: 2,
              maxRows: 5,
            }}
            showCount
            style={{
              allowClear: true,
            }}
          />
        ) : type === "number_with_percent" ? (
          <InputNumber
            type="number"
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-1 border-2 w-full"
            size="large"
            prefix={prefix}
            suffix={"%"}
            min={0}
            max={100}
            // formatter={(value) => `${value}%`}
            // parser={(value) => value?.replace("%", "")}
            style={{
              allowClear: true,
            }}
          />
        ) : type === "phone" ? (
          <InputNumber
            type="number"
            // placeholder={`Enter ${placeholder ?? label}`}
            placeholder="01XXXX123XX"
            className="mt-1 border-2 w-full"
            prefix={prefix ?? "+88"}
            // addonBefore={addonBefore}
            // style={{}}
            suffix={suffix}
            size="large"
            style={{
              allowClear: true,
            }}
          />
        ) : type === "number" ? (
          <InputNumber
            type="number"
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-1 border-2 w-full"
            size="large"
            prefix={prefix}
            suffix={suffix}
            style={{
              allowClear: true,
            }}
          />
        ) : (
          <Input
            type={type}
            placeholder={`Enter ${placeholder ?? label}`}
            className="mt-1 border-2"
            size="large"
            prefix={prefix}
            suffix={suffix}
            addonAfter={addonAfter}
            style={{
              allowClear: true,
            }}
          />
        )}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomInput;
