import { useBreakpoint } from "@ant-design/pro-components";
import { Descriptions } from "antd";
import { desLayout } from "../../../layout/DescriptionLayout";

export const CustomDescription = ({ title, items }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "xs" || breakpoint === "sm";
  const layout = desLayout({ isMobile });

  return <Descriptions {...layout} title={title} items={items} />;
};
