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
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { ProductFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import CustomForm from '../../../components/Shared/Form/CustomForm';
import CustomModal from '../../../components/Shared/Modal/CustomModal';
import CustomSelect from '../../../components/Shared/Select/CustomSelect';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { fullColLayout, rowLayout } from '../../../layout/FormLayout';
import {
  useGetAllProductVariantsQuery,
  useGetProductVariantDetailsQuery,
} from '../../../redux/services/product/productApi';
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
import { SaleTable } from './components/SaleTable';
import PurchasePrintTable from './data/PurchasePrintTable';
import PurchaseReturnPrintTable from './data/PurchaseReturnPrintTable';
import QuotaionPrintTable from './data/QuotaionPrintTable';
import SalePrintTable from './data/SalePrintTable';
import SaleReturnPrintTable from './data/SaleReturnPrintTable';

const SearchFilterComponent = () => {
  return (
    <Row {...rowLayout}>
      <ProductFilter fullLayout={true} multiple={false} name="product_id" />
    </Row>
  );
};

const SupplierModal = ({ setSupplierId, open, setOpen }) => {
  const [productForm] = Form.useForm();

  const hideModal = () => {
    setOpen(false);
  };

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllProductVariantsQuery({ params });

  const options = data?.results?.productvariant?.map((product) => ({
    value: product?.id?.toString(),
    label: product?.name,
  }));

  const handleSubmit = (values) => {
    setSupplierId(values?.product_id);
    hideModal();
  };

  return (
    <CustomModal
      title="Select Product Variant"
      openModal={open}
      hideModal={hideModal}
      showCloseButton={false}
      width={600}
    >
      <CustomForm
        Form={productForm}
        submitBtn={false}
        handleSubmit={handleSubmit}
      >
        <Row {...rowLayout}>
          <Col {...fullColLayout}>
            <CustomSelect
              // label="Supplier"
              placeholder={'Product Variant'}
              options={options}
              isLoading={isLoading}
              required={true}
              name={'product_id'}
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

export const ProductReport = () => {
  const [open, setOpen] = useState(true);
  const [productId, setProductId] = useState(undefined);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  const { data, isFetching } = useGetProductVariantDetailsQuery(
    {
      id: productId,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !productId }
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
    product_variant_id: searchParams?.product_id
      ? searchParams?.product_id
      : data?.id,
  };

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
    documentTitle: 'Product Details',
  });

  const [openPrint, setOpenPrint] = useState(false);
  const [key, setKey] = useState('sale');

  const [openSalePrint, setOpenSalePrint] = useState(false);
  const [openPurchasePrint, setOpenPurchasePrint] = useState(false);
  const [openQuotationPrint, setOpenQuotaionPrint] = useState(false);
  const [openPurchaseReturnPrint, setOpenPurchaseReturnPrint] = useState(false);
  const [openSaleReturnPrint, setOpenSaleReturnPrint] = useState(false);

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
    }
  };

  return (
    <>
      <GlobalContainer
        pageTitle="Product Report"
        popoverWidth={400}
        debounce={debounce}
        setParams={setParams}
        segment={segment}
        onSegmentChange={onSegmentChange}
        searchFilterContent={<SearchFilterComponent />}
        setOpenPrint={setOpenPrint}
      >
        {!productId ? (
          <>
            <SupplierModal
              setSupplierId={setProductId}
              open={open}
              setOpen={setOpen}
            />
            <div className="flex w-full items-center justify-center py-5">
              <Button onClick={() => setOpen(true)}>Select Product</Button>
            </div>
          </>
        ) : (
          <div>
            <div className="mb-5 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-md border p-4 shadow-sm">
                {isFetching ? (
                  <Spin className="flex h-full w-full items-center justify-center py-5" />
                ) : (
                  <Descriptions title="Product Details" layout="">
                    <Descriptions.Item label="Product" key={1} span={24}>
                      <div>{data?.name}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Sku" key={2} span={24}>
                      <div>{data?.sku}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Type" key={3} span={24}>
                      <div>{data?.type}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Details" key={4} span={24}>
                      <div>{data?.details && parse(data?.details)}</div>
                    </Descriptions.Item>
                  </Descriptions>
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
                defaultActiveKey="sale"
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
                    children: (
                      <SaleTable {...props} summary={'product-variant,sale'} />
                    ),
                  },
                  {
                    label: 'Purchase',
                    key: 'purchase',
                    children: (
                      <PurchaseTable
                        {...props}
                        summary={'product-variant,purchase'}
                      />
                    ),
                  },
                  {
                    label: 'Quotation',
                    key: 'quotation',
                    children: (
                      <QuotationTable
                        {...props}
                        summary={'product-variant,quotation'}
                      />
                    ),
                  },
                  {
                    label: 'Purchase Return',
                    key: 'purchasereturn',
                    children: (
                      <PurchaseReturnTable
                        {...props}
                        summary={'product-variant,purchasereturn'}
                      />
                    ),
                  },
                  {
                    label: 'Sale Return',
                    key: 'salereturn',
                    children: (
                      <SaleReturnTable
                        {...props}
                        summary={'product-variant,salereturn'}
                      />
                    ),
                  },
                ]}
              />
            ) : (
              <Empty />
            )}
          </div>
        )}

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
          {productId && (
            <>
              <div ref={printRef}>
                <div className="mb-5 grid grid-cols-1 mt-10 w-5/6 mx-auto">
                  <div className="rounded-md border p-4 shadow-sm">
                    {isFetching ? (
                      <Spin className="flex h-full w-full items-center justify-center py-5" />
                    ) : (
                      <Descriptions title="Product Details" layout="">
                        <Descriptions.Item label="Product" key={1} span={24}>
                          <div>{data?.name}</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Sku" key={2} span={24}>
                          <div>{data?.sku}</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Type" key={3} span={24}>
                          <div>{data?.type}</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Details" key={4} span={24}>
                          <div>{data?.details && parse(data?.details)}</div>
                        </Descriptions.Item>
                      </Descriptions>
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
                      summary={'product-variant,sale'}
                    />
                    <span className="text-center font-bold text-xl mt-4">
                      Purchase Details
                    </span>
                    <PurchasePrintTable
                      {...props}
                      showPaging={false}
                      summary={'product-variant,purchase'}
                    />
                    <span className="text-center font-bold text-xl mt-4">
                      Quotation Details
                    </span>
                    <QuotaionPrintTable
                      {...props}
                      summary={'product-variant,quotation'}
                      showPaging={false}
                    />
                    <span className="text-center font-bold text-xl mt-4">
                      Purchase Return Details
                    </span>
                    <PurchaseReturnPrintTable
                      {...props}
                      summary={'product-variant,purchase-return'}
                      showPaging={false}
                    />
                    <span className="text-center font-bold text-xl mt-4">
                      Sell Return Details
                    </span>
                    <SaleReturnPrintTable
                      {...props}
                      summary={'product-variant,sale-return'}
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
              summary={'product-variant,sale'}
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
              summary={'product-variant,purchase'}
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
              summary={'product-variant,quotation'}
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
              summary={'product-variant,purchase-return'}
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
              summary={'product-variant,sale-return'}
              showPaging={false}
            />
          </div>
        </Modal>
      </GlobalContainer>
    </>
  );
};
