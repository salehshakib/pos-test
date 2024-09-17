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
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
} from '../../../redux/services/product/productApi';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useDetailsLayout } from '../../../utilities/hooks/useDetailsLayout';
import {
  DEFAULT_SELECT_VALUES,
  useFilterParams,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { getDateRange } from '../../../utilities/lib/getDateRange';
import { ExpenseTable } from './components/ExpenseTable';
import { PurchaseReturnTable } from './components/PurchaseReturnTable';
import { PurchaseTable } from './components/PurchaseTable';
import { QuotationTable } from './components/QutationTable';
import { SaleReturnTable } from './components/SaleReturnTable';
import { SaleTable } from './components/SaleTable';

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

  const { data, isLoading } = useGetAllProductsQuery({ params });

  const options = data?.results?.product?.map((product) => ({
    value: product?.id?.toString(),
    label: product?.name,
  }));

  const handleSubmit = (values) => {
    setSupplierId(values?.product_id);
    hideModal();
  };

  return (
    <CustomModal
      title="Select Product"
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
              placeholder={'Product'}
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

  const { data, isFetching } = useGetProductDetailsQuery(
    {
      id: productId,
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
    product_id: searchParams?.product_id ? searchParams?.product_id : data?.id,
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
                      <div>{parse(data?.details)}</div>
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
                items={[
                  {
                    label: 'Sale',
                    key: 'sale',
                    children: <SaleTable {...props} summary={'product,sale'} />,
                  },
                  {
                    label: 'Purchase',
                    key: 'purchase',
                    children: (
                      <PurchaseTable {...props} summary={'product,purchase'} />
                    ),
                  },
                  {
                    label: 'Quotation',
                    key: 'quotation',
                    children: (
                      <QuotationTable
                        {...props}
                        summary={'product,quotation'}
                      />
                    ),
                  },
                  {
                    label: 'Purchase Return',
                    key: 'purchasereturn',
                    children: (
                      <PurchaseReturnTable
                        {...props}
                        summary={'product,purchasereturn'}
                      />
                    ),
                  },
                  {
                    label: 'Sale Return',
                    key: 'salereturn',
                    children: (
                      <SaleReturnTable
                        {...props}
                        summary={'product,salereturn'}
                      />
                    ),
                  },
                  {
                    label: 'Expense',
                    key: 'expense',
                    children: (
                      <ExpenseTable {...props} summary={'product,expense'} />
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
          {productId && (
            <>
              <div ref={printRef} className="p-10">
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
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-center font-bold text-xl mt-4">
                      Sell Table
                    </span>
                    <SaleTable
                      {...props}
                      pagination={false}
                      summary={'product,sale'}
                    />
                    <span className="text-center font-bold text-xl mt-4">
                      Purchase Table
                    </span>
                    <PurchaseTable
                      {...props}
                      pagination={false}
                      summary={'product,purchase'}
                    />
                    <span className="text-center font-bold text-xl mt-4">
                      Quotation Table
                    </span>
                    <QuotationTable {...props} summary={'product,quotation'} />
                    <span className="text-center font-bold text-xl mt-4">
                      Purchase Return Table
                    </span>
                    <PurchaseReturnTable
                      {...props}
                      summary={'product,purchasereturn'}
                    />
                    <span className="text-center font-bold text-xl mt-4">
                      Sell Return Table
                    </span>
                    <SaleReturnTable
                      {...props}
                      summary={'product,salereturn'}
                    />
                    <span className="text-center font-bold text-xl mt-4">
                      Expense Table
                    </span>
                    <ExpenseTable {...props} summary={'product,expense'} />
                  </div>
                ) : (
                  <Empty />
                )}
              </div>
            </>
          )}
        </Modal>
      </GlobalContainer>
    </>
  );
};
