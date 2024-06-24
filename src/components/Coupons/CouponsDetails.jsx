import { Spin } from "antd";
import { useGetCouponDetailsQuery } from "../../redux/services/coupon/couponApi";
import createDetailsLayout from "../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../Shared/Description/CustomDescription";
import CustomModal from "../Shared/Modal/CustomModal";

export const CouponsDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetCouponDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
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
        <CustomDescription title="Coupon Details" items={details} />
      )}
    </CustomModal>
  );
};
