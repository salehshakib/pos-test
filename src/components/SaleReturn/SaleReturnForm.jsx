import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomSelect from "../Shared/Select/CustomSelect";

const rowLayout = {
  gutter: 25,
  // align: "middle",
  // justify: "start",
};

const colLayout = {
  xs: 24,
};

const SaleReturnForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomSelect
            label="Sale Reference"
            name={"purchase_reference"}
            // placeholder={"Purchase Refernce"}
            required={true}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default SaleReturnForm;
