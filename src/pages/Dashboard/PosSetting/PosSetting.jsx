import { PageContainer } from '@ant-design/pro-layout';

import { PosSettingForm } from '../../../components/Settings/PosSettings/PosSettingForm';
import { GlobalUtilityStyle } from '../../../container/Styled';
import { useGetPosSettingsQuery } from '../../../redux/services/settings/generalSettings/generalSettingsApi';

const PosSetting = () => {
  const params = {
    child: 1,
  };
  const { data, isLoading } = useGetPosSettingsQuery(params);

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
            <div className="py-1 text-2xl lg:text-3xl">POS Settings</div>
          ),
        }}
        loading={isLoading}
      >
        <PosSettingForm data={data} />
      </PageContainer>
    </GlobalUtilityStyle>
  );
};

export default PosSetting;
