import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";

const SupplierForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Name"
            type={"text"}
            required={true}
            name={"name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Company Name"
            type={"text"}
            required={true}
            name={"company_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Email"
            type={"email"}
            required={true}
            name={"email"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Phone Number"
            type={"phone"}
            required={true}
            name={"phone_number"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Vat Number"
            type={"text"}
            required={true}
            name={"vat_number"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Country"
            type={"text"}
            required={true}
            name={"country"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="City"
            type={"text"}
            required={true}
            name={"city"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="State"
            type={"text"}
            required={true}
            name={"state"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Postal Code"
            type={"number"}
            required={true}
            name={"postal_code"}
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput
            label="Address"
            type={"textarea"}
            required={true}
            name={"address"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default SupplierForm;
