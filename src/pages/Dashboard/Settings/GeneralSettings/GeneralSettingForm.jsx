import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import ColorSetting from "../../../../components/Settings/GeneralSettings/ColorSetting";
import CompanySetting from "../../../../components/Settings/GeneralSettings/CompanySetting";
import CurrencySetting from "../../../../components/Settings/GeneralSettings/CurrencySetting";
import DeveloperSetting from "../../../../components/Settings/GeneralSettings/DeveloperSetting";
import StaffSetting from "../../../../components/Settings/GeneralSettings/StaffSetting";
import TimeSetting from "../../../../components/Settings/GeneralSettings/TimeSetting";
import CustomLogoUploader from "../../../../components/Shared/Form/CustomLogoUploader";
import { useUpdateGeneralSettingsMutation } from "../../../../redux/services/settings/generalSettings/generalSettingsApi";
import { fieldsToUpdate } from "../../../../utilities/lib/fieldsToUpdate";

const GeneralSettingForm = ({ data }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const [updateGeneralSettings, { isLoading }] =
    useUpdateGeneralSettingsMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);
      setFields(fieldData);
    }
  }, [data]);

  console.log(data);

  const handleSubmit = async (values) => {
    const { logo, primary_color, secendary_color, ...rest } = values;

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (
        key !== "logo" &&
        key !== "primary_color" &&
        key !== "secendary_color"
      ) {
        formData.append(key, value);
      }
    });

    if (form.isFieldTouched("logo")) {
      formData.append("logo", logo[0]);
    }

    if (form.getFieldValue("primary_color").includes("#")) {
      formData.append("primary_color", primary_color);
    }

    if (form.getFieldValue("secendary_color").includes("#")) {
      formData.append("secendary_color", secendary_color);
    }

    await updateGeneralSettings({
      data: formData,
    });
  };

  const onFinish = (values) => {
    const touchedFields = Object.keys(form.getFieldsValue()).filter((item) =>
      form.isFieldTouched(item)
    );

    console.log(touchedFields);
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

  return (
    <div className="pt-10">
      <Form
        form={form}
        fields={fields}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="on"
        onFinishFailed={onFinishFailed}
        disabled={!data}
      >
        <CustomLogoUploader name={"logo"} form={form} />
        <ColorSetting />
        <CompanySetting />
        <TimeSetting />
        <CurrencySetting />
        <StaffSetting />
        <DeveloperSetting />

        <div className="w-full flex gap-3 justify-end items-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default GeneralSettingForm;
