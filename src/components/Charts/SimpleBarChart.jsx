import { Spin, theme } from 'antd';
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

const formatDateName = (dateStr, format = 'day') => {
  const date = new Date(dateStr);
  const options = format === 'day' ? { weekday: 'long' } : { month: 'long' };
  return date.toLocaleString('en-US', options);
};

// Function to transform data based on date range
const transformChartData = (chartData) => {
  const dateRange = chartData?.periods?.length;

  if (dateRange <= 7) {
    // Case 1: Less than or equal to 7 days, return day name
    return chartData?.periods?.map((item, index) => ({
      name: formatDateName(item, 'day'),
      purchase: parseFloat(chartData.purchases[index]) || 0,
      sale: parseFloat(chartData.sales[index]) || 0,
    }));
  } else if (dateRange > 7 && dateRange < 30) {
    // Case 2: Between 7 and 30 days, return original date as name
    return chartData?.periods?.map((item, index) => ({
      name: item, // Use the original date as the name
      purchase: parseFloat(chartData.purchases[index]) || 0,
      sale: parseFloat(chartData.sales[index]) || 0,
    }));
  } else {
    // Case 3: More than 30 days, aggregate by month
    const monthlyData = chartData?.periods?.reduce((acc, item, index) => {
      const month = formatDateName(item, 'month');

      if (!acc[month]) {
        acc[month] = { purchase: 0, sale: 0 };
      }

      acc[month].purchase += parseFloat(chartData.purchases[index]) || 0;
      acc[month].sale += parseFloat(chartData.sales[index]) || 0;

      return acc;
    }, {});

    // Convert aggregated data into an array
    return Object.keys(monthlyData ?? {})?.map((month) => ({
      name: month,
      purchase: monthlyData[month].purchase,
      sale: monthlyData[month].sale,
    }));
  }
};

export const SimpleBarChartComponent = ({ params }) => {
  const { token } = theme.useToken();

  const { data: chartData, isFetching } = useGetSalePurchaseChartQuery(
    {
      params: {
        start_date: params?.date_range[0],
        end_date: params?.date_range[1],
        warehouse_ids: params?.warehouse_ids,
      },
    },
    {
      skip: params?.warehouse_ids?.length === 0 || !params?.warehouse_ids,
    }
  );

  const modifiedData = transformChartData(chartData);

  return (
    <div className="h-full w-full pb-10">
      <ResponsiveContainer width="100%" height="100%">
        {chartData && !isFetching ? (
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
              activeBar={
                <Rectangle fill="gold" stroke={token.secondaryColor} />
              }
            />
          </BarChart>
        ) : (
          <Spin className="my-10 flex w-full items-center justify-center h-full" />
        )}
      </ResponsiveContainer>
    </div>
  );
};
