import { Col, Row } from "antd";
import { mdColLayout, rowLayout } from "../../layout/FormLayout";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";

const TaxForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomInput
            label={"Vat Name"}
            type={"text"}
            required={true}
            name={"name"}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label={"Vat Rate"}
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
