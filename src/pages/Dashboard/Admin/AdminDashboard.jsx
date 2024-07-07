import { AreaChartComponent } from "../../../components/Charts/AreaChart";
import { BarChartComponent } from "../../../components/Charts/BarChart";
import { ComposedChartComponent } from "../../../components/Charts/ComposedChart";
import { PeiChartComponent } from "../../../components/Charts/PeiChart";
import { PieChartWithLabel } from "../../../components/Charts/PieChartWithLabel";

const AdminDashboard = () => {
  return (
    <div className=" h-full">
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
          <AreaChartComponent />
        </div>
        <div className="py-5 w-full h-96">
          <BarChartComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
