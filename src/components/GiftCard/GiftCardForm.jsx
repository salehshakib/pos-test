import { Col, Form, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import GenerateCode from "./GenerateCode";

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

const fullColLayout = {
  xs: 24,
};

const GiftCardForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <GenerateCode />
        </Col>
      </Row>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Sale Reference"
            name={"purchase_reference"}
            // placeholder={"Purchase Refernce"}
            // required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomSelect
            label="Sale Reference"
            name={"purchase_reference"}
            // placeholder={"Purchase Refernce"}
            // required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomSelect
            label="Sale Reference"
            name={"purchase_reference"}
            // placeholder={"Purchase Refernce"}
            // required={true}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default GiftCardForm;
