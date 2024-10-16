import { Spin, Table } from 'antd';

import { tableProps } from '../../layout/TableLayout';
import { useGetStockRequestDetailsQuery } from '../../redux/services/stockRequest/stockRequestApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

const productReqTable = [
  {
    //name
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{name}</span>
    ),
  },
  {
    //name
    title: 'Sku',
    dataIndex: 'sku',
    key: 'sku',
    width: 150,
    align: 'center',
    render: (sku) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{sku}</span>
    ),
  },
  {
    //name
    title: 'Alert Qty',
    dataIndex: 'alertQty',
    key: 'alertQty',
    align: 'center',
    render: (alertQty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {alertQty}
      </span>
    ),
  },
  {
    title: 'Request Qty',
    dataIndex: 'reqQty',
    key: 'reqQty',
    align: 'center',
    render: (reqQty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {reqQty}
      </span>
    ),
  },
];

export const StockRequestDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetStockRequestDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const warehouseInfo = useDetailsLayout({
    warehouse_from: data?.from_warehouses?.name,
    request_warehouse: data?.to_warehouses?.name,
  });

  const productReqTitle = () => (
    <span className="-ml-2 text-base font-semibold text-black">
      Product Request List
    </span>
  );

  const requestProducts = data?.stock_request_products?.map((item) => {
    return {
      name: item?.product_variants?.name ?? 'Unknown Product',
      sku: item?.product_variants?.sku ?? 'Unknown Quantity',
      alertQty: item?.alert_qty ?? 'Unknown Quantity',
      reqQty: item?.need_qty ?? 'Unknown Quantity',
    };
  });

  return (
    <CustomModal
      {...props}
      transferStatus={data?.transfer_status}
      requestStatus={data?.status}
    >
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Basic Info" items={warehouseInfo} />
          <Table
            {...tableProps}
            title={productReqTitle}
            columns={productReqTable}
            dataSource={requestProducts}
          />
        </div>
      )}
    </CustomModal>
  );
};
