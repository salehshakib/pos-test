import { Col, Row } from "antd";
import CustomForm from "../../../../components/Shared/Form/CustomForm";
import CustomInput from "../../../../components/Shared/Form/CustomInput";

const rowLayout = {
  gutter: 25,
  // align: "middle",
  // justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
};
const DiscountPlanForm = ({ handleSubmit, isLoading, fields }) => {
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
            label="Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Customer"
            type={"text"}
            required={true}
            name={"customer"}
            placeholder={"Customer"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default DiscountPlanForm;
