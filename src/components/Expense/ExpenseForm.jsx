import { Col, Row } from "antd";
import GenerateCode from "../GiftCard/GenerateCode";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";

export const ExpenseForm = (props) => {
  return (
    <CustomForm {...props}>
      <GenerateCode />
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Name"
            type={"text"}
            required={true}
            name={"name"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};
