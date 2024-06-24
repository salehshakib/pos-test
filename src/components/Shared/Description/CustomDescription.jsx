import { useBreakpoint } from "@ant-design/pro-components";
import { Descriptions } from "antd";
import { desLayout, nostyleLayout } from "../../../layout/DescriptionLayout";

export const CustomDescription = ({ title, items, nostyle }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "xs" || breakpoint === "sm";

  const layout = desLayout({ isMobile });

  return (
    <Descriptions
      {...(nostyle ? nostyleLayout : layout)}
      title={title}
      items={items}
    />
  );
};
