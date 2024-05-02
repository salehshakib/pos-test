import { PageContainer } from "@ant-design/pro-layout";
import GeneralSettingForm from "./GeneralSettingForm";
import { GlobalUtilityStyle } from "../../../../container/Styled";

const GeneralSettings = () => {
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
          <GeneralSettingForm />
        </div>
      </PageContainer>
    </GlobalUtilityStyle>
  );
};

export default GeneralSettings;
