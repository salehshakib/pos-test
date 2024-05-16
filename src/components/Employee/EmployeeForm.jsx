import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomSelect from "../Shared/Select/CustomSelect";
import { colLayout, rowLayout } from "../Shared/Form/FormLayout";

const EmployeeForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
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

export default EmployeeForm;
