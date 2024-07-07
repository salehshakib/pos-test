import { BiSolidPurchaseTag } from "react-icons/bi";
import { CgCalendarDue } from "react-icons/cg";
import { FaMoneyBillWave } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AreaChartComponent } from "../../../components/Charts/AreaChart";
import { BarChartComponent } from "../../../components/Charts/BarChart";
import { ComposedChartComponent } from "../../../components/Charts/ComposedChart";
import { PeiChartComponent } from "../../../components/Charts/PeiChart";
import { PieChartWithLabel } from "../../../components/Charts/PieChartWithLabel";
import { RadarChartComponent } from "../../../components/Charts/RadarChart";
import { SimpleBarChartComponent } from "../../../components/Charts/SimpleBarChart";
import { useCurrency } from "../../../redux/services/pos/posSlice";
import { showCurrency } from "../../../utilities/lib/currency";
import { Col, Form, Row, Segmented, Space, theme } from "antd";
import { MdOutlineNumbers } from "react-icons/md";
import { useCurrentUser } from "../../../redux/services/auth/authSlice";
import CustomForm from "../../../components/Shared/Form/CustomForm";
import { fullColLayout, rowLayout } from "../../../layout/FormLayout";

const DashboardCard = ({ title, icon, data }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-md hover:cursor-pointer hover:shadow-lg ">
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex items-center ">{icon}</div>
        <div className="col-span-2 font-semibold text-[16px]">
          <div className="flex flex-col gap-2">
            <div>{title}</div>
            <div>{data}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExtraComponent = () => {
  const [dashboardForm] = Form.useForm();
  return (
    <CustomForm form={dashboardForm} submitBtn={false}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <Form.Item name="date" noStyle>
            <Segmented
              size="large"
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

const AdminDashboard = () => {
  const currency = useSelector(useCurrency);
  const { token } = theme.useToken();

  const iconProps = {
    size: 40,
    color: token.colorPrimary,
  };

  const user = useSelector(useCurrentUser);

  return (
    <div className=" h-full">
      <div className="p-5">
        <div className="flex items-center justify-between pb-5">
          <div
            className="text-2xl font-semibold"
            style={{
              color: token.colorPrimary,
            }}
          >
            Welcome, {user?.employees?.name}
          </div>

          <div>
            <ExtraComponent />
          </div>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <DashboardCard
              title={"Total Purchase"}
              icon={<MdOutlineNumbers {...iconProps} />}
              data={"N/A"}
            />
            <DashboardCard
              title={"Total Sales"}
              icon={<BiSolidPurchaseTag {...iconProps} />}
              data={"N/A"}
            />
            <DashboardCard
              title={"Today's Total Purchase"}
              icon={<BiSolidPurchaseTag {...iconProps} />}
              data={"N/A"}
            />
            <DashboardCard
              title={"Today's Total Sales"}
              icon={<BiSolidPurchaseTag {...iconProps} />}
              data={"N/A"}
            />
            <DashboardCard
              title={"Total Purchase Amount"}
              icon={<FaMoneyBillWave {...iconProps} />}
              data={showCurrency("0", currency)}
            />
            <DashboardCard
              title={"Total Purchase Due"}
              icon={<CgCalendarDue {...iconProps} />}
              data={showCurrency("0", currency)}
            />

            <DashboardCard
              title={"Total Sales Amount"}
              icon={<CgCalendarDue {...iconProps} />}
              data={showCurrency("0", currency)}
            />
            <DashboardCard
              title={"Total Sales Due"}
              icon={<CgCalendarDue {...iconProps} />}
              data={showCurrency("0", currency)}
            />

            <DashboardCard title={"Today's Total Expense"} />
          </div>
          <div className="grid grid-cols-2  gap-3">
            <DashboardCard title={"Today's Payment Received"} />
            <DashboardCard title={"Today's Payment Sent"} />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"></div>
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
