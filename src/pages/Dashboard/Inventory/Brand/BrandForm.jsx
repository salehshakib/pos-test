import { Col, Row } from "antd";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Input/CustomInput";
import CustomUploader from "../../../../components/Shared/Upload/CustomUploader";

const rowLayout = {
  gutter: 25,
  align: "middle",
  justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
  lg: 12,
};

const BrandForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      className=""
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Brand Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Brand Name"}
          />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            label="Product Name"
            type={"text"}
            required={true}
            // name={"name"}
            placeholder={"Product Name"}
          />
        </Col>
        <Col xs={24}>
          <CustomUploader
            label={"Brand Image"}
            name={"brand_image"}
            multiple={true}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default BrandForm;
