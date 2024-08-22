import { PageContainer } from '@ant-design/pro-layout';
import { GlobalUtilityStyle } from '../../../container/Styled';
import { useGetGeneralSettingsQuery } from '../../../redux/services/settings/generalSettings/generalSettingsApi';
import { HrmSettingForm } from './HrmSettingsForm';

export const HrmSettings = () => {
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
            <div className="text-2xl lg:text-3xl py-1">HRM Settings</div>
          ),
        }}
        loading={isLoading}
      >
        <HrmSettingForm data={data?.hrm_setting} />
      </PageContainer>
    </GlobalUtilityStyle>
  );
};
