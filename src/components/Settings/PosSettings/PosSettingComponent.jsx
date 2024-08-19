import { Col, Form, Radio, Row } from "antd";
import {
  fullColLayout,
  largeLayout,
  mdColLayout,
  rowLayout,
} from "../../../layout/FormLayout";
import CustomCheckbox from "../../Shared/Checkbox/CustomCheckbox";
import Ckeditor from "../../Shared/TextEditor/Ckeditor";

const PosSettingComponent = ({ a4_invoice, thermal_invoice }) => {
  return (
    <Row {...rowLayout}>
      <Col {...mdColLayout}>
        <Form.Item label="Invoice of Pos" name={"invoice_of_pos"} required>
          <Radio.Group>
            <Radio value="A4">A4</Radio>
            <Radio value="Thermal">Thermal</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col {...mdColLayout}>
        <Form.Item
          label="Invoice of Inventory"
          name={"invoice_of_inventory"}
          required
        >
          <Radio.Group>
            <Radio value="A4">A4</Radio>
            <Radio value="Thermal">Thermal</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col {...fullColLayout}>
        <Ckeditor
          label="A4 Invoice"
          name="a4_invoice"
          initialData={a4_invoice}
        />
      </Col>
      <Col {...fullColLayout}>
        <Ckeditor
          label="Thermal Invoice"
          name="thermal_invoice"
          initialData={thermal_invoice}
        />
      </Col>

      <Col {...largeLayout}>
        <CustomCheckbox name="cash_payment" label={"Cash Payment"} />
      </Col>
      <Col {...largeLayout}>
        <CustomCheckbox name="card_payment" label={"Card Payment"} />
      </Col>
      <Col {...largeLayout}>
        <CustomCheckbox name="cheque_payment" label={"Cheque Payment"} />
      </Col>
      <Col {...largeLayout}>
        <CustomCheckbox name="gift_card_payment" label={"Gift Card Payment"} />
      </Col>

      <Col {...largeLayout}>
        <CustomCheckbox name="is_send_email" label={"Send Email"} />
      </Col>
      <Col {...largeLayout}>
        <CustomCheckbox name="need_keyboard" label={"On Screen Keyboard"} />
      </Col>
    </Row>
  );
};

export default PosSettingComponent;
