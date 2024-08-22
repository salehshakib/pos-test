import { Spin } from 'antd';
import { useGetCustomerGroupDetailsQuery } from '../../redux/services/customerGroup/customerGroupApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const CustomerGroupDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetCustomerGroupDetailsQuery(
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
          <CustomDescription title="Customer Group " items={details} />
        </div>
      )}
    </CustomModal>
  );
};
