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
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Customer Group " items={details} />
        </div>
      )}
    </CustomModal>
  );
};
