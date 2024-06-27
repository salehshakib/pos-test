import { Spin } from "antd";
import { useGetBrandDetailsQuery } from "../../redux/services/brand/brandApi";
import createDetailsLayout from "../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../Shared/Description/CustomDescription";
import CustomModal from "../Shared/Modal/CustomModal";

export const BrandDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetBrandDetailsQuery(
    {
      id,
      //   params: {
      //     parent: 1,
      //     child: 1,
      //   },
    },
    { skip: !id }
  );

  const details = createDetailsLayout(data);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center mt-10" />
      ) : (
        <div className="space-y-5">
          <CustomDescription title="Brand Details" items={details} />
        </div>
      )}
    </CustomModal>
  );
};
