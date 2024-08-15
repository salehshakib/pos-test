import { PageContainer } from "@ant-design/pro-layout";
import { RewardForm } from "../../../../components/Settings/RewardSettings/RewardForm";
import { GlobalUtilityStyle } from "../../../container/Styled";

export const RewardSettings = () => {
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
            <div className="text-2xl lg:text-3xl py-1">Reward Settings</div>
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
