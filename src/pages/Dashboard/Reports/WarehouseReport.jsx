import { Button, Descriptions, Empty, Modal, Row, Spin, Tabs } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { WarehouseFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { useCurrentUser } from '../../../redux/services/auth/authSlice';
import { useGetWarehouseDetailsQuery } from '../../../redux/services/warehouse/warehouseApi';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useDetailsLayout } from '../../../utilities/hooks/useDetailsLayout';
import { useFilterParams } from '../../../utilities/hooks/useParams';
import { getDateRange } from '../../../utilities/lib/getDateRange';
import { ExpenseTable } from './components/ExpenseTable';
import { PurchaseReturnTable } from './components/PurchaseReturnTable';
import { PurchaseTable } from './components/PurchaseTable';
import { QuotationTable } from './components/QutationTable';
import { SaleReturnTable } from './components/SaleReturnTable';
import { SaleTable } from './components/SaleTable';
import ExpensePrintTable from './data/ExpensePrintTable';
import PurchasePrintTable from './data/PurchasePrintTable';
import PurchaseReturnPrintTable from './data/PurchaseReturnPrintTable';
import QuotaionPrintTable from './data/QuotaionPrintTable';
import SalePrintTable from './data/SalePrintTable';
import SaleReturnPrintTable from './data/SaleReturnPrintTable';

const SearchFilterComponent = () => {
  return (
    <Row {...rowLayout}>
      <WarehouseFilter fullLayout={true} multiple={false} />
    </Row>
  );
};

