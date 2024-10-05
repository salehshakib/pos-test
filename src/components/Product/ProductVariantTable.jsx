import { useSelector } from 'react-redux';

import defaultUser from '../../assets/data/defaultUserImage';
import { showCurrency } from '../../utilities/lib/currency';
import { getWarehousePrice } from '../../utilities/lib/getWarehouseQty';
import CustomTable from '../Shared/Table/CustomTable';

const expandColumns = [
  {
    title: 'Img',
    dataIndex: 'img',
    key: 'img',
    // fixed: 'left',
    align: 'center',
    width: 70,
    render: (img) => (
      <div className="mx-auto h-8 w-8 overflow-hidden rounded-md">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 350,

    render: (name) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{name}</span>
    ),
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    width: 150,
    align: 'center',
    render: (sku) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{sku}</span>
    ),
  },
  {
    title: 'IEMI',
    dataIndex: 'iemi',
    key: 'iemi',
    width: 130,
    align: 'center',
    render: (iemi) => {
      const isValid = iemi
        ? !(iemi === '' || iemi?.trim().length === 0)
        : false;

      return (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {isValid ? iemi : 'N/A'}
        </span>
      );
    },
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    width: 100,
    align: 'center',
    render: (qty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{qty}</span>
    ),
  },
  {
    title: 'Buying Cost',
    dataIndex: 'cost',
    key: 'cost',
    width: 130,
    align: 'right',
    render: (cost) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{cost}</span>
    ),
  },
  {
    title: 'Selling Price',
    dataIndex: 'price',
    key: 'price',
    width: 130,
    align: 'right',
    render: (price) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {price}
      </span>
    ),
  },
];

export const expandedRowRender = (record, data, currency) => {
  const expandedData =
    data?.results?.product
      ?.find((product) => product.id === record.id)
      ?.variants?.map((variant) => {
        const price = getWarehousePrice(
          variant?.product_prices,
          record?.warehouseId
        );

        return {
          id: variant.id,
          name: variant.name,
          sku: variant.sku,
          iemi: variant.imei_number,
          qty:
            variant?.product_qties?.length === 0
              ? variant?.qty
              : variant?.product_qties?.reduce(
                  (total, item) => total + item.qty,
                  0
                ),
          cost: showCurrency(variant.buying_price, currency),
          price: price
            ? showCurrency(price, currency)
            : showCurrency(variant.selling_price, currency),
          created_at: variant.created_at,
          status: record.status,
          handleDeleteModal: record.handleDeleteVariantModal,
        };
      }) ?? [];

  return (
    <CustomTable
      columns={expandColumns}
      dataSource={expandedData}
      showPaging={false}
      status={false}
      tableStyleProps={{
        bordered: true,
        scroll: {
          x: 'min-content',
        },
      }}
    />
  );
};
