import {
  Button,
  Col,
  Descriptions,
  Empty,
  Form,
  Modal,
  Row,
  Spin,
  Tabs,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { SupplierFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import CustomForm from '../../../components/Shared/Form/CustomForm';
import CustomModal from '../../../components/Shared/Modal/CustomModal';
import CustomSelect from '../../../components/Shared/Select/CustomSelect';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { fullColLayout, rowLayout } from '../../../layout/FormLayout';
import {
  useGetAllSupplierQuery,
  useGetSupplierDetailsQuery,
} from '../../../redux/services/supplier/supplierApi';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useDetailsLayout } from '../../../utilities/hooks/useDetailsLayout';
import {
  DEFAULT_SELECT_VALUES,
  useFilterParams,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { getDateRange } from '../../../utilities/lib/getDateRange';
import { PurchaseReturnTable } from './components/PurchaseReturnTable';
import { PurchaseTable } from './components/PurchaseTable';
import { QuotationTable } from './components/QutationTable';
import { SaleReturnTable } from './components/SaleReturnTable';
import PurchasePrintTable from './data/PurchasePrintTable';
import PurchaseReturnPrintTable from './data/PurchaseReturnPrintTable';
import QuotaionPrintTable from './data/QuotaionPrintTable';
import SaleReturnPrintTable from './data/SaleReturnPrintTable';

const SearchFilterComponent = () => {
  return (
    <Row {...rowLayout}>
      <SupplierFilter fullLayout={true} multiple={false} />
    </Row>
  );
};

const SupplierModal = ({ setSupplierId, open, setOpen }) => {
  const [supplierForm] = Form.useForm();

  const hideModal = () => {
    setOpen(false);
  };

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllSupplierQuery({ params });

  const options = data?.results?.supplier?.map((supplier) => ({
    value: supplier?.id?.toString(),
    label: supplier?.name,
  }));

  const handleSubmit = (values) => {
    setSupplierId(values?.supplier_id);
    hideModal();
  };

  return (
    <CustomModal
      title="Select Supplier"
      openModal={open}
      hideModal={hideModal}
      showCloseButton={false}
      width={600}
    >
      <CustomForm
        Form={supplierForm}
        submitBtn={false}
        handleSubmit={handleSubmit}
      >
        <Row {...rowLayout}>
          <Col {...fullColLayout}>
            <CustomSelect
              // label="Supplier"
              placeholder={'Supplier'}
              options={options}
              isLoading={isLoading}
              required={true}
              name={'supplier_id'}
            />
          </Col>

          <Col {...fullColLayout}>
            <div className={`flex w-full items-center justify-end gap-3 py-5`}>
              <Button htmlType="submit" type="primary">
                Ok
              </Button>
            </div>
          </Col>
        </Row>
      </CustomForm>
    </CustomModal>
  );
};

export const SupplierReport = () => {
  const [open, setOpen] = useState(true);
  const [supplierId, setSupplierId] = useState(undefined);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  const { data, isFetching } = useGetSupplierDetailsQuery(
    {
      id: supplierId,
    },
    { skip: !supplierId }
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
    supplier_id: [
      searchParams?.supplier_ids ? searchParams?.supplier_ids : data?.id,
    ],
  };

  const supplierItems = [
    {
      key: '1',
      label: 'Supplier',
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
      children: data?.phone_number ? '+880 ' + data?.phone_number : '---',
      span: 24,
    },
    {
      key: '4',
      label: 'Country',
      children: data?.country ?? '---',
      span: 12,
    },
    {
      key: '6',
      label: 'City',
      children: data?.city ?? '---',
      span: 12,
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
    documentTitle: 'Supplier Details',
  });

  const [openPrint, setOpenPrint] = useState(false);
  const [key, setKey] = useState('purchase');

  const [openPurchasePrint, setOpenPurchasePrint] = useState(false);
  const [openQuotationPrint, setOpenQuotaionPrint] = useState(false);
  const [openPurchaseReturnPrint, setOpenPurchaseReturnPrint] = useState(false);
  const [openSaleReturnPrint, setOpenSaleReturnPrint] = useState(false);

  const handlePrintAction = () => {
    if (key === 'purchase') {
      setOpenPurchasePrint(true);
    } else if (key === 'quotation') {
      setOpenQuotaionPrint(true);
    } else if (key === 'purchasereturn') {
      setOpenPurchaseReturnPrint(true);
    } else if (key === 'salereturn') {
      setOpenSaleReturnPrint(true);
    }
  };

  return (
    <GlobalContainer
      pageTitle="Supplier Report"
      popoverWidth={400}
      debounce={debounce}
      setParams={setParams}
      segment={segment}
      onSegmentChange={onSegmentChange}
      searchFilterContent={<SearchFilterComponent />}
      setOpenPrint={setOpenPrint}
    >
      {!supplierId ? (
        <>
          <SupplierModal
            setSupplierId={setSupplierId}
            open={open}
            setOpen={setOpen}
          />
          <div className="flex w-full items-center justify-center py-5">
            <Button onClick={() => setOpen(true)}>Select Supplier</Button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-5 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-md border p-4 shadow-sm">
              {isFetching ? (
                <Spin className="flex h-full w-full items-center justify-center py-5" />
              ) : (
                <Descriptions
                  title="Supplier Details"
                  layout=""
                  items={supplierItems}
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
          {isFetching ? (
            <Spin className="flex h-full w-full items-center justify-center py-10" />
          ) : data ? (
            <Tabs
              defaultActiveKey="purchase"
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
                  label: 'Purchase',
                  key: 'purchase',
                  children: (
                    <PurchaseTable {...props} summary={'supplier,purchase'} />
                  ),
                },
                {
                  label: 'Quotation',
                  key: 'quotation',
                  children: (
                    <QuotationTable {...props} summary={'supplier,quotation'} />
                  ),
                },
                {
                  label: 'Purchase Return',
                  key: 'purchasereturn',
                  children: (
                    <PurchaseReturnTable
                      {...props}
                      summary={'supplier,purchase-return'}
                    />
                  ),
                },
                {
                  label: 'Sale Return',
                  key: 'salereturn',
                  children: (
                    <SaleReturnTable
                      {...props}
                      summary={'supplier,sale-return'}
                    />
                  ),
                },
              ]}
            />
          ) : (
            <Empty />
          )}
        </>
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
        {supplierId && (
          <>
            <div ref={printRef} className="p-10">
              <div className="mb-5 grid w-full grid-cols-1">
                <div className="rounded-md border p-4 shadow-sm">
                  {isFetching ? (
                    <Spin className="flex h-full w-full items-center justify-center py-5" />
                  ) : (
                    <Descriptions
                      title="Supplier Details"
                      layout=""
                      items={supplierItems}
                    />
                  )}
                </div>
              </div>
              {isFetching ? (
                <Spin className="flex h-full w-full items-center justify-center py-10" />
              ) : data ? (
                <div className="flex flex-col justify-center items-center">
                  <span className="text-center font-bold text-xl mt-4">
                    Purchase Details
                  </span>
                  <PurchasePrintTable
                    {...props}
                    showPaging={false}
                    summary={'supplier,purchase'}
                  />
                  <span className="text-center font-bold text-xl mt-4">
                    Quotation Details
                  </span>
                  <QuotaionPrintTable
                    {...props}
                    summary={'supplier,quotation'}
                    showPaging={false}
                  />
                  <span className="text-center font-bold text-xl mt-4">
                    Purchase Return Details
                  </span>
                  <PurchaseReturnPrintTable
                    {...props}
                    summary={'supplier,purchase-return'}
                    showPaging={false}
                  />
                  <span className="text-center font-bold text-xl mt-4">
                    Sell Return Details
                  </span>
                  <SaleReturnPrintTable
                    {...props}
                    summary={'supplier,sale-return'}
                    showPaging={false}
                  />
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </>
        )}
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
            summary={'supplier,purchase'}
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
            summary={'supplier,quotation'}
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
            summary={'supplier,purchase-return'}
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
            summary={'supplier,sale-return'}
            showPaging={false}
          />
        </div>
      </Modal>
    </GlobalContainer>
  );
};
