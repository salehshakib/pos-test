import { DatePicker, Form } from "antd";
import { MdDateRange } from "react-icons/md";
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
            className="border-2 mt-1"
            style={{ width: "100%" }}
            format={picker === "year" ? "YYYY" : "YYYY-MM-DD"}
            picker={picker}
            suffixIcon={<MdDateRange color="black" />}
          />
        )}

        {type === "range" && (
          <RangePicker
            picker={picker}
            size={"large"}
            className="border-2 mt-1"
            style={{ width: "100%" }}
            format={picker === "year" ? "YYYY" : "YYYY-MM-DD"}
            suffixIcon={<MdDateRange color="black" />}
          />
        )}
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default CustomDatepicker;
