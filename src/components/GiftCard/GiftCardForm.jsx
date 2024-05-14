import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import GenerateCode from "./GenerateCode";

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
