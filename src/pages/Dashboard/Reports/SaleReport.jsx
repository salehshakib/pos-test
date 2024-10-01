import { Button, Modal, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { SaleReportTable } from '../../../components/Report/SaleReportTable';
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
      <span className="text-dark   text-xs font-medium md:text-sm">
        {product}
      </span>
    ),
  },
  {
    title: 'Sold Amount',
    dataIndex: 'soldAmount',
    key: 'soldAmount',
    render: (amount) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {amount}
      </span>
    ),
  },
  {
    title: 'Sold Qty',
    dataIndex: 'soldQty',
    key: 'soldQty',
    render: (qty) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{qty}</span>
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
    title: 'Sale At',
    dataIndex: 'saleAt',
    key: 'saleAt',
    align: 'center',
    render: (saleAt) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {saleAt}
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

export const SaleReport = () => {
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
      sale_daterange: dateRange,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  const defaultParams = {
    warehouse_ids: searchParams?.warehouse_ids ?? [warehouseId],
    sale_daterange: searchParams?.created_daterange ?? getDateRange(segment),
  };

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Sale Details',
  });

  const [openPrint, setOpenPrint] = useState(false);

  return (
    <GlobalContainer
      pageTitle="Sell Report"
      columns={columns}
      popoverWidth={400}
      debounce={debounce}
      setParams={setParams}
      segment={segment}
      onSegmentChange={onSegmentChange}
      searchFilterContent={<SearchComponent />}
      setOpenPrint={setOpenPrint}
    >
      <SaleReportTable
        newColumns={columns}
        searchParams={defaultParams}
        keyword={keyword}
      />
      {openPrint && (
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
            <SaleReportTable
              newColumns={columns}
              searchParams={defaultParams}
              keyword={keyword}
            />
          </div>
        </Modal>
      )}
    </GlobalContainer>
  );
};
