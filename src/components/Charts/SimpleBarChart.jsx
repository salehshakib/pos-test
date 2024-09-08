import { theme } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useGetSalePurchaseChartQuery } from '../../redux/services/dashboard/dashboardApi';

const data = [
  {
    name: 'January',
    sale: 4000,
    purchase: 2400,
    amt: 2400,
  },
  {
    name: 'February',
    sale: 3000,
    purchase: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    sale: 2000,
    purchase: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    sale: 2780,
    purchase: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    sale: 1890,
    purchase: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    sale: 2390,
    purchase: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    sale: 3490,
    purchase: 4300,
    amt: 2100,
  },
  {
    name: 'August',
    sale: 3190,
    purchase: 4100,
    amt: 2300,
  },
  {
    name: 'September',
    sale: 2590,
    purchase: 3500,
    amt: 2400,
  },
  {
    name: 'October',
    sale: 2790,
    purchase: 3200,
    amt: 2200,
  },
  {
    name: 'November',
    sale: 1990,
    purchase: 2800,
    amt: 2100,
  },
  {
    name: 'December',
    sale: 2190,
    purchase: 3300,
    amt: 2300,
  },
];

export const SimpleBarChartComponent = ({ params }) => {
  const { token } = theme.useToken();

  const { data: chartData, isLoading } = useGetSalePurchaseChartQuery(
    {
      params: {
        start_date: params?.date_range[0],
        end_date: params?.date_range[1],
        warehouse_ids: params?.warehouse_ids,
      },
    }
    // {
    //   skip: params?.warehouse_ids?.length === 0 || !params?.warehouse_ids,
    // }
  );

  const modifiedData =
    chartData?.months?.map((item, index) => {
      return {
        name: item,
        purchase: parseFloat(chartData?.purchase?.[index]) || 0,
        sale: parseFloat(chartData?.sale?.[index]) || 0,
      };
    }) ?? [];

  return (
    <div className="h-full w-full pb-10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={modifiedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="purchase"
            fill={token.colorPrimary}
            activeBar={<Rectangle fill="pink" stroke={token.colorPrimary} />}
          />
          <Bar
            dataKey="sale"
            fill={token.secondaryColor}
            activeBar={<Rectangle fill="gold" stroke={token.secondaryColor} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
