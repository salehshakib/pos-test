import { Statistic } from "antd";

const formatter = (value) => <CountUp end={value} separator="," />;

export const StatisticComponent = (props) => {
  const { children, title, value, icon, color } = props;
  return (
    <Statistic title="Active Users" value={112893} formatter={formatter} />
  );
};
