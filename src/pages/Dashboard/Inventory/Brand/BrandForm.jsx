import { Col, Row } from "antd";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";
import CustomUploader from "../../../../components/Shared/Form/CustomUploader";

const BrandForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      className=""
      fields={fields}
      isLoading={isLoading}
    >
      <Row gutter={25}>
        <Col xs={24} md={12} lg={12}>
          <CustomInput
            label="Brand Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Brand Name"}
          />
        </Col>

        <Col xs={24} md={12} lg={12}>
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
            // multiple={false}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default BrandForm;
