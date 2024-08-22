import { Row } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PurchaseReportTable } from '../../../components/Report/PurchaseReportTable';
import { WarehouseFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { useCurrentUser } from '../../../redux/services/auth/authSlice';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';
import { getDateRange } from '../../../utilities/lib/getDateRange';

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'product',
    key: 'product',
    render: (product) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {product}
      </span>
    ),
  },
  {
    title: 'Purchased Qty',
    dataIndex: 'purchasedQty',
    key: 'purchasedQty',
    render: (qty) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {qty}
      </span>
    ),
  },
  {
    title: 'Purchased Amount',
    dataIndex: 'purchaseAmount',
    key: 'purchaseAmount',
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    align: 'center',
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
      </span>
    ),
  },
  {
    //created_at
    title: 'Purchased At',
    dataIndex: 'purchasedAt',
    key: 'purchasedAt',
    align: 'center',
    render: (purchasedAt) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {purchasedAt}
      </span>
    ),
  },
];

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <WarehouseFilter name="warehouse_ids" multiple={true} fullLayout={true} />
    </Row>
  );
};

export const PurchaseReport = () => {
  const user = useSelector(useCurrentUser);
  const warehouseId = user?.warehouse_id;

  const { keyword, debounce } = useCustomDebounce();
  const { searchParams, setParams } = useFilterParams();

  const [segment, setSegment] = useState('Weekly');

  const onSegmentChange = (value) => {
    setSegment(value);
  };

  useEffect(() => {
    const dateRange = getDateRange(segment);
    setParams((prev) => ({
      ...prev,
      created_daterange: dateRange,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  const defaultParams = {
    warehouse_ids: searchParams?.warehouse_ids ?? [warehouseId],
    purchase_daterange:
      searchParams?.created_daterange ?? getDateRange(segment),
  };

  return (
    <GlobalContainer
      pageTitle="Purchase Report"
      columns={columns}
      popoverWidth={400}
      debounce={debounce}
      setParams={setParams}
      segment={segment}
      onSegmentChange={onSegmentChange}
      searchFilterContent={<SearchComponent />}
    >
      <PurchaseReportTable
        newColumns={columns}
        searchParams={defaultParams}
        keyword={keyword}
      />
    </GlobalContainer>
  );
};
