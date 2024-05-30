import { Col, Row } from "antd";
import { fullColLayout, mdColLayout, rowLayout } from "../../layout/FormLayout";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomImageCrop from "../Shared/Upload/CustomImageCrop";

export const GiftCardDesignForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomInput label="Name" name={"name"} required={true} />
        </Col>
        <Col {...mdColLayout}>
          <CustomImageCrop label={"front"} name={"front"} />
        </Col>
        <Col {...mdColLayout}>
          <CustomImageCrop label={"back"} name={"back"} />
        </Col>
      </Row>
    </CustomForm>
  );
};
