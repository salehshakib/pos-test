import { Spin } from 'antd';

import { useGetCashierDetailsQuery } from '../../redux/services/cashier/cashierApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const CashierDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetCashierDetailsQuery(
    {
      id,
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
          <CustomDescription title="Cashier " items={details} />
        </div>
      )}
    </CustomModal>
  );
};
