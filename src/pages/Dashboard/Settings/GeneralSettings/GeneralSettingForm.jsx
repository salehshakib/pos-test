import { generate, presetPalettes } from "@ant-design/colors";
import { Col, ColorPicker, Divider, Form, Radio, Row, theme } from "antd";
import { currencies } from "currencies.json";
import { useDispatch } from "react-redux";
import timezones from "timezones.json";
import dateFormats from "../../../../assets/data/dateFormats.json";
import invoiceFormats from "../../../../assets/data/invoiceFormats.json";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";
import CustomLogoUploader from "../../../../components/Shared/Form/CustomLogoUploader";
import {
  setPrimaryColor,
  setSecondaryColor,
} from "../../../../redux/services/theme/themeSlice";

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
const colorColLayout = {
  xs: 12,
  // lg: 8,
};

const colLayout2 = {
  xs: 24,
  md: 12,
};

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));

const customPanelRender = (_, { components: { Picker, Presets } }) => (
  <Row justify="space-between" wrap={false}>
    <Col span={12}>
      <Picker />
    </Col>
    <Divider
      type="vertical"
      style={{
        height: "auto",
      }}
    />
    <Col flex="auto">
      <Presets />
    </Col>
  </Row>
);

const GeneralSettingForm = () => {
  const dispatch = useDispatch();
  //colors
  const { token } = theme.useToken();
  const presets = genPresets({
    Primary: generate(token.colorPrimary),
    Secondary: generate(token.secondaryColor),
  });

  const timezone = timezones.map(({ text }) => {
    return { label: text, value: text };
  });

  const dateFormatOptions = dateFormats.formats.map((item) => {
    return { label: item, value: item };
  });

  const invoiceFormatOptions = invoiceFormats.invoiceFormats.map(
    ({ id, name }) => {
      return { label: name, value: id };
    }
  );

  const currenciesOptions = currencies.map(({ name, symbol, code }) => {
    return { label: `${name} (${symbol})`, value: code };
  });

  const handlePrimaryColor = (color) => {
    dispatch(setPrimaryColor(color.toHexString()));
  };

  const handleSecondaryColor = (color) => {
    dispatch(setSecondaryColor(color.toHexString()));
  };

  return (
    <CustomForm
      // handleSubmit={handleSubmit}
      submitBtnText="Update"

      // fields={fields}
      // isLoading={isLoading}
    >
      <CustomLogoUploader />

      <Row {...rowLayout} className="">
        <Col {...colorColLayout}>
          <Form.Item
            label="Base Color"
            name={"base_color"}
            initialValue={token.colorPrimary}
          >
            <ColorPicker
              styles={{
                popupOverlayInner: {
                  width: 480,
                },
              }}
              presets={presets}
              panelRender={customPanelRender}
              size="large"
              showText
              onChangeComplete={handlePrimaryColor}
              format="hex"
            />
          </Form.Item>
        </Col>
        <Col {...colorColLayout}>
          <Form.Item
            label="Secondary Color"
            name={"secondary_color"}
            initialValue={token.secondaryColor}
          >
            <ColorPicker
              styles={{
                popupOverlayInner: {
                  width: 480,
                },
              }}
              presets={presets}
              panelRender={customPanelRender}
              size="large"
              showText
              onChangeComplete={handleSecondaryColor}
              format="hex"
            />
          </Form.Item>
        </Col>

        <Col {...colLayout}>
          <CustomInput
            label={"System Title"}
            type={"text"}
            required={true}
            name={"systemTitle"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            name={"companyName"}
            label={"Company Name"}
            type={"text"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            // name={"companyName"}
            label={"Vat Registration Number"}
            type={"text"}
            required={true}
          />
        </Col>

        <Col {...colLayout2}>
          <CustomInput
            // name={"companyName"}
            label={"Time Zone"}
            type={"select"}
            options={timezone}
            required={true}
          />
        </Col>
        <Col {...colLayout2}>
          <CustomInput
            // name={"companyName"}
            label={"Date Format"}
            type={"select"}
            options={dateFormatOptions}
            required={true}
          />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            // name={"companyName"}
            label={"Currency"}
            type={"select"}
            options={currenciesOptions}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            // name={"companyName"}
            label={"Digits After Decimal Point"}
            type={"text"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <Form.Item label="Currency Position" name={"currentPosittion"}>
            <Radio.Group>
              <Radio value="preifx">Prefix</Radio>
              <Radio value="suffix">Suffix</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...colLayout}>
          <CustomInput
            // name={"companyName"}
            label={"Invoice Format"}
            type={"select"}
            options={invoiceFormatOptions}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            // name={"companyName"}
            label={"Staff Access"}
            type={"select"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <Form.Item
            label="Sale and Quotion Without Stock"
            name={"saleQuotationWithoutStock"}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col {...colLayout2}>
          <CustomInput
            // name={"companyName"}
            label={"Developed By"}
            type={"text"}
            required={true}
          />
        </Col>
        <Col {...colLayout2}>
          <CustomInput
            // name={"companyName"}
            label={"Developed By Link"}
            type={"text"}
            required={true}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default GeneralSettingForm;
