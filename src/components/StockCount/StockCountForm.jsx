import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { mdColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import PartialForm from "./PartialForm";

const options = [
  {
    // full
    value: "full",
    label: "Full",
  },
  {
    // partial
    value: "partial",
    label: "Partial",
  },
];

const StockCountForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomInput
            label="Warehouse"
            type={"text"}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomSelect
            label="Type"
            options={options}
            name={"type"}
            required={true}
            // name={"adjustment_name"}
          />
        </Col>

        <PartialForm />
      </Row>
    </CustomForm>
  );
};

export default StockCountForm;
