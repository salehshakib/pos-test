import { Col, Form, Radio, Row } from "antd";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";
import CustomLogoUploader from "../../../../components/Shared/Form/CustomLogoUploader";
import timezones from "timezones.json";
import dateFormats from "../../../../assets/data/dateFormats.json";
import invoiceFormats from "../../../../assets/data/invoiceFormats.json";
import { currencies } from "currencies.json";

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

const GeneralSettingForm = () => {
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

  return (
    <CustomForm
      // handleSubmit={handleSubmit}
      className=""
      submitBtnText="Update"

      // fields={fields}
      // isLoading={isLoading}
    >
      <CustomLogoUploader />

      <Row {...rowLayout} className="">
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
        <Col {...colLayout}>
          <CustomInput
            // name={"companyName"}
            label={"Time Zone"}
            type={"select"}
            options={timezone}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
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
            label={"Invoice Format"}
            type={"select"}
            options={invoiceFormatOptions}
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
          <CustomInput
            // name={"companyName"}
            label={"Staff Access"}
            type={"select"}
            required={true}
          />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            // name={"companyName"}
            label={"Developed By"}
            type={"text"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <Form.Item label="Current Position" name={"currentPosittion"}>
            <Radio.Group>
              <Radio value="preifx">Prefix</Radio>
              <Radio value="suffix">Suffix</Radio>
            </Radio.Group>
          </Form.Item>
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
      </Row>
    </CustomForm>
  );
};

export default GeneralSettingForm;
