import { Spin } from 'antd';

import { useGetGiftCardDesignDetailsQuery } from '../../redux/services/giftcard/giftcarddesgin/giftCardDesignApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const GiftCardDesigneDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetGiftCardDesignDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        // child: 1,
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
          <CustomDescription title="Leave" items={details} />
        </div>
      )}
    </CustomModal>
  );
};
