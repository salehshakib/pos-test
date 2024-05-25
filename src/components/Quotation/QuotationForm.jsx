import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../../layout/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";

export const QuotationForm = (props) => {
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
            name={"company_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput label="Email" type={"email"} name={"email"} />
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
          <CustomInput label="Country" type={"text"} name={"country"} />
        </Col>
        <Col {...colLayout}>
          <CustomInput label="City" type={"text"} name={"city"} />
        </Col>
        <Col {...colLayout}>
          <CustomInput label="State" type={"text"} name={"state"} />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Postal Code"
            type={"number"}
            name={"postal_code"}
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput label="Address" type={"textarea"} name={"address"} />
        </Col>
      </Row>
    </CustomForm>
  );
};
