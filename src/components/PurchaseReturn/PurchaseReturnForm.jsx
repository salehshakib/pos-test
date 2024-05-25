import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomSelect from "../Shared/Select/CustomSelect";
import { fullColLayout, rowLayout } from "../../layout/FormLayout";

const PurchaseReturnForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomSelect
            label="Purchase Refernce"
            name={"purchase_reference"}
            placeholder={"Purchase Refernce"}
            required={true}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default PurchaseReturnForm;
