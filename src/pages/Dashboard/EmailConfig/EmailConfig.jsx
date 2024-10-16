import { PageContainer } from '@ant-design/pro-layout';

import { GlobalUtilityStyle } from '../../../container/Styled';
import { useGetAllEmailSettingsQuery } from '../../../redux/services/settings/emailSettings/emailSettingsApi';
import { EmailConfigForm } from './EmailConfigForm';

export const EmailConfig = () => {
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
            <div className="py-1 text-2xl lg:text-3xl">Email Settings</div>
          ),
        }}
        loading={isLoading}
      >
        <EmailConfigForm data={data} />
      </PageContainer>
    </GlobalUtilityStyle>
  );
};
