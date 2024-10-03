import { Button, Modal, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { PurchaseReportTable } from '../../../components/Report/PurchaseReportTable';
import { WarehouseFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import CustomPrintTable from '../../../components/Shared/Table/CustomPrintTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { useCurrentUser } from '../../../redux/services/auth/authSlice';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetAllPurchaseQuery } from '../../../redux/services/purchase/purchaseApi';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFormatDate } from '../../../utilities/hooks/useFormatDate';
import { useFilterParams } from '../../../utilities/hooks/useParams';
import { showCurrency } from '../../../utilities/lib/currency';
import { formatDate } from '../../../utilities/lib/dateFormat';
import { getDateRange } from '../../../utilities/lib/getDateRange';

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'product',
    key: 'product',
    render: (product) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {product}
      </span>
    ),
  },
  {
    title: 'Purchased Qty',
    dataIndex: 'purchasedQty',
    key: 'purchasedQty',
    render: (qty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{qty}</span>
    ),
  },
  {
    title: 'Purchased Amount',
    dataIndex: 'purchaseAmount',
    key: 'purchaseAmount',
    render: (amount) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
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
      <span className="text-dark   text-xs font-medium md:text-sm">
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
      <span className="text-dark   text-xs font-medium md:text-sm">
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
      purchase_daterange: dateRange,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  const defaultParams = {
    warehouse_ids: searchParams?.warehouse_ids ?? [warehouseId],
    purchase_daterange:
      searchParams?.created_daterange ?? getDateRange(segment),
  };

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Purchase Details',
  });

  const [openPrint, setOpenPrint] = useState(false);

  const { data } = useGetAllPurchaseQuery({ params: { child: 1, parent: 1 } });
  const currency = useSelector(useCurrency);
  const format = useFormatDate();

  const dataSource =
    data?.results?.purchase?.map((item, index) => {
      const {
        purchase_products,
        grand_total,
        purchase_at,
        total_qty,
        warehouses,
      } = item ?? {};

      const date = formatDate(purchase_at, format);

      return purchase_products?.flatMap((item, i) => ({
        id: `${i}-${index + 1}`,
        product: item?.product_variants?.name,
        warehouse: warehouses?.name,
        purchased_qty: total_qty,
        purchased_at: date,
        purchase_amount: showCurrency(grand_total, currency),
      }));
    }) ?? [];
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
      setOpenPrint={setOpenPrint}
    >
      <PurchaseReportTable
        newColumns={columns}
        searchParams={defaultParams}
        keyword={keyword}
      />
      {openPrint && (
        <Modal
          title={
            <div className="flex items-center gap-4">
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
          <div ref={printRef} className="px-10">
            <CustomPrintTable data={dataSource} />
          </div>
        </Modal>
      )}
    </GlobalContainer>
  );
};
