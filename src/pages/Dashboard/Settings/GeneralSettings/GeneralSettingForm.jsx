import { generate, presetPalettes } from "@ant-design/colors";
import {
  Button,
  Col,
  ColorPicker,
  Divider,
  Form,
  Radio,
  Row,
  theme,
} from "antd";
import { currencies } from "currencies.json";
import { useDispatch } from "react-redux";
import dateFormats from "../../../../assets/data/dateFormats.json";
import invoiceFormats from "../../../../assets/data/invoiceFormats.json";
import timezones from "../../../../assets/data/timezones.json";
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

const customPrimaryPanelRender = (_, { components: { Picker, Presets } }) => (
  <div>
    <div
      style={{
        fontSize: 12,
        color: "black",
        lineHeight: "20px",
        marginBottom: 8,
        fontWeight: 500,
      }}
    >
      This is your primary color. Choose a strong color to enhance the UI. It
      will be mainly used in hover color, focus color, text color etc.
    </div>

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
  </div>
);

const customSecondaryPanelRender = (_, { components: { Picker, Presets } }) => (
  <div>
    <div
      style={{
        fontSize: 12,
        color: "black",
        lineHeight: "20px",
        marginBottom: 8,
        fontWeight: 500,
      }}
    >
      This is your accent color. Choose a mild color to enhance the Primary
      Color. It will be mainly used in general color, background color etc.
    </div>

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
  </div>
);

const GeneralSettingForm = ({ handleSubmit, fields, isLoading }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { token } = theme.useToken();
  const presets = genPresets({
    Primary: generate(token.colorPrimary),
    Secondary: generate(token.secondaryColor),
  });

  const timezone = timezones.map(({ zone, utc, name }) => {
    return { label: `${name} ${utc}}`, value: zone };
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

  const onFinish = (values) => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => {
        handleSubmit(values);
      })
      .catch((error) => {
        console.error("Validation error:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  // const logo = ;

  return (
    <Form
      form={form}
      fields={fields}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="on"
      onFinishFailed={onFinishFailed}
    >
      <CustomLogoUploader name={"logo"} form={form} />

      <Divider orientation="left" orientationMargin={0}>
        Color Settings
      </Divider>
      <Row {...rowLayout} className="">
        <Col {...colorColLayout}>
          <Form.Item
            label="Primary Color"
            name={"primary_color"}
            initialValue={token.colorPrimary}
          >
            <ColorPicker
              styles={{
                popupOverlayInner: {
                  width: 480,
                },
              }}
              presets={presets}
              panelRender={customPrimaryPanelRender}
              size="large"
              showText={(color) => <span>{color.toHexString()}</span>}
              onChangeComplete={handlePrimaryColor}
              format="hex"
            />
          </Form.Item>
        </Col>
        <Col {...colorColLayout}>
          <Form.Item
            label="Secondary Color"
            name={"secendary_color"}
            initialValue={token.secondaryColor}
          >
            <ColorPicker
              styles={{
                popupOverlayInner: {
                  width: 480,
                },
              }}
              presets={presets}
              panelRender={customSecondaryPanelRender}
              size="large"
              showText={(color) => <span>{color.toHexString()}</span>}
              onChangeComplete={handleSecondaryColor}
              format="hex"
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={0}>
        Compnay Settings
      </Divider>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label={"System Title"}
            type={"text"}
            required={true}
            name={"site_title"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            name={"company"}
            label={"Company Name"}
            type={"text"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            name={"reg_number"}
            label={"Vat Registration Number"}
            type={"text"}
            required={true}
          />
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={0}>
        Time Settings
      </Divider>
      <Row {...rowLayout}>
        <Col {...colLayout2}>
          <CustomInput
            name={"time_zone"}
            label={"Time Zone"}
            type={"select"}
            options={timezone}
            required={true}
          />
        </Col>
        <Col {...colLayout2}>
          <CustomInput
            name={"date_format"}
            label={"Date Format"}
            type={"select"}
            options={dateFormatOptions}
            required={true}
          />
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={0}>
        Currency Settings
      </Divider>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            name={"currency"}
            label={"Currency"}
            type={"select"}
            options={currenciesOptions}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            name={"decimal_point"}
            label={"Digits After Decimal Point"}
            type={"number"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <Form.Item label="Currency Position" name={"currency_position"}>
            <Radio.Group>
              <Radio value="1">Prefix</Radio>
              <Radio value="0">Suffix</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

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

      <Divider orientation="left" orientationMargin={0}>
        Developer Settings
      </Divider>
      <Row {...rowLayout}>
        <Col {...colLayout2}>
          <CustomInput
            name={"developed_by"}
            label={"Developed By"}
            type={"text"}
            required={true}
          />
        </Col>
        <Col {...colLayout2}>
          <CustomInput
            name={"developed_by_link"}
            label={"Developed By Link"}
            type={"text"}
            required={true}
          />
        </Col>
      </Row>

      <div className="w-full flex gap-3 justify-end items-center">
        {/* <Button type="default" onClick={handleDrawerClose}>
              Cancel
            </Button> */}
        <Button
          htmlType="submit"
          type="primary"
          // className=" text-white"
          loading={isLoading}
        >
          Update
        </Button>
      </div>
    </Form>

    // {/* </CustomForm> */}
  );
};

export default GeneralSettingForm;
