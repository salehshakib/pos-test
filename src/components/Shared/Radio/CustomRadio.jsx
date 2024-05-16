import { Form, Radio } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const CustomRadio = ({ label, required, name }) => {
  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
      >
        <Radio.Group>
          <Radio value="1">Yes</Radio>
          <Radio value="0">No</Radio>
        </Radio.Group>
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomRadio;
