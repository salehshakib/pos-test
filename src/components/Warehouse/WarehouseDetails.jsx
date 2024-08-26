import { Spin } from 'antd';
import { useGetWarehouseDetailsQuery } from '../../redux/services/warehouse/warehouseApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const WarehouseDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetWarehouseDetailsQuery(
    {
      id,
    },
    { skip: !id }
  );

  const details = useDetailsLayout(data, true);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <CustomDescription
          title="Warehouse"
          items={details}
          // nostyle={true}
        />
      )}
    </CustomModal>
  );
};
