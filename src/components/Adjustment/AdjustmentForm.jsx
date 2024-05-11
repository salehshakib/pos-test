import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomUploader from "../Shared/Upload/CustomUploader";
import CustomSelect from "../Shared/Select/CustomSelect";

const rowLayout = {
  gutter: 25,
  // align: "middle",
  // justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
};

const docsColLayout = {
  xs: 24,
};

const AdjustmentForm = ({ handleSubmit, isLoading, fields }) => {
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
          <CustomSelect
            label="Product"
            placeholder={"Product"}
            showSearch={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
      </Row>
      <Row {...rowLayout}>
        <Col {...docsColLayout}>
          <CustomUploader
            label="Attach Documents"
            multiple={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...docsColLayout}>
          <CustomInput
            label="Sale Note"
            multiple={true}
            type={"textarea"}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default AdjustmentForm;
