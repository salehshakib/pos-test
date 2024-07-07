import { Col, Form, Row, Segmented, theme } from "antd";
import { BiCategoryAlt } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdAddShoppingCart, MdOutlineNumbers, MdPaid } from "react-icons/md";
import { PiWarehouse } from "react-icons/pi";
import { TbBrandAirtable } from "react-icons/tb";
import { useSelector } from "react-redux";
import { AreaChartComponent } from "../../../components/Charts/AreaChart";
import { BarChartComponent } from "../../../components/Charts/BarChart";
import { ComposedChartComponent } from "../../../components/Charts/ComposedChart";
import { PeiChartComponent } from "../../../components/Charts/PeiChart";
import { PieChartWithLabel } from "../../../components/Charts/PieChartWithLabel";
import { RadarChartComponent } from "../../../components/Charts/RadarChart";
import { SimpleBarChartComponent } from "../../../components/Charts/SimpleBarChart";
import CustomForm from "../../../components/Shared/Form/CustomForm";
import CustomSelect from "../../../components/Shared/Select/CustomSelect";
import { StatisticComponent } from "../../../components/Shared/Statistic/Statistic";
import { fullColLayout, rowLayout } from "../../../layout/FormLayout";
import { useCurrentUser } from "../../../redux/services/auth/authSlice";
import { useCurrency } from "../../../redux/services/pos/posSlice";
import { useGetWarehousesQuery } from "../../../redux/services/warehouse/warehouseApi";
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from "../../../utilities/hooks/useParams";

const DashboardCard = ({ title, icon, data, currency }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-md hover:cursor-pointer hover:shadow-lg ">
      <div className="flex items-center justify-start gap-5">
        {icon && <div className="flex items-center">{icon}</div>}
        <div className={` font-semibold text-[16px]`}>
          <div className="flex flex-col">
            <div>{title}</div>
            <div className="flex items-center gap-2">
              {currency?.position.toString() === "0" ? (
                <span className="text-sm">{currency?.name}</span>
              ) : (
                ""
              )}
              <StatisticComponent value={data} />{" "}
              {currency?.position.toString() === "1" ? (
                <span className="text-sm">{currency?.name}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExtraComponent = () => {
  const [dashboardForm] = Form.useForm();

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetWarehousesQuery({ params });

  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse?.id?.toString(),
    label: warehouse?.name,
  }));

  return (
    <CustomForm form={dashboardForm} submitBtn={false}>
      <Row {...rowLayout} className="grid grid-cols-2 items-center">
        <Col {...fullColLayout} className="">
          {/* <WarehouseComponent label={false} /> */}
          <CustomSelect
            showSearch={true}
            isLoading={isLoading}
            options={options}
            placeholder={"Warehouse"}
            name={"warehouse_ids"}
            customStyle={true}
            mode="multiple"
          />
        </Col>
        <Col {...fullColLayout} className="">
          <Form.Item name="date_range" noStyle>
            <Segmented
              size="large"
              className="mt-1"
              options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
              style={
                {
                  // backgroundColor: "white",
                }
              }
            />
          </Form.Item>
        </Col>
      </Row>
    </CustomForm>
  );
};

