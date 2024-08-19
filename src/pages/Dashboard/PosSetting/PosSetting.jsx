import { PageContainer } from "@ant-design/pro-layout";
import { PosSettingForm } from "../../../components/Settings/PosSettings/PosSettingForm";
import { GlobalUtilityStyle } from "../../../container/Styled";
import { useGetGeneralSettingsQuery } from "../../../redux/services/settings/generalSettings/generalSettingsApi";

const PosSetting = () => {
  const params = {
    child: 1,
  };
  const { data, isLoading } = useGetGeneralSettingsQuery(params);

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
            <div className="text-2xl lg:text-3xl py-1">Pos Settings</div>
          ),
        }}
        loading={isLoading}
      >
        <PosSettingForm data={data?.pos_setting} />
      </PageContainer>
    </GlobalUtilityStyle>
  );
};

export default PosSetting;
