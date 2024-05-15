import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";

const StockCountForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Warehouse"
            type={"text"}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Type"
            type={"text"}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Category"
            type={"text"}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomSelect
            label="Brand"
            // showSearch={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default StockCountForm;
