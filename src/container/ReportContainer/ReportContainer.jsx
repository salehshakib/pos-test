import { PageContainer } from '@ant-design/pro-layout';
import { Col, Form, Row, Segmented, Space } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FilterDateRange } from '../../components/ReusableComponent/FilterDateRange';
import CustomForm from '../../components/Shared/Form/CustomForm';
import CustomSelect from '../../components/Shared/Select/CustomSelect';
import { rowLayout } from '../../layout/FormLayout';
import { useCurrentUser } from '../../redux/services/auth/authSlice';
import { useGetWarehousesQuery } from '../../redux/services/warehouse/warehouseApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import { GlobalUtilityStyle } from '../Styled';

const WarehouseComponent = ({ onChange }) => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const user = useSelector(useCurrentUser);
  const form = Form.useFormInstance();

  const { data, isLoading } = useGetWarehousesQuery({ params });

  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse?.id?.toString(),
    label: warehouse?.name,
  }));

  useEffect(() => {
    if (options?.length && !form?.getFieldValue('warehouse_id')) {
      form.setFieldValue('warehouse_id', user?.warehouse_id?.toString());
    }
  }, [form, options, user?.warehouse_id]);

  return (
    <CustomSelect
      isLoading={isLoading}
      placeholder={'Warehouse'}
      options={options}
      name={'warehouse_id'}
      customStyle={true}
      onChange={onChange}
    />
  );
};
export const ReportContainer = ({
  pageTitle,
  form,
  // searchFilterContent,
  onDateChange,
  segment = 'Weekly',
  onSegmentChange,
  onWarehouseChange,
  children,
}) => {
  const { pathname } = useLocation();

  return (
    <GlobalUtilityStyle>
      <div className="h-full">
        <PageContainer
          header={{
            title: <div className="text-2xl lg:text-3xl py-3">{pageTitle}</div>,
          }}
          extra={[
            !pathname.includes('reports/purchase-calender') &&
              !pathname.includes('reports/sale-calender') && (
                <Space key={'segment'}>
                  <Segmented
                    size="large"
                    className="mt-1"
                    options={['Daily', 'Weekly', 'Monthly', 'Yearly']}
                    value={segment}
                    onChange={onSegmentChange}
                    style={{
                      backgroundColor: '#f5f5f5',
                    }}
                  />
                </Space>
              ),
            <Space key="search" className="flex items-center">
              <CustomForm layout="horizontal" submitBtn={false} form={form}>
                <Row {...rowLayout} gutter={2}>
                  {!pathname.includes('calender') && (
                    <Col span={pathname.includes('reports/summary') ? 24 : 14}>
                      <FilterDateRange
                        customStyle={true}
                        name="daterange"
                        onChange={onDateChange}
                      />
                    </Col>
                  )}

                  {!pathname.includes('reports/summary') && (
                    <Col span={pathname.includes('calender') ? 24 : 10}>
                      <WarehouseComponent onChange={onWarehouseChange} />
                    </Col>
                  )}
                </Row>
              </CustomForm>
            </Space>,
          ]}
          content={children}
        />
      </div>
    </GlobalUtilityStyle>
  );
};
