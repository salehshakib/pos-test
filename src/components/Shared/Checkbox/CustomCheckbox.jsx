import { Checkbox, Form } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomCheckbox = ({ label, subLabel, name, required }) => {
  return (
    <GlobalUtilityStyle>
      <Form.Item
        // label={label}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
      >
        <Checkbox>
          <span>{label}</span>
          <span className="text-sm text-gray-500 px-2">{subLabel}</span>
        </Checkbox>
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomCheckbox;
