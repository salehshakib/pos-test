import { Button, Col, Descriptions, Empty, Form, Row, Spin, Tabs } from 'antd';
import { useEffect, useState } from 'react';

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

  return (
    <GlobalContainer
      pageTitle="Supplier Report"
      popoverWidth={400}
      debounce={debounce}
      setParams={setParams}
      segment={segment}
      onSegmentChange={onSegmentChange}
      searchFilterContent={<SearchFilterComponent />}
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
                  title="Customer Details"
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
    </GlobalContainer>
  );
};
