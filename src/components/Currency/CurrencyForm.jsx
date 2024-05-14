import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";

const rowLayout = {
  gutter: 25,
};

const colLayout = {
  xs: 24,
  md: 12,
  lg: 8,
};

const CurrencyForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label={"Currency Name"}
            type={"text"}
            required={true}
            name={"name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label={"Currency Code"}
            type={"text"}
            required={true}
            name={"code"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label={"Exchange Rate"}
            type={"number"}
            suffix="BDT"
            required={true}
            name={"exchange_rate"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default CurrencyForm;
