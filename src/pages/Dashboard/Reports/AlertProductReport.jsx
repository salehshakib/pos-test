import { Button, Modal, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { AlertProductTable } from '../../../components/Report/AlertProductTable';
import { WarehouseFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import CustomPrintTable from '../../../components/Shared/Table/CustomPrintTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { useCurrentUser } from '../../../redux/services/auth/authSlice';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetAlertReportQuery } from '../../../redux/services/reports/summaryApi';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';
import { showCurrency } from '../../../utilities/lib/currency';
import { getDateRange } from '../../../utilities/lib/getDateRange';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{name}</span>
    ),
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    align: 'center',
    width: 150,
    render: (sku) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{sku}</span>
    ),
  },
  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    key: 'warehouse',
    align: 'center',
    render: (warehouse) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {warehouse}
      </span>
    ),
  },
  {
    title: 'Minimum Quantity',
    dataIndex: 'minQty',
    key: 'minQty',
    align: 'center',
    width: 150,
    render: (minQty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
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
        <span className="text-dark   text-xs font-medium md:text-sm">
          {stock}
        </span>
      ) : (
        <span className="  text-xs font-medium text-red-600 md:text-sm">
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
      <span className="text-dark   text-xs font-medium md:text-sm">
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

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Alert Product Details',
  });

  const [openPrint, setOpenPrint] = useState(false);

  const { data } = useGetAlertReportQuery({}, {});

  const currency = useSelector(useCurrency);

  const dataSource =
    data?.results?.product?.flatMap((item, index) => {
      const {
        name,
        alert_qty,
        sku,
        product_qties,
        product_prices,
        selling_price: unit_cost,
      } = item ?? {};

      return product_qties.map((qty, i) => ({
        id: `${index}-${i}`,
        name,
        sku,
        minQty: alert_qty,
        warehouse: qty.warehouses?.name ?? '',
        stock: qty.qty ?? 0,
        unitCost: product_prices?.length
          ? showCurrency(product_prices?.[i].selling_price, currency)
          : showCurrency(unit_cost, currency),
      }));
    }) ?? [];

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
      setOpenPrint={setOpenPrint}
    >
      <AlertProductTable
        newColumns={columns}
        keyword={keyword}
        searchParams={defaultParams}
      />

      <Modal
        title={
          <div className="flex items-center gap-4 mb-10">
            <h2>Print Report</h2>
            <Button
              key={'print'}
              type="primary"
              onClick={handlePrint}
              className="px-12 py-4"
            >
              Print
            </Button>
          </div>
        }
        open={openPrint}
        onCancel={() => setOpenPrint(false)}
        footer={null}
        width={1100}
      >
        <div ref={printRef} className="p-10">
          <CustomPrintTable data={dataSource} />
        </div>
      </Modal>
    </GlobalContainer>
  );
};
