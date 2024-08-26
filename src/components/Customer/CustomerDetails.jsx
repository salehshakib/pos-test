import { Spin } from 'antd';
import { useGetCustomerDetailsQuery } from '../../redux/services/customer/customerApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const CustomerDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetCustomerDetailsQuery(
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
        <div className="max-h-[75vh] space-y-5 overflow-y-auto pb-5 pt-3">
          <CustomDescription title="Customer " items={details} />
        </div>
      )}
    </CustomModal>
  );
};
