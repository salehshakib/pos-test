import { Statistic } from 'antd';
import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} separator="," />;

export const StatisticComponent = (props) => {
  const { value } = props;
  return <Statistic value={value} formatter={formatter} precision={2} />;
};
