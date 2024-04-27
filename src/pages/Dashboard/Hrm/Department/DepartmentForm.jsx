import { Col, Row } from "antd";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";

const DepartmentForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      className=""
      fields={fields}
      isLoading={isLoading}
    >
      <Row gutter={25}>
        <Col xs={24}>
          <CustomInput
            label="Department Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Department Name"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default DepartmentForm;
