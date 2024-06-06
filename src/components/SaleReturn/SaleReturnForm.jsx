import { Col, Row } from "antd";
import { fullColLayout, rowLayout } from "../../layout/FormLayout";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";

const SaleReturnForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomInput
            label="Sale Reference"
            name={"purchase_reference"}
            // placeholder={"Purchase Refernce"}
            required={true}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default SaleReturnForm;
