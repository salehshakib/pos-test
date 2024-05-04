import { Col, Divider, Row } from "antd";
import dateFormats from "../../../assets/data/dateFormats.json";
import timezones from "../../../assets/data/timezones.json";
import CustomInput from "../../Shared/Form/CustomInput";

const rowLayout = {
  gutter: 25,
  align: "middle",
  justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
};

const TimeSetting = () => {
  const timezone = timezones.map(({ zone, utc, name }) => {
    return { label: `${name} ${utc}}`, value: zone };
  });

  const dateFormatOptions = dateFormats.formats.map((item) => {
    return { label: item, value: item };
  });
  return (
    <>
      <Divider orientation="left" orientationMargin={0}>
        Time Settings
      </Divider>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            name={"time_zone"}
            label={"Time Zone"}
            type={"select"}
            options={timezone}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            name={"date_format"}
            label={"Date Format"}
            type={"select"}
            options={dateFormatOptions}
            required={true}
          />
        </Col>
      </Row>
    </>
  );
};

export default TimeSetting;
