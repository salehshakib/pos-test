import { PageContainer } from '@ant-design/pro-layout';

import { GlobalUtilityStyle } from '../../../container/Styled';
import { useGetGeneralSettingsQuery } from '../../../redux/services/settings/generalSettings/generalSettingsApi';
import GeneralSettingForm from './GeneralSettingForm';

const GeneralSettings = () => {
  const { data, isLoading } = useGetGeneralSettingsQuery();

  return (
    <GlobalUtilityStyle>
      <PageContainer
        header={{
          title: (
            <div className="border-r-2 border-black py-1 pr-2 text-2xl lg:text-3xl">
              Settings
            </div>
          ),
          subTitle: (
            <div className="py-1 text-2xl lg:text-3xl">General Settings</div>
          ),
        }}
        loading={isLoading}

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
        <GeneralSettingForm data={data} />
      </PageContainer>
    </GlobalUtilityStyle>
  );
};

export default GeneralSettings;