export const WarehouseReport = () => {
  const user = useSelector(useCurrentUser);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  const warehouseId = searchParams?.warehouse_ids ?? user?.warehouse_id;

  const { data, isFetching } = useGetWarehouseDetailsQuery(
    {
      id: warehouseId,
    },
    { skip: !warehouseId }
  );

  const [summaryData, setSummaryData] = useState({});
  const [loading, setLoading] = useState(false);

  const summaryDetails = useDetailsLayout(summaryData);

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

  const summaryType = {
    warehouse_id: searchParams?.warehouse_ids
      ? searchParams?.warehouse_ids
      : user?.warehouse_id,
  };

  const warehouseItems = [
    {
      key: '1',
      label: 'Warehouse',
      children: data?.name,
      span: 24,
    },
    {
      key: '2',
      label: 'Email',
      children: data?.email ?? '---',
      span: 24,
    },
    {
      key: '3',
      label: 'Phone Number',
      children: data?.phone ? '+880 ' + data?.phone : '---',
      span: 24,
    },
    {
      key: '5',
      label: 'Address',
      children: data?.address ?? '---',
      span: 24,
    },
  ];

  const props = {
    keyword,
    summaryType,
    setSummaryData,
    setLoading,
    searchParams,
    segment,
  };

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Warehouse Details',
  });

  const [openPrint, setOpenPrint] = useState(false);
  const [key, setKey] = useState('sale');

  const [openSalePrint, setOpenSalePrint] = useState(false);
  const [openPurchasePrint, setOpenPurchasePrint] = useState(false);
  const [openQuotationPrint, setOpenQuotaionPrint] = useState(false);
  const [openPurchaseReturnPrint, setOpenPurchaseReturnPrint] = useState(false);
  const [openSaleReturnPrint, setOpenSaleReturnPrint] = useState(false);
  const [openExpensePrint, setOpenExpensePrint] = useState(false);

  const handlePrintAction = () => {
    if (key === 'sale') {
      setOpenSalePrint(true);
    } else if (key === 'purchase') {
      setOpenPurchasePrint(true);
    } else if (key === 'quotation') {
      setOpenQuotaionPrint(true);
    } else if (key === 'purchasereturn') {
      setOpenPurchaseReturnPrint(true);
    } else if (key === 'salereturn') {
      setOpenSaleReturnPrint(true);
    } else if (key === 'expense') {
      setOpenExpensePrint(true);
    }
  };

  return (
    <GlobalContainer
      pageTitle="Warehouse Report"
      popoverWidth={400}
      debounce={debounce}
      setParams={setParams}
      segment={segment}
      onSegmentChange={onSegmentChange}
      searchFilterContent={<SearchFilterComponent />}
      setOpenPrint={setOpenPrint}
    >
      <div className="mb-5 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-md border p-4 shadow-sm">
          {isFetching ? (
            <Spin className="flex h-full w-full items-center justify-center py-5" />
          ) : (
            <Descriptions
              title="Warehouse Details"
              layout=""
              items={warehouseItems}
            />
          )}
        </div>
        <div className="rounded-md border p-4 shadow-sm">
          {isFetching || loading ? (
            <Spin className="flex h-full w-full items-center justify-center" />
          ) : (
            <Descriptions title="Summary" items={summaryDetails} />
          )}
        </div>
      </div>
      {data ? (
        <Tabs
          defaultActiveKey={'sale'}
          onChange={(key) => {
            setKey(key);
          }}
          tabBarExtraContent={
            <div className="flex items-center gap-4">
              <Button
                type="primary"
                className="mb-5 px-12"
                onClick={handlePrintAction}
              >
                Print
              </Button>
            </div>
          }
          items={[
            {
              label: 'Sale',
              key: 'sale',
              children: <SaleTable {...props} summary={'warehouse,sale'} />,
            },
            {
              label: 'Purchase',
              key: 'purchase',
              children: (
                <PurchaseTable {...props} summary={'warehouse,purchase'} />
              ),
            },
            {
              label: 'Quotation',
              key: 'quotation',
              children: (
                <QuotationTable {...props} summary={'warehouse,quotation'} />
              ),
            },
            {
              label: 'Purchase Return',
              key: 'purchasereturn',
              children: (
                <PurchaseReturnTable
                  {...props}
                  summary={'warehouse,purchase-return'}
                />
              ),
            },
            {
              label: 'Sale Return',
              key: 'salereturn',
              children: (
                <SaleReturnTable {...props} summary={'warehouse,sale-return'} />
              ),
            },
            {
              label: 'Expense',
              key: 'expense',
              children: (
                <ExpenseTable {...props} summary={'warehouse,expense'} />
              ),
            },
          ]}
        />
      ) : isFetching ? (
        <Spin className="flex h-full w-full items-center justify-center py-10" />
      ) : (
        <Empty />
      )}

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
        <>
          <div ref={printRef} className="p-10">
            <div className="mb-5 grid w-full grid-cols-1">
              <div className="rounded-md border p-4 shadow-sm">
                {isFetching ? (
                  <Spin className="flex h-full w-full items-center justify-center py-5" />
                ) : (
                  <Descriptions
                    title="Warehouse Details"
                    layout=""
                    items={warehouseItems}
                  />
                )}
              </div>
            </div>
            {isFetching ? (
              <Spin className="flex h-full w-full items-center justify-center py-10" />
            ) : data ? (
              <div className="flex flex-col justify-center items-center">
                <span className="text-center font-bold text-xl mt-4">
                  Sell Details
                </span>

                <SalePrintTable
                  {...props}
                  showPaging={false}
                  summary={'warehouse,sale'}
                />
                <span className="text-center font-bold text-xl mt-4">
                  Purchase Details
                </span>
                <PurchasePrintTable
                  {...props}
                  showPaging={false}
                  summary={'warehouse,purchase'}
                />
                <span className="text-center font-bold text-xl mt-4">
                  Quotation Details
                </span>
                <QuotaionPrintTable
                  {...props}
                  summary={'warehouse,quotation'}
                  showPaging={false}
                />
                <span className="text-center font-bold text-xl mt-4">
                  Purchase Return Details
                </span>
                <PurchaseReturnPrintTable
                  {...props}
                  summary={'warehouse,purchase-return'}
                  showPaging={false}
                />
                <span className="text-center font-bold text-xl mt-4">
                  Sell Return Details
                </span>
                <SaleReturnPrintTable
                  {...props}
                  summary={'warehouse,sale-return'}
                  showPaging={false}
                />
                <span className="text-center font-bold text-xl mt-4">
                  Expense Details
                </span>
                <ExpensePrintTable
                  {...props}
                  summary={'warehouse,expense'}
                  showPaging={false}
                />
              </div>
            ) : (
              <Empty />
            )}
          </div>
        </>
      </Modal>

      <Modal
        open={openSalePrint}
        onCancel={() => setOpenSalePrint(false)}
        footer={null}
        width={1000}
      >
        <Button onClick={handlePrint}>Print</Button>
        <div ref={printRef}>
          <SalePrintTable
            {...props}
            showPaging={false}
            summary={'warehouse,sale'}
          />
        </div>
      </Modal>

      <Modal
        open={openPurchasePrint}
        onCancel={() => setOpenPurchasePrint(false)}
        footer={null}
        width={1000}
      >
        <Button onClick={handlePrint}>Print</Button>
        <div ref={printRef}>
          <PurchasePrintTable
            {...props}
            showPaging={false}
            summary={'warehouse,purchase'}
          />
        </div>
      </Modal>

      <Modal
        open={openQuotationPrint}
        onCancel={() => setOpenQuotaionPrint(false)}
        footer={null}
        width={1000}
      >
        <Button onClick={handlePrint}>Print</Button>
        <div ref={printRef}>
          <QuotaionPrintTable
            {...props}
            summary={'warehouse,quotation'}
            showPaging={false}
          />
        </div>
      </Modal>

      <Modal
        open={openPurchaseReturnPrint}
        onCancel={() => setOpenPurchaseReturnPrint(false)}
        footer={null}
        width={1000}
      >
        <Button onClick={handlePrint}>Print</Button>
        <div ref={printRef}>
          <PurchaseReturnPrintTable
            {...props}
            summary={'warehouse,purchase-return'}
            showPaging={false}
          />
        </div>
      </Modal>

      <Modal
        open={openSaleReturnPrint}
        onCancel={() => setOpenSaleReturnPrint(false)}
        footer={null}
        width={1000}
      >
        <Button onClick={handlePrint}>Print</Button>
        <div ref={printRef}>
          <SaleReturnPrintTable
            {...props}
            summary={'warehouse,sale-return'}
            showPaging={false}
          />
        </div>
      </Modal>

      <Modal
        open={openExpensePrint}
        onCancel={() => setOpenExpensePrint(false)}
        footer={null}
        width={1000}
      >
        <Button onClick={handlePrint}>Print</Button>
        <div ref={printRef}>
          <ExpensePrintTable
            {...props}
            summary={'warehouse,expense'}
            showPaging={false}
          />
        </div>
      </Modal>
    </GlobalContainer>
  );
};
