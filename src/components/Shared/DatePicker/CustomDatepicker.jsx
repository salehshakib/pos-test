import { DatePicker, Form } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const { RangePicker } = DatePicker;

const CustomDatepicker = ({ label, required, picker, type = "date", name }) => {
  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
      >
        {type === "date" && (
          <DatePicker
            size={"large"}
            className="border-2 mt-2"
            style={{ width: "100%" }}
            picker={picker}
          />
        )}

        {type === "range" && (
          <RangePicker
            picker={picker}
            size={"large"}
            className="border-2 mt-2"
            style={{ width: "100%" }}
          />
        )}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomDatepicker;
