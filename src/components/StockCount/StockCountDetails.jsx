import { Spin, Table } from 'antd';

import { tableProps } from '../../layout/TableLayout';
import { useGetStockCountDetailsQuery } from '../../redux/services/stockCount/stockCountApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

const columns = [
  {
    title: 'PID',
    dataIndex: 'pid',
    key: 'pid',
    align: 'center',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {text}
      </span>
    ),
  },
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {text}
      </span>
    ),
  },

  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    align: 'center',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {text}
      </span>
    ),
  },
];

export const StockCountDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetStockCountDetailsQuery(
    { id, params: { parent: 1, child: 1 } },
    { skip: !id }
  );

  const details = useDetailsLayout(data, true);

  const title = () => (
    <span className="-ml-2 text-base font-semibold text-black">
      Stock Request Products
    </span>
  );

  const dataSource = data?.resources?.map((item) => {
    return {
      id: item?.pid,
      pid: item?.pid,
      product_name: item?.product
        ? item?.product + ` (${item?.sku})`
        : 'Unknown Product',
      qty: item.quantity ?? 'Unknown Quantity',
    };
  });
  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Stock Count" items={details} />
          <Table
            {...tableProps}
            title={title}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      )}
    </CustomModal>
  );
};
