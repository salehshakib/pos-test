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

import { CustomerFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import CustomForm from '../../../components/Shared/Form/CustomForm';
import CustomModal from '../../../components/Shared/Modal/CustomModal';
import CustomSelect from '../../../components/Shared/Select/CustomSelect';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { fullColLayout, rowLayout } from '../../../layout/FormLayout';
import {
  useGetAllCustomerQuery,
  useGetCustomerDetailsQuery,
} from '../../../redux/services/customer/customerApi';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useDetailsLayout } from '../../../utilities/hooks/useDetailsLayout';
import {
  DEFAULT_SELECT_VALUES,
  useFilterParams,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { getDateRange } from '../../../utilities/lib/getDateRange';
import { SaleReturnTable } from './components/SaleReturnTable';
import { SaleTable } from './components/SaleTable';

const SearchFilterComponent = () => {
  return (
    <Row {...rowLayout}>
      <CustomerFilter fullLayout={true} multiple={false} />
    </Row>
  );
};

const CustomerModal = ({ setCustomerId, open, setOpen }) => {
  const [supplierForm] = Form.useForm();

  const hideModal = () => {
    setOpen(false);
  };

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllCustomerQuery({ params });

  const options = data?.results?.customer?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  const handleSubmit = (values) => {
    setCustomerId(values?.customer_id);
    hideModal();
  };

  return (
    <CustomModal
      title="Select Customer"
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
              placeholder={'Customer'}
              options={options}
              isLoading={isLoading}
              required={true}
              name={'customer_id'}
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

export const CustomerReport = () => {
  const [open, setOpen] = useState(true);
  const [customerId, setCustomerId] = useState(undefined);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  const { data, isFetching } = useGetCustomerDetailsQuery(
    {
      id: customerId,
    },
    { skip: !customerId }
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
    customer_id: [
      searchParams?.customer_ids ? searchParams?.customer_ids : data?.id,
    ],
  };

  const customerItems = [
    {
      key: '1',
      label: 'Customer',
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
    documentTitle: 'Customer Details',
  });

  const [openPrint, setOpenPrint] = useState(false);

  return (
    <GlobalContainer
      pageTitle="Customer Report"
      popoverWidth={400}
      debounce={debounce}
      setParams={setParams}
      segment={segment}
      onSegmentChange={onSegmentChange}
      searchFilterContent={<SearchFilterComponent />}
      setOpenPrint={setOpenPrint}
    >
      {!customerId ? (
        <>
          <CustomerModal
            setCustomerId={setCustomerId}
            open={open}
            setOpen={setOpen}
          />
          <div className="flex w-full items-center justify-center py-5">
            <Button onClick={() => setOpen(true)}>Select Customer</Button>
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
                  title="Customer Details"
                  layout=""
                  items={customerItems}
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
              defaultActiveKey="sale"
              items={[
                {
                  label: 'Sale',
                  key: 'sale',
                  children: <SaleTable {...props} summary={'customer,sale'} />,
                },
                {
                  label: 'Sale Return',
                  key: 'salereturn',
                  children: (
                    <SaleReturnTable
                      {...props}
                      summary={'customer,sale-return'}
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
        {customerId && (
          <>
            <div ref={printRef} className="p-10">
              <div className="mb-5 grid w-full grid-cols-1">
                <div className="rounded-md border p-4 shadow-sm">
                  {isFetching ? (
                    <Spin className="flex h-full w-full items-center justify-center py-5" />
                  ) : (
                    <Descriptions
                      title="Customer Details"
                      layout=""
                      items={customerItems}
                    />
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
                    summary={'customer,sale'}
                    showPaging={false}
                    action={false}
                  />
                  <span className="text-center font-bold text-xl mt-4">
                    Sell Return Table
                  </span>
                  <SaleReturnTable
                    {...props}
                    summary={'customer,sale-return'}
                    showPaging={false}
                    action={false}
                  />
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </>
        )}
      </Modal>
    </GlobalContainer>
  );
};
