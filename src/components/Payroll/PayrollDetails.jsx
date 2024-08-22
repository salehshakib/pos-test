import { Spin } from 'antd';
import { useGetLeaveDetailsQuery } from '../../redux/services/hrm/leave/leaveApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const PayrollDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetLeaveDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
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
          <CustomDescription title="Payroll " items={details} />
        </div>
      )}
    </CustomModal>
  );
};
