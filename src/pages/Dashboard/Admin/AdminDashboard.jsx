import { Col, Form, Row, Segmented, Tag, theme } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaBuilding, FaMoneyBillWave } from 'react-icons/fa';
import { FaChalkboardUser, FaPeopleRoof } from 'react-icons/fa6';
import { LiaCashRegisterSolid } from 'react-icons/lia';
import {
  MdAddShoppingCart,
  MdOutlineNumbers,
  MdPaid,
  MdPayment,
} from 'react-icons/md';
import { PiUserList, PiWarehouse } from 'react-icons/pi';
import { SlCalender, SlWallet } from 'react-icons/sl';
import { TbBrandAirtable } from 'react-icons/tb';
import { useSelector } from 'react-redux';

import { SimpleBarChartComponent } from '../../../components/Charts/SimpleBarChart';
import CustomForm from '../../../components/Shared/Form/CustomForm';
import CustomSelect from '../../../components/Shared/Select/CustomSelect';
import { StatisticComponent } from '../../../components/Shared/Statistic/Statistic';
import { fullColLayout, rowLayout } from '../../../layout/FormLayout';
import { useCurrentUser } from '../../../redux/services/auth/authSlice';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetDashboardCounterQuery } from '../../../redux/services/reports/summaryApi';
import { useGetWarehousesQuery } from '../../../redux/services/warehouse/warehouseApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { getDateRange } from '../../../utilities/lib/getDateRange';
import { ExpiredItemsComponent } from './overview/ExpiredItemsComponent';
import { RecentlyAddedComponent } from './overview/RecentlyAddedComponent';
import { StockAlertComponent } from './overview/StockAlertComponent';

