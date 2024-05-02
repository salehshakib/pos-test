import { PageContainer } from "@ant-design/pro-layout";
import GeneralSettingForm from "./GeneralSettingForm";
import { GlobalUtilityStyle } from "../../../../container/Styled";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetGeneralSettingsQuery } from "../../../../redux/services/settings/generalSettings/generalSettingsApi";
import { fieldsToUpdate } from "../../../../utilities/lib/fieldsToUpdate";

const GeneralSettings = () => {
  const dispatch = useDispatch();

  const [fields, setFields] = useState([]);
  const { data, isLoading } = useGetGeneralSettingsQuery();
  // const [defaultLogo, setLogo] = useState(false);

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);
      setFields(fieldData);
    }
  }, [data]);

  return (
    <GlobalUtilityStyle>
      <PageContainer
        header={{
          title: (
            <div className="text-2xl lg:text-3xl border-r-2 pr-2 border-black py-1">
              Settings
            </div>
          ),
          subTitle: (
            <div className="text-2xl lg:text-3xl py-1">General Settings</div>
          ),
        }}

        // tabList={[
        //   {
        //     key: "general",
        //     tab: "General",
        //     children: <div>General</div>,
        //   },
        //   {
        //     key: "email",
        //     tab: "Email",
        //     children: <div>Email</div>,
        //   },
        // ]}
        // tabProps={{
        //   tabPosition: "left",
        //   style: {
        //     // height: "100%",
        //     marginTop: "20px",
        //     border: "1px solid #d9d9d9",
        //   },
        // }}
      >
        <div className="pt-10">
          <GeneralSettingForm fields={fields} isLoading={isLoading} />
        </div>
      </PageContainer>
    </GlobalUtilityStyle>
  );
};

export default GeneralSettings;
