import { Spin } from 'antd';
import { useGetCategoryDetailsQuery } from '../../redux/services/category/categoryApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

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

  const details = useDetailsLayout(data);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center my-10" />
      ) : (
        <div className="space-y-5 max-h-[75vh] overflow-y-auto pt-3 pb-5">
          <CustomDescription title="Category " items={details} />
        </div>
      )}
    </CustomModal>
  );
};
