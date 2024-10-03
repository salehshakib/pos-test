import { Spin } from 'antd';

import { useGetBalanceWithdrawDetailsQuery } from '../../redux/services/balanceWithdraw/balanceWithdrawApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

const BalanceWithdrawDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetBalanceWithdrawDetailsQuery(
    {
      id,
      params: {
        parent: 1,
      },
    },
    { skip: !id }
  );

  const details = useDetailsLayout(data);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Balance Withdraw" items={details} />
        </div>
      )}
    </CustomModal>
  );
};

export default BalanceWithdrawDetails;
