import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";

const WarehouseForm = ({ handleSubmit, isLoading, fields }) => {
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
            label="Warehouse Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Brand Name"}
          />
        </Col>

        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Email"
            type={"email"}
            name={"email"}
            placeholder={"Email Address"}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <CustomInput
            label="Phone Number"
            type={"phone"}
            required={true}
            name={"phone"}
            placeholder={"Phone Number"}
          />
        </Col>
        <Col xs={24}>
          <CustomInput
            label="Address"
            type={"textarea"}
            required={true}
            name={"address"}
            placeholder={"Address"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default WarehouseForm;
