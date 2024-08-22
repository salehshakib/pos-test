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
        <Spin className="w-full flex justify-center items-center my-10" />
      ) : (
        <div className="space-y-5 max-h-[75vh] overflow-y-auto pt-3 pb-5">
          <CustomDescription title="Cashier " items={details} />
        </div>
      )}
    </CustomModal>
  );
};
