import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomUploader from "../Shared/Upload/CustomUploader";

const BrandForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomInput
            label="Brand Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Brand Name"}
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomUploader label={"Brand Image"} name={"brand_image"} />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default BrandForm;
