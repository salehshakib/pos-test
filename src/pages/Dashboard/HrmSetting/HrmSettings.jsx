import { PageContainer } from '@ant-design/pro-layout';

import { GlobalUtilityStyle } from '../../../container/Styled';
import { useGetAllHrmSettingQuery } from '../../../redux/services/settings/hrmSettings/hrmSettingsApi';
import { HrmSettingForm } from './HrmSettingsForm';

export const HrmSettings = () => {
  const params = {
    child: 1,
  };
  const { data, isLoading } = useGetAllHrmSettingQuery(params);

  console.log(data);

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
            <div className="py-1 text-2xl lg:text-3xl">HRM Settings</div>
          ),
        }}
        loading={isLoading}
      >
        <HrmSettingForm data={data} />
      </PageContainer>
    </GlobalUtilityStyle>
  );
};
