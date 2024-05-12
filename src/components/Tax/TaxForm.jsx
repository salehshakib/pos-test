import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";

const rowLayout = {
  gutter: 25,
};

const colLayout = {
  xs: 24,
  md: 12,
};

const TaxForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label={"Tax Name"}
            type={"text"}
            required={true}
            name={"name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label={"Tax Rate"}
            type={"number_with_percent"}
            required={true}
            name={"rate"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default TaxForm;
