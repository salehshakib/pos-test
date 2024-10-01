import { Badge, Calendar, Spin } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useCurrency } from '../../../redux/services/pos/posSlice';
import { showCurrency } from '../../../utilities/lib/currency';
import CustomModal from '../Modal/CustomModal';
import CustomTable from '../Table/CustomTable';

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const monthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

const columns = [
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
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    render: (quantity) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {quantity}
      </span>
    ),
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    align: 'right',
    render: (total, record) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {showCurrency(total, record?.currency)}
      </span>
    ),
  },
];

const CustomCalender = ({ onChange, data }) => {
  const currency = useSelector(useCurrency);

  const getListData = (value) => {
    const date = dayjs(value).format('YYYY-MM-DD');

    let listData =
      data &&
      data[date]?.map((item) => {
        return {
          id: item?.id,
          type: item.payment_status === 'Paid' ? 'success' : 'warning',
          content:
            showCurrency(item?.grand_total, currency) +
            ' ' +
            'Qty: ' +
            item?.total_qty,
          products: item?.purchase_products
            ? item?.purchase_products
            : item?.sale_products,
        };
      });

    if (data) return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => {
          return (
            <li key={item.id}>
              <Badge status={item.type} text={item.content} />
            </li>
          );
        })}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const handleCellClick = (date) => {
    const value = data?.[dayjs(date).format('YYYY-MM-DD')];

    const processedData = value?.flatMap((item) => {
      const { purchase_products, sale_products } = item ?? {};
      const products = purchase_products || sale_products;

      return (
        products?.map((productItem) => ({
          id: `${item?.id}-${productItem?.product_variants?.id}`,
          name: productItem?.product_variants?.name,
          sku: productItem?.product_variants?.sku,
          quantity: productItem?.qty,
          total: productItem?.total,
          currency,
          grand_total: item?.grand_total,
          paid_amount: item?.paid_amount,
          due_amount: item?.due_amount,
        })) ?? []
      );
    });

    if (value) {
      setModalOpen(true);
      setDataSource(processedData);
    } else {
      setDataSource([]);
    }
  };

  if (!data)
    return (
      <Spin className="flex h-[70vh] w-full items-center justify-center" />
    );

  return (
    <>
      <Calendar
        cellRender={cellRender}
        onChange={onChange}
        onSelect={handleCellClick}
      />
      <CustomModal openModal={modalOpen} hideModal={() => setModalOpen(false)}>
        <div className="grid grid-cols-3 divide-x-2 p-2">
          <div className="flex justify-center gap-2">
            <span className="text-lg font-medium">Grand Total</span>
            <span className="text-lg font-medium">
              {showCurrency(dataSource?.[0]?.grand_total, currency)}
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <span className="text-lg font-medium">Paid Amount</span>
            <span className="text-lg font-medium">
              {showCurrency(dataSource?.[0]?.paid_amount, currency)}
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <span className="text-lg font-medium">Due Amount</span>
            <span className="text-lg font-medium">
              {showCurrency(dataSource?.[0]?.due_amount, currency)}
            </span>
          </div>
        </div>
        <CustomTable
          columns={columns}
          dataSource={dataSource}
          title="Products"
          status={false}
          action={false}
          created_at={false}
          hideOnSinglePage={true}
        />
      </CustomModal>
    </>
  );
};

export default CustomCalender;
