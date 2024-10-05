import { PageContainer } from '@ant-design/pro-layout';

import { GlobalUtilityStyle } from '../../../container/Styled';
import { useGetAllEmailSettingsQuery } from '../../../redux/services/settings/emailSettings/emailSettingsApi';
import SmsConfigForm from './SmsConfigForm';

const SmsConfig = () => {
  const { data, isLoading } = useGetAllEmailSettingsQuery();

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
            <div className="py-1 text-2xl lg:text-3xl">SMS Settings</div>
          ),
        }}
        loading={isLoading}
      >
        <SmsConfigForm data={data} />
      </PageContainer>
    </GlobalUtilityStyle>
  );
};

export default SmsConfig;
