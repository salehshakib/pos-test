import { Col, Divider, Form, Radio, Row } from 'antd';

import { barcodeOptions } from '../../../assets/data/barcode';
import {
  largeLayout,
  mdColLayout,
  rowLayout,
} from '../../../layout/FormLayout';
import CustomCheckbox from '../../Shared/Checkbox/CustomCheckbox';
import CustomInput from '../../Shared/Input/CustomInput';
import CustomSelect from '../../Shared/Select/CustomSelect';

const CustomInvoiceForm = ({ name, label }) => {
  const form = Form.useFormInstance();
  const data = Form.useWatch(name, form);
  return (
    <>
      <Col {...mdColLayout}>
        <CustomInput
          name={name}
          placeholder={label}
          type={'textarea'}
          maxlength={15}
          minLength={30}
        />
      </Col>
      <Col {...mdColLayout}>
        <div className="flex items-center justify-center rounded-md border-2">
          <div
            className="h-[42.5rem] overflow-auto"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        </div>
      </Col>
    </>
  );
};

const options = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Combo', label: 'Combo' },
  { value: 'Service', label: 'Service' },
];

const PosSettingComponent = ({ a4_invoice, thermal_invoice }) => {
  return (
    <Row {...rowLayout}>
      <Divider orientation="left" orientationMargin={0}>
        Invoice Type
      </Divider>
      <Col {...mdColLayout}>
        <Form.Item label="Invoice of Pos" name={'invoice_of_pos'} required>
          <Radio.Group>
            <Radio value="A4">A4</Radio>
            <Radio value="Thermal">Thermal</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col {...mdColLayout}>
        <Form.Item
          label="Invoice of Inventory"
          name={'invoice_of_inventory'}
          required
        >
          <Radio.Group>
            <Radio value="A4">A4</Radio>
            <Radio value="Thermal">Thermal</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Divider orientation="left" orientationMargin={0}>
        POS Product
      </Divider>

      <Col {...mdColLayout}>
        <CustomSelect
          label="Product Type"
          required={true}
          options={options}
          name={'product_type'}
          mode="multiple"
        />
      </Col>

      <Col {...mdColLayout}>
        <CustomSelect
          label="Barcode Symbology"
          options={barcodeOptions}
          required={true}
          name={'symbology'}
        />
      </Col>

      <Divider orientation="left" orientationMargin={0}>
        Payment Types
      </Divider>

      <Col {...largeLayout}>
        <CustomCheckbox name="cash_payment" label={'Cash Payment'} />
      </Col>
      <Col {...largeLayout}>
        <CustomCheckbox name="card_payment" label={'Card Payment'} />
      </Col>
      <Col {...largeLayout}>
        <CustomCheckbox name="cheque_payment" label={'Cheque Payment'} />
      </Col>
      <Col {...largeLayout}>
        <CustomCheckbox name="gift_card_payment" label={'Gift Card Payment'} />
      </Col>

      <Divider orientation="left" orientationMargin={0}>
        Pos Features
      </Divider>

      <Col {...largeLayout}>
        <CustomCheckbox name="is_send_email" label={'Send Email'} />
      </Col>
      <Col {...largeLayout}>
        <CustomCheckbox name="need_keyboard" label={'On Screen Keyboard'} />
      </Col>

      <Divider orientation="left" orientationMargin={0}>
        A4 Invoice Format
      </Divider>

      <CustomInvoiceForm
        name="a4_invoice"
        label={'A4 Invoice Format'}
        initialData={a4_invoice}
      />

      <Divider orientation="left" orientationMargin={0}>
        Thermal Invoice Format
      </Divider>

      <CustomInvoiceForm
        name="thermal_invoice"
        label={'Thermal Invoice Format'}
        initialData={thermal_invoice}
      />
    </Row>
  );
};

export default PosSettingComponent;
