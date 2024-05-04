import { Col, Divider, Form, Radio, Row } from "antd";
import invoiceFormats from "../../../assets/data/invoiceFormats.json";
import CustomInput from "../../Shared/Form/CustomInput";

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
          <CustomInput
            name={"invoice_format"}
            label={"Invoice Format"}
            type={"select"}
            options={invoiceFormatOptions}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            name={"staff_access"}
            label={"Staff Access"}
            type={"select"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <Form.Item label="Sale and Quotion Without Stock" name={"sqws"}>
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default StaffSetting;