const CashStatistic = () => {
  const currency = useSelector(useCurrency);
  const { token } = theme.useToken();

  const iconProps = {
    size: 40,
    color: token.colorPrimary,
  };
  return (
    <div className="space-y-3">
      <span className="font-semibold text-lg">Cash Statistic</span>
      <div className="space-y-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <DashboardCard
            title={"Total Purchase"}
            icon={<MdOutlineNumbers {...iconProps} />}
            data={"N/A"}
          />
          <DashboardCard
            title={"Total Sales"}
            icon={<MdOutlineNumbers {...iconProps} />}
            data={"N/A"}
          />
          <DashboardCard
            title={"Total Purchase Returned"}
            icon={<MdOutlineNumbers {...iconProps} />}
            data={"N/A"}
          />
          <DashboardCard
            title={"Total Sale Returned"}
            icon={<MdOutlineNumbers {...iconProps} />}
            data={"N/A"}
          />
          <DashboardCard
            title={"Total Purchase Amount"}
            icon={<FaMoneyBillWave {...iconProps} />}
            data={500}
            currency={currency}
          />
          <DashboardCard
            title={"Total Purchase Due"}
            icon={<MdPaid {...iconProps} />}
            data={0}
            currency={currency}
          />

          <DashboardCard
            title={"Total Sales Amount"}
            icon={<FaMoneyBillWave {...iconProps} />}
            data={0}
            currency={currency}
          />
          <DashboardCard
            title={"Total Sales Due"}
            icon={<MdPaid {...iconProps} />}
            data={0}
            currency={currency}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <DashboardCard title={"Today's Payment Received"} />
          <DashboardCard title={"Today's Payment Sent"} />
          <DashboardCard title={"Today's Total Expense"} />
        </div>
      </div>
    </div>
  );
};

const WarehouseStatistic = () => {
  const { token } = theme.useToken();

  const iconProps = {
    size: 40,
    color: token.colorPrimary,
  };

  return (
    <div className="space-y-3">
      <span className="font-semibold text-lg">Warehouse</span>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <DashboardCard
          title={"Warehouse"}
          icon={<PiWarehouse {...iconProps} />}
          data={"N/A"}
        />{" "}
        <DashboardCard
          title={"Product"}
          icon={<MdAddShoppingCart {...iconProps} />}
          data={"N/A"}
        />
        <DashboardCard
          title={"Category"}
          icon={<BiCategoryAlt {...iconProps} />}
          data={"N/A"}
        />
        <DashboardCard
          title={"Brand"}
          icon={<TbBrandAirtable {...iconProps} />}
          data={"N/A"}
        />
      </div>
    </div>
  );
};

const PeopleStatistic = () => {
  return (
    <div className="space-y-3">
      <span className="font-semibold text-lg">People</span>
      <div className="grid grid-cols-3 gap-3">
        <DashboardCard title={"Customer"} data={"N/A"} />
        <DashboardCard title={"Supplier"} data={"N/A"} />
        <DashboardCard title={"Cashier"} data={"N/A"} />
      </div>
    </div>
  );
};

const EmployeeStatistic = () => {
  return (
    <div className="space-y-3">
      <span className="font-semibold text-lg">HRM</span>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <DashboardCard title={"Department"} data={"N/A"} />
        <DashboardCard title={"Employee"} data={"N/A"} />
        <DashboardCard title={"Payroll"} data={"N/A"} />
        <DashboardCard title={"Leave Granted"} data={"N/A"} />
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { token } = theme.useToken();

  // const iconProps = {
  //   size: 40,
  //   color: token.colorPrimary,
  // };

  const user = useSelector(useCurrentUser);

  return (
    <div className=" h-full">
      <div className="p-5">
        <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center justify-between pb-5 mt-1">
          <div
            className="text-2xl font-semibold"
            style={{
              color: token.colorPrimary,
            }}
          >
            Welcome, {user?.employees?.name}
          </div>

          <ExtraComponent />
        </div>
        <div className="space-y-6">
          <CashStatistic />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <WarehouseStatistic />
            <PeopleStatistic />
          </div>

          <EmployeeStatistic />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"></div>
      </div>
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="py-5 w-full h-96">
          <AreaChartComponent />
        </div>
        <div className="py-5 w-full h-96">
          <BarChartComponent />
        </div>
        <div className="py-5 w-full h-96">
          <ComposedChartComponent />
        </div>
        <div className="py-5 w-full h-96">
          <div className="w-full h-96 grid grid-cols-1 lg:grid-cols-2">
            <PeiChartComponent />
            <PieChartWithLabel />
          </div>
        </div>
        <div className="py-5 w-full h-96">
          <RadarChartComponent />
        </div>
        <div className="py-5 w-full h-96">
          {/* <BarChartWithTooltip /> */}
          <SimpleBarChartComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
