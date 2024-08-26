import { Spin } from 'antd';
import { useGetStockCountDetailsQuery } from '../../redux/services/stockCount/stockCountApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const StockCountDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetStockCountDetailsQuery(
    { id, params: { parent: 1, child: 1 } },
    { skip: !id }
  );

  console.log(data);

  const details = useDetailsLayout(data, true);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <CustomDescription
          title="StockCount"
          items={details}
          // nostyle={true}
        />
      )}
    </CustomModal>
  );
};
