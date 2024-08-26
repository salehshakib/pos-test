import { PageContainer } from '@ant-design/pro-layout';
import { RewardForm } from '../../../../components/Settings/RewardSettings/RewardForm';
import { GlobalUtilityStyle } from '../../../container/Styled';

export const RewardSettings = () => {
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
            <div className="py-1 text-2xl lg:text-3xl">Reward Settings</div>
          ),
        }}
        // loading={isLoading}
      >
        <RewardForm
        // data={data}
        />
      </PageContainer>
    </GlobalUtilityStyle>
  );
};
