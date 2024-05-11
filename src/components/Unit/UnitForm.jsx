import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";

const rowLayout = {
  gutter: 25,
  // align: "middle",
  // justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
  lg: 8,
};

const UnitForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput label={"Unit Name"} type={"text"} required={true} />
        </Col>
        <Col {...colLayout}>
          <CustomInput label={"Unit Code"} type={"text"} required={true} />
        </Col>
        <Col {...colLayout}>
          <CustomInput label={"Base Unit"} type={"text"} required={true} />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default UnitForm;
