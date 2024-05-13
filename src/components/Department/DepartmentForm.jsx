import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";

const DepartmentForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
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
