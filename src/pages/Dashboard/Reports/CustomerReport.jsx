import { Button, Col, Descriptions, Empty, Form, Row, Spin, Tabs } from 'antd';
import { useState } from 'react';
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
import { PurchaseReturnTable } from './components/PurchaseReturnTable';
import { QuotationTable } from './components/QutationTable';
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
            <div className={`w-full flex gap-3 justify-end items-center py-5`}>
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

  const summaryType = {
    customer_ids: [
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
      children: data?.phone_number ?? '---',
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
    summary: 'customer,sale',
  };

  return (
    <GlobalContainer
      pageTitle="Customer Report"
      popoverWidth={400}
      searchFilterContent={<SearchFilterComponent />}
      debounce={debounce}
      setParams={setParams}
    >
      {!customerId ? (
        <>
          <CustomerModal
            setCustomerId={setCustomerId}
            open={open}
            setOpen={setOpen}
          />
          <div className="w-full flex justify-center items-center py-5">
            <Button onClick={() => setOpen(true)}>Select Customer</Button>
          </div>
        </>
      ) : (
        <>
          <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            <div className="border rounded-md p-4 shadow-sm">
              {isFetching ? (
                <Spin className="w-full h-full flex justify-center items-center py-5" />
              ) : (
                <Descriptions
                  title="Supplier Details"
                  layout=""
                  items={customerItems}
                />
              )}
            </div>
            <div className="border rounded-md p-4 shadow-sm">
              {isFetching || loading ? (
                <Spin className="w-full h-full flex justify-center items-center " />
              ) : (
                <Descriptions title="Summary" items={summaryDetails} />
              )}
            </div>
          </div>

          {isFetching ? (
            <Spin className="w-full h-full flex justify-center items-center py-10" />
          ) : data ? (
            <Tabs
              defaultActiveKey="sale"
              items={[
                {
                  label: 'Sale',
                  key: 'sale',
                  children: <SaleTable {...props} />,
                },
                {
                  label: 'Quotation',
                  key: 'quotation',
                  children: <QuotationTable {...props} />,
                },
                {
                  label: 'Purchase Return',
                  key: 'purchasereturn',
                  children: <PurchaseReturnTable {...props} />,
                },
                {
                  label: 'Sale Return',
                  key: 'salereturn',
                  children: <SaleReturnTable {...props} />,
                },
              ]}
            />
          ) : (
            <Empty />
          )}
        </>
      )}
    </GlobalContainer>
  );
};
