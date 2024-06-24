import { Spin } from "antd";
import { useGetCategoryDetailsQuery } from "../../redux/services/category/categoryApi";
import createDetailsLayout from "../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../Shared/Description/CustomDescription";
import CustomModal from "../Shared/Modal/CustomModal";

export const CategoryDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetCategoryDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        //   child: 1,
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
        <CustomDescription title="Category Details" items={details} />
      )}
    </CustomModal>
  );
};
