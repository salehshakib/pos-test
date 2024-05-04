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

  const handleSubmit = (values) => {
    console.log(values);
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

  return (
    <div className="pt-10">
      <Form
        form={form}
        fields={fields}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="on"
        onFinishFailed={onFinishFailed}
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
