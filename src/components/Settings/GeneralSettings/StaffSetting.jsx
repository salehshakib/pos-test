import { Col, Divider, Form, Radio, Row } from "antd";
import invoiceFormats from "../../../assets/data/invoiceFormats.json";
import CustomInput from "../../Shared/Input/CustomInput";
import CustomSelect from "../../Shared/Select/CustomSelect";

const rowLayout = {
  gutter: 25,
  align: "middle",
  justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
  lg: 8,
};

const StaffSetting = () => {
  const invoiceFormatOptions = invoiceFormats.invoiceFormats.map(
    ({ id, name }) => {
      return { label: name, value: id };
    }
  );
  return (
    <div>
      <Divider orientation="left" orientationMargin={0}>
        Staff Settings
      </Divider>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomSelect
            name={"invoice_format"}
            label={"Invoice Format"}
            options={invoiceFormatOptions}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomSelect
            name={"staff_access"}
            label={"Staff Access"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <Form.Item label="Sale and Quotion Without Stock" name={"sqws"}>
            <Radio.Group>
              <Radio value="1">Yes</Radio>
              <Radio value="0">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default StaffSetting;