const DashboardCard = ({ title, icon, data, currency }) => {
  return (
    <div className="rounded-lg bg-white p-5 shadow-md hover:cursor-pointer hover:shadow-lg">
      <div className="flex items-center justify-start gap-5">
        {icon && <div className="flex items-center">{icon}</div>}
        <div className={`text-[16px] font-semibold`}>
          <div className="flex flex-col">
            <div>{title}</div>
            <div className="flex items-center gap-2">
              {currency?.position.toString() === '0' ? (
                <span className="text-sm">{currency?.name}</span>
              ) : (
                ''
              )}
              <StatisticComponent value={data} />{' '}
              {currency?.position.toString() === '1' ? (
                <span className="text-sm">{currency?.name}</span>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExtraComponent = ({ setParams, setWarehouses }) => {
  const [dashboardForm] = Form.useForm();

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetWarehousesQuery({ params });

  const options = useMemo(
    () =>
      data?.results?.warehouse?.map((warehouse) => ({
        value: warehouse?.id?.toString(),
        label: warehouse?.name,
      })) || [],
    [data]
  );

  useEffect(() => {
    dashboardForm.setFieldsValue({
      date_range: 'Weekly',
    });
  }, [dashboardForm]);

  useEffect(() => {
    if (options.length) {
      const warehouseIds = options.map((option) => option.value);
      setParams((prevParams) => ({
        ...prevParams,
        warehouse_ids: warehouseIds,
      }));

      const warehouseName = options.map((option) => option.label);

      setWarehouses(warehouseName);
    }
  }, [options, setParams, setWarehouses]);

  const onDateRangeChange = useCallback(
    (value) => {
      const dateRange = getDateRange(value);
      setParams((prevParams) => ({ ...prevParams, date_range: dateRange }));
    },
    [setParams]
  );

  const onWarehouseChange = useCallback(
    (value) => {
      if (value?.length) {
        setParams((prevParams) => ({ ...prevParams, warehouse_ids: value }));

        const warehouseNames = value
          .map((id) => options.find((option) => option.value === id)?.label)
          .filter(Boolean);

        setWarehouses(warehouseNames);
      } else {
        const warehouseIds = options.map((option) => option.value);

        setParams((prevParams) => ({
          ...prevParams,
          warehouse_ids: warehouseIds,
        }));

        const warehouseName = options.map((option) => option.label);

        setWarehouses(warehouseName);
      }
    },
    [options, setParams, setWarehouses]
  );

  return (
    <CustomForm form={dashboardForm} submitBtn={false}>
      <Row
        {...rowLayout}
        gutter={0}
        className="grid grid-cols-1 items-center gap-2 space-x-2 lg:gap-0 xl:grid-cols-2"
      >
        <Col {...fullColLayout} className="">
          <CustomSelect
            showSearch={true}
            isLoading={isLoading}
            options={options}
            placeholder={'Warehouse'}
            name={'warehouse_ids'}
            customStyle={true}
            mode="multiple"
            onChange={onWarehouseChange}
          />
        </Col>
        <Col {...fullColLayout} className="">
          <Form.Item name="date_range" noStyle>
            <Segmented
              size="large"
              className="mt-1"
              options={['Daily', 'Weekly', 'Monthly', 'Yearly']}
              onChange={onDateRangeChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </CustomForm>
  );
};

const CashStatistic = ({ data }) => {
  const currency = useSelector(useCurrency);
  const { token } = theme.useToken();

  const iconProps = {
    size: 40,
    color: token.colorPrimary,
  };

  return (
    <div className="space-y-3">
      <span className="text-lg font-semibold">Transactions </span>
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title={'Total Purchase'}
            icon={<MdOutlineNumbers {...iconProps} />}
            data={data?.purchase}
          />
          <DashboardCard
            title={'Total Sales'}
            icon={<MdOutlineNumbers {...iconProps} />}
            data={data?.sale}
          />
          <DashboardCard
            title={'Total Purchase Returned'}
            icon={<MdOutlineNumbers {...iconProps} />}
            data={data?.purchase_return}
          />
          <DashboardCard
            title={'Total Sale Returned'}
            icon={<MdOutlineNumbers {...iconProps} />}
            data={data?.sale_return}
          />
          <DashboardCard
            title={'Total Purchase Amount'}
            icon={<FaMoneyBillWave {...iconProps} />}
            currency={currency}
            data={data?.total_purchase}
          />
          <DashboardCard
            title={'Total Purchase Due'}
            icon={<MdPaid {...iconProps} />}
            currency={currency}
            data={0}
          />

          <DashboardCard
            title={'Total Sales Amount'}
            icon={<FaMoneyBillWave {...iconProps} />}
            currency={currency}
            data={data?.total_sale}
          />
          <DashboardCard
            title={'Total Sales Due'}
            icon={<MdPaid {...iconProps} />}
            data={0}
            currency={currency}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          <DashboardCard
            title={'Petty Cash'}
            icon={<SlWallet {...iconProps} />}
          />
          <DashboardCard
            title={'Total Expense'}
            icon={<SlWallet {...iconProps} />}
          />
        </div>
      </div>
    </div>
  );
};

const WarehouseStatistic = ({ data }) => {
  const { token } = theme.useToken();

  const iconProps = {
    size: 40,
    color: token.colorPrimary,
  };

  return (
    <div className="space-y-3">
      <span className="text-lg font-semibold">Inventory</span>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <DashboardCard
          title={'Warehouse'}
          icon={<PiWarehouse {...iconProps} />}
          data={data?.active_warehouse}
        />
        <DashboardCard
          title={'Product'}
          icon={<MdAddShoppingCart {...iconProps} />}
          data={data?.active_product}
        />
        <DashboardCard
          title={'Category'}
          icon={<BiCategoryAlt {...iconProps} />}
          data={data?.active_category}
        />
        <DashboardCard
          title={'Brand'}
          icon={<TbBrandAirtable {...iconProps} />}
          data={data?.active_brand}
        />
      </div>
    </div>
  );
};

const PeopleStatistic = ({ data }) => {
  const { token } = theme.useToken();

  const iconProps = {
    size: 40,
    color: token.colorPrimary,
  };

  return (
    <div className="space-y-3">
      <span className="text-lg font-semibold">People</span>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <DashboardCard
          title={'Customer'}
          icon={<PiUserList {...iconProps} />}
          data={data?.active_customer}
        />
        <DashboardCard
          title={'Supplier'}
          icon={<FaChalkboardUser {...iconProps} />}
          data={data?.active_supplier}
        />
        <DashboardCard
          title={'Cashier'}
          icon={<LiaCashRegisterSolid {...iconProps} />}
          data={data?.active_cashier}
        />
      </div>
    </div>
  );
};

const EmployeeStatistic = ({ data }) => {
  const currency = useSelector(useCurrency);

  const { token } = theme.useToken();

  const iconProps = {
    size: 40,
    color: token.colorPrimary,
  };

  return (
    <div className="space-y-3">
      <span className="text-lg font-semibold">HRM</span>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title={'Department'}
          icon={<FaBuilding {...iconProps} />}
          data={data?.department}
        />
        <DashboardCard
          title={'Employee'}
          icon={<FaPeopleRoof {...iconProps} />}
          data={data?.employee}
        />
        <DashboardCard
          title={'Payroll'}
          currency={currency}
          icon={<MdPayment {...iconProps} />}
          data={data?.payroll}
        />
        <DashboardCard
          title={'Leave Granted'}
          icon={<SlCalender {...iconProps} />}
          data={data?.leave}
        />
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { token } = theme.useToken();

  const user = useSelector(useCurrentUser);

  const [warehouses, setWarehouses] = useState([]);

  const [params, setParams] = useState({
    date_range: getDateRange('Weekly'),
  });

  const { data } = useGetDashboardCounterQuery(
    {
      params: {
        warehouse_ids: params?.warehouse_ids,
        start_date: params?.date_range[0],
        end_date: params?.date_range[1],
      },
    },
    {
      skip: !params?.warehouse_ids,
    }
  );

  return (
    <div className="h-full">
      <div className="mb-6">
        <div className="mt-1 flex flex-col items-center justify-between gap-3 pb-5 lg:flex-row lg:gap-0">
          <div
            className="text-2xl font-semibold"
            style={{
              color: token.colorPrimary,
            }}
          >
            Welcome, {user?.name ?? user?.roles?.[0]?.name ?? 'User'}{' '}
            <span className="inline-block animate-wave ">👋</span>
          </div>

          <ExtraComponent setParams={setParams} setWarehouses={setWarehouses} />
        </div>

        <div className="flex w-full flex-wrap justify-end gap-2 py-2">
          {warehouses.map((warehouse, index) => {
            return (
              <Tag
                key={index}
                style={{ backgroundColor: token.colorPrimary, color: 'white' }}
              >
                {warehouse}
              </Tag>
            );
          })}
        </div>
        <div className="space-y-6">
          <CashStatistic data={data} />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <WarehouseStatistic data={data} />
            <PeopleStatistic data={data} />
          </div>

          <EmployeeStatistic data={data} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 gap-y-6 xl:grid-cols-2">
        <div className="h-[26rem] w-full rounded-lg bg-white p-5 py-5 shadow-md col-span-2">
          <div className="h-full w-full pb-4 text-center text-lg font-semibold">
            Purchase & Sale
            <SimpleBarChartComponent params={params} />
          </div>
        </div>
        <div className="h-[26rem] w-full rounded-lg bg-white shadow-md col-span-2">
          <StockAlertComponent />
        </div>

        <div className="h-[26rem] w-full rounded-lg bg-white shadow-md ">
          <RecentlyAddedComponent />
        </div>
        <div className="h-[26rem] w-full rounded-lg bg-white shadow-md">
          <ExpiredItemsComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
