import { Col, Row } from "antd";
import GenerateCode from "../GiftCard/GenerateCode";
import CustomForm from "../Shared/Form/CustomForm";
import { fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";

const ExpenseCategoryForm = (props) => {
  return (
    <CustomForm {...props}>
      <GenerateCode />
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
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

export default ExpenseCategoryForm;
