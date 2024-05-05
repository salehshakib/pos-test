import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";

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

const StockCountForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
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
