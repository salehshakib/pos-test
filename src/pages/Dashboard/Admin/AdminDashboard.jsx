import { AreaChartComponent } from "../../../components/Charts/AreaChart";
import { BarChartComponent } from "../../../components/Charts/BarChart";
import { BarChartWithTooltip } from "../../../components/Charts/BarChartWithTooltip";
import { ComposedChartComponent } from "../../../components/Charts/ComposedChart";
import { PeiChartComponent } from "../../../components/Charts/PeiChart";
import { PieChartWithLabel } from "../../../components/Charts/PieChartWithLabel";
import { RadarChartComponent } from "../../../components/Charts/RadarChart";
import { SimpleBarChartComponent } from "../../../components/Charts/SimpleBarChart";

const AdminDashboard = () => {
  return (
    <div className=" h-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"></div>
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
