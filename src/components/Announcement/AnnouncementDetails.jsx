import { Spin } from 'antd';

import { useGetAnnouncementDetailsQuery } from '../../redux/services/hrm/announcement/announcementApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const AnnouncementDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetAnnouncementDetailsQuery(
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
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Announcement" items={details} />
        </div>
      )}
    </CustomModal>
  );
};
