import { Spin } from 'antd';
import { useGetHolidayDetailsQuery } from '../../redux/services/hrm/holiday/holidayApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const HolidayDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetHolidayDetailsQuery(
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
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="max-h-[75vh] space-y-5 overflow-y-auto pb-5 pt-3">
          <CustomDescription title="Leave " items={details} />
        </div>
      )}
    </CustomModal>
  );
};
