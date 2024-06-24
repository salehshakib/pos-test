import { Spin } from "antd";
import { useGetGiftCardDesignDetailsQuery } from "../../redux/services/giftcard/giftcarddesgin/giftCardDesignApi";
import createDetailsLayout from "../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../Shared/Description/CustomDescription";
import CustomModal from "../Shared/Modal/CustomModal";

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

  const details = createDetailsLayout(data);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center mt-10" />
      ) : (
        <CustomDescription title="Leave Details" items={details} />
      )}
    </CustomModal>
  );
};
