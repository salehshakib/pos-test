import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { fullColLayout, rowLayout } from "../../layout/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomUploader from "../Shared/Upload/CustomUploader";
import CustomImageCrop from "../Shared/Upload/CustomImageCrop";

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
          <CustomImageCrop label={"Brand Image"} name={"logo"} />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default BrandForm;
