import { Checkbox, Form } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";
import { useEffect } from "react";
const { Group } = Checkbox;

const CustomCheckbox = (props) => {
  const {
    label,
    subLabel,
    name,
    required,
    mode = "single",
    options = [],
    defaultValue,
  } = props;

  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("valid_on", defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={mode === "group" && label}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
        valuePropName={mode === "single" && "checked"}
      >
        {mode === "single" && (
          <Checkbox>
            <span>{label}</span>
            <span className="text-sm text-gray-500 px-2">{subLabel}</span>
          </Checkbox>
        )}

        {mode === "group" && <Group options={options} />}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomCheckbox;
