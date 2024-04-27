import { Col, Row } from "antd";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";

const CategoryForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      className=""
      fields={fields}
      isLoading={isLoading}
    >
      <Row gutter={25}>
        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Category Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Category Name"}
          />
          {/* <CustomInput
            label="Category Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Category Name"}
          /> */}
        </Col>
        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Category Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Category Name"}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Category Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Category Name"}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Category Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Category Name"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default CategoryForm;
