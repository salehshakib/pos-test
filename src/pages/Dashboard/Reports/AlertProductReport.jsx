import { Row } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AlertProductTable } from '../../../components/Report/AlertProductTable';
import { WarehouseFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { useCurrentUser } from '../../../redux/services/auth/authSlice';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';
import { getDateRange } from '../../../utilities/lib/getDateRange';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {name}
      </span>
    ),
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    align: 'center',
    width: 100,
    render: (sku) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {sku}
      </span>
    ),
  },
  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    align: 'center',
    render: (warehouse) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {warehouse}
      </span>
    ),
  },
  {
    title: 'Minimum Qunatity',
    dataIndex: 'minQty',
    key: 'minQty',
    align: 'center',
    width: 150,
    render: (minQty) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {minQty}
      </span>
    ),
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
    width: 100,
    render: (stock, record) =>
      stock > record ? (
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
          {stock}
        </span>
      ) : (
        <span className="dark:text-white87 text-xs font-medium text-red-600 md:text-sm">
          {stock}
        </span>
      ),
  },
  {
    title: 'Selling Price',
    dataIndex: 'unitCost',
    key: 'unitCost',
    align: 'center',
    width: 100,
    render: (unitCost) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {unitCost}
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

export const AlertProductReport = () => {
  const user = useSelector(useCurrentUser);
  const warehouseId = user?.warehouse_id;

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

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
    created_daterange: searchParams?.created_daterange ?? getDateRange(segment),
  };

  return (
    <GlobalContainer
      pageTitle="Alert Product Report"
      columns={columns}
      popoverWidth={400}
      debounce={debounce}
      setParams={setParams}
      segment={segment}
      onSegmentChange={onSegmentChange}
      searchFilterContent={<SearchComponent />}
    >
      <AlertProductTable
        newColumns={columns}
        keyword={keyword}
        searchParams={defaultParams}
      />
    </GlobalContainer>
  );
};
