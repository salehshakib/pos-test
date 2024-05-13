import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import {
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";

const AdjustmentForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
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
            label="Product"
            placeholder={"Product"}
            showSearch={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
      </Row>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomUploader
            label="Attach Documents"
            multiple={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...fullColLayout}>
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
