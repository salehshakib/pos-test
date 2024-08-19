import { Col, Form, Radio, Row } from "antd";
import {
  fullColLayout,
  largeLayout,
  mdColLayout,
  rowLayout,
} from "../../../layout/FormLayout";
import CustomCheckbox from "../../Shared/Checkbox/CustomCheckbox";
import CustomInput from "../../Shared/Input/CustomInput";
import Ckeditor from "../../Shared/TextEditor/Ckeditor";

const CustomInvoiceForm = ({ name, label }) => {
  const form = Form.useFormInstance();
  const data = Form.useWatch(name, form);
  return (
    <>
      <Col {...mdColLayout}>
        <CustomInput
          name={name}
          label={label}
          type={"textarea"}
          maxlength={30}
        />
      </Col>
      <Col {...mdColLayout}>
        <div className="border-2 rounded-md mt-8 h-[42.5rem] overflow-auto flex justify-center items-center">
          <div
            dangerouslySetInnerHTML={{ __html: data }}
            // className="w-[90%] border"
          />
        </div>
      </Col>
    </>
  );
};

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

      {/* <Col {...mdColLayout}>
        <Form.Item label="A4 Invoice Type" name={"a4_invoice_type"}>
          <Radio.Group>
            <Radio value="rich">Rich Text Editor</Radio>
            <Radio value="raw">Raw Code</Radio>
          </Radio.Group>
        </Form.Item>
      </Col> */}

      <CustomInvoiceForm
        name="a4_invoice"
        label="A4 Invoice"
        initialData={a4_invoice}
      />

      {/* <Col {...mdColLayout}>
        <Form.Item label="Thermal Invoice Type" name={"thermal_invoice_type"}>
          <Radio.Group>
            <Radio value="rich">Rich Text Editor</Radio>
            <Radio value="raw">Raw Code</Radio>
          </Radio.Group>
        </Form.Item>
      </Col> */}

      <CustomInvoiceForm
        label="Thermal Invoice"
        name="thermal_invoice"
        initialData={thermal_invoice}
      />

      {/* <Col {...fullColLayout}>
        <Ckeditor />
      </Col> */}

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
