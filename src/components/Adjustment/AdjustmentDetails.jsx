import { Spin, Table } from 'antd';
import { tableProps } from '../../layout/TableLayout';
import { useGetAdjustmentDetailsQuery } from '../../redux/services/adjustment/adjustmentApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { useGlobalParams } from '../../utilities/hooks/useParams';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {text}
      </span>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: (text) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {text}
      </span>
    ),
  },
];

const AdjustmentDetails = ({ id, ...props }) => {
  const params = useGlobalParams({
    isRelationalParams: true,
  });

  const { data, isFetching } = useGetAdjustmentDetailsQuery(
    { id, params },
    { skip: !id }
  );

  const details = useDetailsLayout(data);

  const title = () => (
    <span className="-ml-2 text-base font-semibold text-black">
      Adjustment Products
    </span>
  );

  const dataSource = data?.adjustment_products?.map((item) => {
    return {
      id: item.id,
      product_name:
        item?.products?.name ??
        'Unknown Product' +
          (item?.products?.sku ? ` (${item?.products?.sku})` : ''),
      qty: item.qty ?? 'Unknown Quantity',
      action: item.action ?? 'Unknown Action',
    };
  });

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Adjustment " items={details} />
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

export default AdjustmentDetails;
