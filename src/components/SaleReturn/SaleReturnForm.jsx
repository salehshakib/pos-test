import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomSelect from "../Shared/Select/CustomSelect";

const SaleReturnForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomSelect
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
